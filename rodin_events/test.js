
                    // --- CONFIGURAÇÃO SUPABASE ---
                    const SUPABASE_URL = 'https://aycltqfmrzxcdyvsyqdc.supabase.co';
                    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y2x0cWZtcnp4Y2R5dnN5cWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzUwMjksImV4cCI6MjA5Mzc1MTAyOX0.POjmm3yHJtgp57OIi9YNZcuUbhzkLBQxu4mMWfNm4as';
                    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

                    let activeEvents = [];
                    let pastEvents = [];
                    let currentEventIdx = null;
                    let currentMonth = new Date().getMonth();
                    let currentYear = new Date().getFullYear();
                    let selectedDay = null;
                    let tasks = []; 
                    let currentContractSupplierIdx = null; 

                    async function tryLogin() {
                        const email = document.getElementById('email').value;
                        const pass = document.getElementById('pass').value;

                        // Aceita 'admin/admin' ou 'rodin@admin.com/rodin123'
                        if ((email === 'admin' && pass === 'admin') || (email === 'rodin@admin.com' && pass === 'rodin123')) {
                            document.getElementById('loginScreen').style.display = 'none';
                            document.getElementById('eventSelectionScreen').style.display = 'flex';
                            document.body.style.alignItems = 'center';
                            document.body.style.justifyContent = 'center';
                            
                            await loadDataFromSupabase();
                            renderEventSelection();
                        } else {
                            alert("Credenciais incorretas. Use admin / admin.");
                        }
                    }

                    async function loadDataFromSupabase() {
                        try {
                            const { data: active } = await supabaseClient.from('events').select('*').eq('status', 'Ativo');
                            const { data: past } = await supabaseClient.from('events').select('*').neq('status', 'Ativo');
                            activeEvents = active || [];
                            activeEvents.sort((a, b) => {
                                try {
                                    const parseD = (dStr) => {
                                        if(!dStr) return 0;
                                        const p = dStr.split("/");
                                        return new Date(p[2] ? parseInt(p[2]) : new Date().getFullYear(), parseInt(p[1])-1, parseInt(p[0])).getTime();
                                    };
                                    return parseD(a.date) - parseD(b.date);
                                } catch(e) { return 0; }
                            });
                            pastEvents = past || [];
                            const { data: dbTasks } = await supabaseClient.from('tasks').select('*');
                            tasks = dbTasks || [];
                            tasks.forEach(t => {
                                if (t.description) {
                                    const matchYear = t.description.match(/\[year:(\d{4})\]/);
                                    if (matchYear) {
                                        t.year = parseInt(matchYear[1]);
                                        t.description = t.description.replace(/\s*\[year:\d{4}\]/, '');
                                    } else {
                                        t.year = 2026;
                                    }
                                } else {
                                    t.year = 2026;
                                }
                            });
                            updateUI();
                            renderPast();
                            renderCalendar('mainCal', 'calMonthLabel');
                        } catch (err) { console.error("Erro Supabase:", err); }
                    }

                    function switchTab(tab) {
                        document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
                        document.getElementById('tab-' + tab).classList.add('active');
                        document.querySelectorAll('.side-btn').forEach(b => b.classList.remove('active'));
                        if (tab === 'dashboard' || tab === 'anteriores' || tab === 'contratos' || tab === 'convidados') {
                            loadDataFromSupabase();
                            if (tab === 'anteriores') setTimeout(renderPast, 300);
                            if (tab === 'contratos') renderContractSuppliers();
                            if (tab === 'convidados') loadGuestService();
                        }
                    }

                    function changeMonth(delta) {
                        currentMonth += delta;
                        if (currentMonth > 11) {
                            currentMonth = 0;
                            currentYear++;
                        } else if (currentMonth < 0) {
                            currentMonth = 11;
                            currentYear--;
                        }
                        renderCalendar("mainCal", "calMonthLabel");
                    }



                    let transactions = [];
                    let suppliers = [];

                    let currentEventId = null;
                    let editingEventId = null;
                    let templateEventIdToCopy = null;

                    function renderEventSelection() {
                        const grid = document.getElementById("eventSelectionGrid");
                        if (!grid) return;
                        grid.innerHTML = "";
                        
                        if (activeEvents.length === 0) {
                            grid.innerHTML = "<div style=\"color: var(--text-secondary); padding: 20px;\">Nenhum evento ativo. Crie um novo!</div>";
                            return;
                        }
                        
                        activeEvents.forEach(ev => {
                            const card = document.createElement("div");
                            card.className = "luxury-card";
                            card.style.cursor = "pointer";
                            card.style.width = "300px";
                            card.style.textAlign = "center";
                            card.onclick = () => selectEvent(ev.id, ev.name);
                            
                            card.innerHTML = `
                                <h3 style="color: var(--text-color); margin-bottom: 10px; font-size: 22px;">${ev.name}</h3>
                                <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 15px;">${(ev.date || "").split("/").length === 2 ? ev.date + "/" + new Date().getFullYear() : ev.date} | ${ev.location}</div>
                                <div style="color: var(--text-color); font-weight: 700; font-size: 14px; background: var(--input-bg); padding: 8px; border-radius: 8px;">Acessar Painel</div>
                            `;
                            grid.appendChild(card);
                        });
                    }

                    function selectEvent(id, name) {
                        currentEventId = id;
                        document.getElementById("eventSelectionScreen").style.display = "none";
                        document.getElementById("dashboardScreen").style.display = "flex";
                        
                        
                        
                        const titleEl = document.getElementById("dashboardEventTitle");
                        if (titleEl) titleEl.innerText = name + " - Planejamento";
                        
                        loadFinancialState();
                        loadScheduleAndTeam();
                        renderCalendar("mainCal", "calMonthLabel");
                        updateUI();
                        
                        if(typeof lucide !== "undefined") lucide.createIcons();

                        // Limpar aba Pós-Evento para evitar herança de outro evento
                        if (document.getElementById("finalGuests")) document.getElementById("finalGuests").value = 0;
                        if (document.getElementById("finalAttendance")) document.getElementById("finalAttendance").value = 0;
                        if (document.getElementById("incidentNotes")) document.getElementById("incidentNotes").value = "";
                        document.querySelectorAll(".incident-tag.active").forEach(tag => tag.classList.remove("active"));
                        document.querySelectorAll(".luxury-checklist input[type='checkbox']").forEach(c => c.checked = false);
                    }

                    function returnToSelection() {
                        saveFinancialState();
                        saveScheduleAndTeam();
                        currentEventId = null;
                        document.getElementById("dashboardScreen").style.display = "none";
                        document.getElementById("eventSelectionScreen").style.display = "flex";
                        document.body.style.alignItems = "center";
                        document.body.style.justifyContent = "center";
                        renderEventSelection();
                    }

                    function saveFinancialState() {
                        if (!currentEventId) return;
                        localStorage.setItem(`rodin_transactions_${currentEventId}`, JSON.stringify(transactions));
                        localStorage.setItem(`rodin_suppliers_${currentEventId}`, JSON.stringify(suppliers));
                        localStorage.setItem(`rodin_budget_${currentEventId}`, document.getElementById('gastoPrevistoInput').value);
                    }

                    function loadFinancialState() {
                        if (!currentEventId) return;
                        const savedTrans = localStorage.getItem(`rodin_transactions_${currentEventId}`);
                        const savedSupp = localStorage.getItem(`rodin_suppliers_${currentEventId}`);
                        const savedBudget = localStorage.getItem(`rodin_budget_${currentEventId}`);
                        
                        transactions = savedTrans ? JSON.parse(savedTrans) : [];
                        suppliers = savedSupp ? JSON.parse(savedSupp) : [];
                        if (suppliers.length === 0) {
                            suppliers = standardServices.map(srv => ({ name: "", service: srv, value: 0, status: "Em Análise" }));
                        }
                        document.getElementById('gastoPrevistoInput').value = savedBudget || "0,00";
                        
                        renderTransactions();
                        renderSuppliers();
                    }

                    function saveScheduleAndTeam() {
                        if (!currentEventId) return;
                        const s = [];
                        document.querySelectorAll("#scheduleRows tr").forEach(tr => {
                            const tas = tr.querySelectorAll("textarea");
                            if (tas.length >= 5) s.push({ time: tas[0].value, act: tas[1].value, resp: tas[2].value, loc: tas[3].value, obs: tas[4].value });
                        });
                        const t = [];
                        document.querySelectorAll("#teamRows tr").forEach(tr => {
                            const tas = tr.querySelectorAll("textarea");
                            if (tas.length >= 3) t.push({ person: tas[0].value, loc: tas[1].value, func: tas[2].value });
                        });
                        schedule = s;
                        team = t;
                        localStorage.setItem(`rodin_schedule_${currentEventId}`, JSON.stringify(schedule));
                        localStorage.setItem(`rodin_team_${currentEventId}`, JSON.stringify(team));
                    }

                    function loadScheduleAndTeam() {
                        if (!currentEventId) return;
                        const s = localStorage.getItem(`rodin_schedule_${currentEventId}`);
                        const t = localStorage.getItem(`rodin_team_${currentEventId}`);
                        schedule = s ? JSON.parse(s) : [];
                        team = t ? JSON.parse(t) : [];
                        
                        document.getElementById("scheduleRows").innerHTML = "";
                        document.getElementById("teamRows").innerHTML = "";
                        
                        if (schedule.length > 0) schedule.forEach(item => addScheduleRow(item.time, item.act, item.resp, item.loc, item.obs));
                        else addScheduleRow("08:00", "Montagem", "Equipe", "Local", "");
                        
                        if (team.length > 0) team.forEach(item => addTeamRow(item.person, item.loc, item.func));
                        else addTeamRow("Nome", "Local", "Cargo");
                    }

                    function addFinFornecedorRow() {
                        suppliers.push({ name: '', service: 'Local', value: 0, status: 'Em Análise' });
                        renderSuppliers();
                    }

                    const standardServices = ["Local", "Estrutura", "Tecnologia (Som, Luz e equipamentos)", "Atrações", "Alimentação"];

                    function renderSuppliers() {
                        const tbody = document.getElementById("finFornecedoresRows");
                        if (!tbody) return;
                        tbody.innerHTML = "";
                        suppliers.forEach((s, i) => {
                            const tr = document.createElement("tr");
                            const isOutro = !standardServices.includes(s.service);
                            tr.innerHTML = `
                                <td><input type="text" value="${s.name}" onchange="updateSuppData(${i}, 'name', this.value)" class="lux-input" placeholder="Nome..." ${s.status === "Contratado" ? "disabled" : ""}></td>
                                <td style="color: var(--text-color); font-weight: 600;">
                                    <select onchange="updateSuppService(${i}, this.value)" class="status-badge-fin" style="background:transparent; border:none; outline:none; font-weight:600; font-family:inherit; font-size:13px; color:var(--text-color); cursor:pointer; width:100%;">
                                        ${standardServices.map(srv => `<option value="${srv}" ${s.service === srv ? "selected" : ""}>${srv}</option>`).join("")}
                                        <option value="Outro" ${isOutro ? "selected" : ""}>Outros</option>
                                    </select>
                                    <div style="display: ${isOutro ? "block" : "none"}; margin-top: 5px;">
                                        <input type="text" value="${isOutro ? s.service : ""}" placeholder="Qual serviço?" onchange="updateSuppData(${i}, 'service', this.value)" style="width: 100%; border: none; background: transparent; color: var(--text-color); font-weight: 600; outline: none; border-bottom: 1px dashed var(--border-soft); font-size: 13px;">
                                    </div>
                                </td>
                                <td><input type="text" value="${s.value === 0 ? "" : s.value.toLocaleString("pt-BR", {minimumFractionDigits: 2})}" oninput="maskMoney(this)" onchange="updateSuppValue(${i}, this.value)" class="lux-input" ${s.status === "Contratado" ? "disabled" : ""}></td>
                                <td>
                                    <select onchange="updateFornecedorStatus(${i}, this.value)" class="status-badge-fin" style="background: rgba(0,0,0,0.02); border: 1px solid var(--border-soft); color: var(--text-color); outline: none; cursor: pointer; border-radius: 6px; padding: 4px 8px;" ${s.status === "Contratado" ? "disabled" : ""}>
                                        <option value="Em Análise" ${s.status === "Em Análise" ? "selected" : ""}>Em Análise</option>
                                        <option value="Contratado" ${s.status === "Contratado" ? "selected" : ""}>Contratado ✓</option>
                                        <option value="Descartar" ${s.status === "Descartar" ? "selected" : ""}>Descartar ✗</option>
                                    </select>
                                </td>
                                <td style="text-align: center;"><button onclick="removeSupplier(${i})" style="background: transparent; border: none; color: #FF4B4B; cursor: pointer; font-size: 24px; font-weight: 800; transition: 0.2s;" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'">×</button></td>
                            `;
                            tbody.appendChild(tr);
                        });
                        saveFinancialState();
                    }

                    function updateSuppService(i, val) {
                        if (val === "Outro") suppliers[i].service = "";
                        else suppliers[i].service = val;
                        renderSuppliers();
                    }

                    function updateSuppData(i, key, val) { suppliers[i][key] = val; saveFinancialState(); }
                    function updateSuppValue(i, val) { 
                        const num = parseFloat(val.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
                        suppliers[i].value = num;
                        saveFinancialState();
                    }
                    function removeSupplier(i) { suppliers.splice(i, 1); renderSuppliers(); }

                    function updateFornecedorStatus(index, value) {
                        const s = suppliers[index];
                        s.status = value;

                        if (value === 'Contratado') {
                            if (!s.name || s.value < 0) {
                                alert("Preencha o Nome do fornecedor antes de contratar.");
                                s.status = 'Em Análise';
                                renderSuppliers();
                                return;
                            }
                            
                            transactions.unshift({
                                name: s.name,
                                category: s.service,
                                date: new Date().toLocaleDateString('pt-BR'),
                                time: new Date().toLocaleTimeString('pt-BR').substring(0, 5),
                                amount: s.value,
                                note: 'Contratado via Fornecedores',
                                status: 'Pendente'
                            });
                            renderTransactions();
                        }
                        renderSuppliers();
                    }



                    function updateFinCards() {
                        let concluido = 0;
                        let pendente = 0;
                        transactions.forEach(t => {
                            let pct = t.pctPaid !== undefined ? t.pctPaid : (t.status === 'Concluído' ? 100 : 0);
                            let paidAmt = t.amount * (pct / 100);
                            let pendAmt = t.amount - paidAmt;
                            concluido += paidAmt;
                            pendente += pendAmt;
                        });

                        const budgetRaw = document.getElementById('gastoPrevistoInput').value.replace(/\./g, '').replace(',', '.');
                        const budget = parseFloat(budgetRaw) || 0;
                        const disponivel = budget - (concluido + pendente);

                        document.getElementById('cardDespesasTotais').innerText = `R$ ${concluido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
                        document.getElementById('cardDespesasPendentes').innerText = `R$ ${pendente.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

                        // Atualizar Gráfico de Distribuição
                        if (document.getElementById('distBudgetTotal')) {
                            document.getElementById('distBudgetTotal').innerText = `R$ ${(budget / 1000).toFixed(1)}k`;
                            document.getElementById('distLabelConcluido').innerText = `R$ ${concluido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
                            document.getElementById('distLabelPendente').innerText = `R$ ${pendente.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
                            document.getElementById('distLabelDisponivel').innerText = `R$ ${disponivel.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

                            // Ajustar cores do círculo proporcionalmente
                            const percConc = Math.min(100, (concluido / budget) * 100) || 0;
                            const percPend = Math.min(100, (pendente / budget) * 100) || 0;
                            const circle = document.getElementById('distChartCircle');
                            if (circle) {
                                circle.style.borderTopColor = '#FF3D00'; // Concluido
                                circle.style.borderRightColor = (percConc + percPend > 25) ? '#FFAB00' : '#1a1a24';
                                circle.style.borderBottomColor = (percConc + percPend > 50) ? '#00E676' : '#1a1a24';
                                circle.style.borderLeftColor = (percConc + percPend > 75) ? '#00E676' : '#1a1a24';
                            }
                        }

                        renderChecklist();
                    }

                    function renderChecklist() {
                        const container = document.getElementById('preparationChecklistItems');
                        if (!container) return;

                        const categories = [
                            { id: 'Local', label: 'Local', desc: 'Reserva e alvarás' },
                            { id: 'Estrutura', label: 'Estrutura', desc: 'Palcos e montagem' },
                            { id: 'Som, Luz e Tecnologia', label: 'Tecnologia', desc: 'Som, Luz e equipamentos' },
                            { id: 'Atrações', label: 'Atrações', desc: 'Artistas e shows' },
                            { id: 'Alimentação', label: 'Alimentação', desc: 'Buffet e bebidas' }
                        ];

                        container.innerHTML = '';
                        let completedCount = 0;

                        categories.forEach(cat => {
                            const relatedTrans = transactions.filter(t => t.category === cat.id);
                            let status = '⏱ NÃO INICIADO';
                            let icon = '<div style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--text-secondary); background: transparent;"></div>';
                            let color = 'var(--text-secondary)';

                            if (relatedTrans.length > 0) {
                                const hasConcluido = relatedTrans.some(t => t.status === 'Concluído');
                                const hasPendente = relatedTrans.some(t => t.status === 'Pendente');

                                if (hasConcluido) {
                                    status = '✅ CONCLUÍDO';
                                    icon = '<div style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid #00E676; background: #00E676;"></div>';
                                    color = '#00E676';
                                    completedCount++;
                                } else if (hasPendente) {
                                    status = '⏳ PENDENTE';
                                    icon = '<div style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid #FFAB00; background: #FFAB00;"></div>';
                                    color = '#FFAB00';
                                }
                            }

                            container.innerHTML += `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.02);">
                                    <div style="display: flex; align-items: center; gap: 15px;">
                                        <div style="display: flex; align-items: center; justify-content: center; width: 24px;">${icon}</div>
                                        <div>
                                            <div style="font-weight: 600; color: var(--text-color); font-size: 14px;">${cat.label}</div>
                                            <div style="color: var(--text-secondary); font-size: 11px;">${cat.desc}</div>
                                        </div>
                                    </div>
                                    <div style="font-size: 10px; font-weight: 700; color: ${color};">${status}</div>
                                </div>
                            `;
                        });

                        const progress = document.getElementById('checklistProgress');
                        if (progress) {
                            const pct = Math.round((completedCount / categories.length) * 100);
                            progress.innerText = `Progresso: ${pct}%`;
                        }
                    }

                    function saveBudget(val) {
                        localStorage.setItem('rodin_budget', val);
                        updateFinCards();
                    }

                    function loadBudget() {
                        const saved = localStorage.getItem('rodin_budget');
                        if (saved) {
                            document.getElementById('gastoPrevistoInput').value = saved;
                        }
                    }

                    function renderTransactions() {
                        const tbody = document.getElementById('fluxoTransactionsRows');
                        if (!tbody) return;
                        tbody.innerHTML = '';
                        transactions.forEach((t, i) => {
                            const statusClass = t.status === 'Concluído' ? 'status-completed' : (t.status === 'Falhou' ? 'status-failed' : (t.status === 'Parcial' ? 'status-partial' : 'status-pending'));
                            let pct = t.pctPaid !== undefined ? t.pctPaid : (t.status === 'Concluído' ? 100 : 0);
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td><div style="font-weight: 700; color: var(--text-color); font-size: 15px;">${t.name}</div><div style="color: #666; font-size: 12px;">${t.category}</div></td>
                                <td><div style="font-weight: 700; color: var(--text-color);">${t.date}</div><div style="color: #666; font-size: 12px;">${t.time}</div></td>
                                <td>
                                    <div style="font-weight: 800; color: var(--text-color); font-size: 16px;">R$ ${t.amount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                                    <div style="margin-top: 5px; font-size: 11px; font-weight: normal; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
                                        Pago: <input type="number" min="0" max="100" value="${pct}" onchange="updateTransactionPct(${i}, this.value)" style="width: 50px; background: rgba(0,0,0,0.02); border: 1px solid var(--border-soft); color: var(--text-color); border-radius: 4px; padding: 2px 4px; text-align: center; outline: none; font-family: inherit;"> %
                                    </div>
                                </td>
                                <td style="color: #888; font-size: 13px;">${t.note}</td>
                                <td style="text-align: right;">
                                    <select onchange="updateTransactionStatus(${i}, this.value)" class="status-badge-fin ${statusClass}" style="border: none; outline: none; cursor: pointer; appearance: none; text-align: center;">
                                        <option value="Concluído" ${t.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
                                        <option value="Parcial" ${t.status === 'Parcial' ? 'selected' : ''}>Parcial</option>
                                        <option value="Pendente" ${t.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                                        <option value="Falhou" ${t.status === 'Falhou' ? 'selected' : ''}>Falhou</option>
                                        <option value="Cancelar">Cancelar Contrato</option>
                                    </select>
                                </td>
                            `;
                            tbody.appendChild(row);
                        });
                        updateFinCards();
                    }

                    function updateTransactionStatus(index, newStatus) {
                        if (newStatus === "Cancelar") {
                            const t = transactions[index];
                            let sup = suppliers.find(s => (s.name || "").trim() === (t.name || "").trim() && (s.service || "").trim() === (t.category || "").trim());
                            if (!sup) sup = suppliers.find(s => (s.name || "").trim() === (t.name || "").trim() && (s.name || "").trim() !== "");
                            if (!sup) sup = suppliers.find(s => (s.service || "").trim() === (t.category || "").trim());
                            if (sup) sup.status = "Em Análise";
                            transactions.splice(index, 1);
                            renderSuppliers();
                        } else {
                            transactions[index].status = newStatus;
                            if (newStatus === "Concluído") {
                                transactions[index].pctPaid = 100;
                            } else if (newStatus === "Pendente" || newStatus === "Falhou") {
                                transactions[index].pctPaid = 0;
                            } else if (newStatus === "Parcial") {
                                if (transactions[index].pctPaid === undefined || transactions[index].pctPaid === 100 || transactions[index].pctPaid === 0) {
                                    transactions[index].pctPaid = 50; // Default if changed manually
                                }
                            }
                        }
                        renderTransactions();
                        saveFinancialState();
                    }

                    function updateTransactionPct(index, val) {
                        let pct = parseFloat(val);
                        if (isNaN(pct)) pct = 0;
                        if (pct < 0) pct = 0;
                        if (pct > 100) pct = 100;
                        
                        transactions[index].pctPaid = pct;
                        if (pct === 100) {
                            transactions[index].status = "Concluído";
                        } else if (pct === 0) {
                            transactions[index].status = "Pendente";
                        } else {
                            transactions[index].status = "Parcial";
                        }
                        
                        renderTransactions();
                        saveFinancialState();
                    }

                    function addTransaction() {
                        const name = prompt("Nome da Transação:");
                        if (!name) return;
                        const amountStr = prompt("Valor (ex: 150,50):");
                        const amount = parseFloat(amountStr.replace(/\./g, '').replace(',', '.')) || 0;
                        if (isNaN(amount) || amount <= 0) return;
                        
                        transactions.unshift({
                            name: name,
                            category: 'Geral',
                            date: new Date().toLocaleDateString('pt-BR'),
                            time: new Date().toLocaleTimeString('pt-BR').substring(0, 5),
                            amount: amount,
                            note: 'Nova transação adicionada',
                            status: 'Pendente'
                        });
                        renderTransactions();
                        saveFinancialState(); // Salva a nova transação
                    }

                    function formatCurrency(input) {
                        // Apenas visual para o Gasto Previsto
                    }

                    function showSubTab(id) {
                        document.querySelectorAll('.fin-subtab-content').forEach(el => el.style.display = 'none');
                        document.getElementById(id).style.display = 'block';
                        if (id === 'fin-fluxo') renderTransactions();
                        if (event && event.currentTarget) {
                            document.querySelectorAll('.btn-premium-tab').forEach(b => b.classList.remove('active'));
                            event.currentTarget.classList.add('active');
                        }
                    }
                    
                    // Inicializar os cards
                    loadFinancialState();
                    setTimeout(updateFinCards, 500);

                    function renderCalendar(containerId, labelId, highlightDay = null) {
                        const container = document.getElementById(containerId);
                        if (!container) return;
                        container.innerHTML = "";

                        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                        const displayMonth = currentMonth;
                        if (labelId === "calMonthLabel") {
                            const mSel = document.getElementById("calMonthSelect");
                            const ySel = document.getElementById("calYearSelect");
                            if(mSel) mSel.value = displayMonth;
                            if(ySel) {
                                if(ySel.options.length === 0) {
                                    for(let y = currentYear - 5; y <= currentYear + 10; y++) {
                                        ySel.innerHTML += `<option value="${y}">${y}</option>`;
                                    }
                                }
                                let exists = Array.from(ySel.options).some(o => parseInt(o.value) === currentYear);
                                if(!exists) ySel.innerHTML += `<option value="${currentYear}">${currentYear}</option>`;
                                ySel.value = currentYear;
                            }
                        } else if (labelId) {
                            document.getElementById(labelId).innerText = months[displayMonth] + " " + currentYear;
                        }

                        const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
                        days.forEach(d => container.innerHTML += `<div class="cal-day">${d}</div>`);

                        const firstDay = new Date(currentYear, displayMonth, 1).getDay();
                        const daysInMonth = new Date(currentYear, displayMonth + 1, 0).getDate();

                        for (let e = 0; e < firstDay; e++) {
                            container.innerHTML += `<div class="cal-empty"></div>`;
                        }

                        for (let i = 1; i <= daysInMonth; i++) {
                            const isActive = (i === highlightDay);
                            const isSelected = (i === selectedDay && containerId === "mainCal");
                            // Verifica o ano tb se tiver nas tasks, se não, assume qualquer ano. Mas vamos deixar s pelo mês pra n quebrar as antigas, ou melhor:
                            const hasTask = tasks.some(t => t.day === i && t.month === displayMonth && ((t.year !== undefined ? t.year : 2026) === currentYear));
                            const classes = `cal-num ${isActive ? "active" : ""} ${isSelected ? "selected" : ""} ${hasTask ? "has-task" : ""}`;
                            container.innerHTML += `<div class="${classes}" onclick="selectDate(${i})">${i}</div>`;
                        }
                        if (containerId === "mainCal") renderTaskList();
                    }

                    function renderTaskList(searchQuery = "") {
                        const list = document.getElementById("taskSideList");
                        if (!list) return;

                        const displayMonth = ((currentMonth % 12) + 12) % 12;

                        let monthTasks = tasks.filter(t => parseInt(t.month) === displayMonth && ((t.year !== undefined ? t.year : 2026) === currentYear)).sort((a, b) => {
                            if (a.day !== b.day) return a.day - b.day;
                            let timeA = "24:00";
                            let timeB = "24:00";
                            const matchA = a.title.match(/^\[(\d{2}:\d{2})\]/);
                            if (matchA) timeA = matchA[1];
                            const matchB = b.title.match(/^\[(\d{2}:\d{2})\]/);
                            if (matchB) timeB = matchB[1];
                            return timeA.localeCompare(timeB);
                        });
                        
                        if (searchQuery) {
                            const query = searchQuery.toLowerCase();
                            monthTasks = monthTasks.filter(t => t.title.toLowerCase().includes(query) || (t.description && t.description.toLowerCase().includes(query)));
                        }

                        if (monthTasks.length === 0) {
                            list.innerHTML = `<div style="color: var(--border-soft); font-size: 13px; text-align: center; margin-top: 50px;">${document.getElementById("evDate").value ? "Nenhuma tarefa para este ms." : "Nenhuma tarefa pendente no ms."}</div>`;
                        } else {
                            list.innerHTML = "";
                            const monthsShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

                            monthTasks.forEach((t) => {
                                const isDone = t.status === "done";
                                list.innerHTML += `
                        <div class="task-card-ref ${isDone ? "done" : ""}">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div class="task-card-title" style="display:flex; flex-wrap:wrap; gap:5px; align-items:center;">
                                    ${
                                        (() => {
                                            let cleanTitle = t.title;
                                            const match = t.title.match(/\[Ev:(.*?)\]/);
                                            if (match) {
                                                const evTag = match[1];
                                                cleanTitle = t.title.replace(/\[Ev:.*?\]\s*/, "");
                                                let hash = 0;
                                                for(let i=0; i<evTag.length; i++){ hash = evTag.charCodeAt(i) + ((hash << 5) - hash); }
                                                const hue = Math.abs(hash) % 360;
                                                const bgColor = `hsla(${hue}, 70%, 50%, 0.15)`;
                                                const txtColor = `hsl(${hue}, 85%, 35%)`;
                                                return `<span style="background:${bgColor};color:${txtColor};padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;">${evTag}</span> <span style="margin-left:5px;">${cleanTitle}</span>`;
                                            }
                                            return `<span>${cleanTitle}</span>`;
                                        })()
                                    }
                                </div>
                                <button onclick="deleteTask('${t.id}')" style="background: transparent; border: none; color: var(--border-soft); cursor: pointer; font-size: 14px; padding: 0 0 5px 10px; transition: 0.2s;" onmouseover="this.style.color='#FF4B4B'" onmouseout="this.style.color='var(--border-soft)'">🗑️</button>
                            </div>
                            <div class="task-card-desc">${t.description || "Sem descrio adicional."}</div>
                            <div class="task-card-footer">
                                <div class="task-tag-date">📅 ${monthsShort[t.month]} ${t.day}</div>
                                <button class="btn-done-task ${isDone ? "btn-done" : "btn-active"}" onclick="toggleTaskStatus('${t.id}', '${t.status}')">${isDone ? "Desfazer" : "Concluir"}</button>
                            </div>
                        </div>
                    `;
                            });
                        }
                        
                        renderGeneralTasksList();
                    }

                    function renderGeneralTasksList() {
                        const list = document.getElementById("generalTasksList");
                        if (!list) return;

                        if (tasks.length === 0) {
                            list.innerHTML = `<div style="color: var(--border-soft); font-size: 13px; text-align: center; margin-top: 20px; grid-column: 1 / -1;">Nenhum lembrete criado.</div>`;
                            return;
                        }

                        list.innerHTML = "";
                        const monthsShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

                        // Sort by year, month, day
                        const sortedTasks = [...tasks].sort((a, b) => {
                            const yearA = a.year !== undefined ? a.year : 2026;
                            const yearB = b.year !== undefined ? b.year : 2026;
                            if (yearA !== yearB) return yearA - yearB;
                            if (a.month !== b.month) return a.month - b.month;
                            return a.day - b.day;
                        });

                        sortedTasks.forEach((t) => {
                            const isDone = t.status === "done";
                            const eventYear = t.year !== undefined ? t.year : 2026;
                            list.innerHTML += `
                    <div class="task-card-ref ${isDone ? "done" : ""}" style="height: 100%; display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-grow: 1;">
                            <div class="task-card-title" style="display:flex; flex-wrap:wrap; gap:5px; align-items:center;">
                                ${
                                    (() => {
                                        let cleanTitle = t.title;
                                        const match = t.title.match(/\[Ev:(.*?)\]/);
                                        if (match) {
                                            const evTag = match[1];
                                            cleanTitle = t.title.replace(/\[Ev:.*?\]\s*/, "");
                                            let hash = 0;
                                            for(let i=0; i<evTag.length; i++){ hash = evTag.charCodeAt(i) + ((hash << 5) - hash); }
                                            const hue = Math.abs(hash) % 360;
                                            const bgColor = `hsla(${hue}, 70%, 50%, 0.15)`;
                                            const txtColor = `hsl(${hue}, 85%, 35%)`;
                                            return `<span style="background:${bgColor};color:${txtColor};padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;">${evTag}</span> <span style="margin-left:5px;">${cleanTitle}</span>`;
                                        }
                                        return `<span>${cleanTitle}</span>`;
                                    })()
                                }
                            </div>
                            <button onclick="deleteTask('${t.id}')" style="background: transparent; border: none; color: var(--border-soft); cursor: pointer; font-size: 14px; padding: 0 0 5px 10px; transition: 0.2s;" onmouseover="this.style.color='#FF4B4B'" onmouseout="this.style.color='var(--border-soft)'">🗑️</button>
                        </div>
                        <div class="task-card-desc" style="margin-top: 10px; margin-bottom: 10px;">${t.description || "Sem descrio adicional."}</div>
                        <div class="task-card-footer" style="margin-top: auto;">
                            <div class="task-tag-date">📅 ${t.day} de ${monthsShort[t.month]} de ${eventYear}</div>
                            <button class="btn-done-task ${isDone ? "btn-done" : "btn-active"}" onclick="toggleTaskStatus('${t.id}', '${t.status}')">${isDone ? "Desfazer" : "Concluir"}</button>
                        </div>
                    </div>
                `;
                        });
                    }

                    async function toggleTaskStatus(id, currentStatus) {
                        const newStatus = currentStatus === "done" ? "active" : "done";
                        const { error } = await supabaseClient.from("tasks").update({ status: newStatus }).eq("id", id);
                        if (!error) await loadDataFromSupabase();
                    }

                    let taskToDeleteId = null;
                    function deleteTask(id) {
                        taskToDeleteId = id;
                        document.getElementById("deleteConfirmModal").style.display = "flex";
                    }
                    async function confirmDeleteTask() {
                        if (!taskToDeleteId) return;
                        const id = taskToDeleteId;
                        document.getElementById("deleteConfirmModal").style.display = "none";
                        const { error } = await supabaseClient.from("tasks").delete().eq("id", id);
                        if (!error) await loadDataFromSupabase();
                        else showToast("Erro ao excluir tarefa: " + error.message, true);
                        taskToDeleteId = null;
                    }

                    function selectDate(day) {
                        selectedDay = day;
                        renderCalendar('mainCal', 'calMonthLabel');
                    }

                    function openTaskForm() {
                        if (!selectedDay) {
                            alert("Por favor, selecione um dia no calendário primeiro.");
                            return;
                        }
                        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                        const displayMonth = ((currentMonth % 12) + 12) % 12;
                        document.getElementById('taskDateLabel').innerText = `Tarefa para ${selectedDay} de ${months[displayMonth]}`;
                        document.getElementById('taskModal').style.display = 'flex';
                    }

                    function hideTaskForm() { document.getElementById('taskModal').style.display = 'none'; }

                    async function saveTask() {
                        const baseTitle = document.getElementById('taskTitle').value;
                        const description = document.getElementById('taskDesc').value;
                        const taskTime = document.getElementById('taskTime').value;
                        if (!baseTitle) { alert("Dê um título à tarefa."); return; }

                        let title = baseTitle;
                        if (taskTime) {
                            title = `[${taskTime}] ${baseTitle}`;
                        }
                        const evName = currentEventId ? (activeEvents.find(e => e.id === currentEventId)?.name || "Geral") : "Geral";
                        title = `[Ev:${evName}] ` + title;

                        const displayMonth = ((currentMonth % 12) + 12) % 12;
                        let finalDesc = description ? description + ` [year:${currentYear}]` : `[year:${currentYear}]`;
                        const { error } = await supabaseClient.from('tasks').insert([
                            { title, description: finalDesc, day: selectedDay, month: displayMonth, status: 'active' }
                        ]);

                        if (error) alert("Erro ao salvar tarefa: " + error.message);
                        else {
                            document.getElementById('taskTitle').value = '';
                            document.getElementById('taskDesc').value = '';
                            document.getElementById('taskTime').value = '';
                            await loadDataFromSupabase();
                            hideTaskForm();
                        }
                    }

                    function showForm() { document.getElementById('formModal').style.display = 'flex'; }
                    function hideForm() { document.getElementById('formModal').style.display = 'none'; }

                    function editEventInfo(id) {
                        const ev = activeEvents.find(e => e.id === id);
                        if(!ev) return;
                        editingEventId = id;
                        document.getElementById("evName").value = ev.name;
                        document.getElementById("evLoc").value = ev.location;
                        document.getElementById("evDate").value = ev.date;
                        document.getElementById("evGoal").value = ev.org || "";
                        document.querySelector("#formModal h2").innerText = "Editar Evento";
                        showForm();
                    }

                    async function saveEvent() {
                        const name = document.getElementById("evName").value;
                        const loc = document.getElementById("evLoc").value;
                        const date = document.getElementById("evDate").value;
                        const goal = document.getElementById("evGoal").value;

                        if (!name || !date) {
                            alert("Por favor, preencha pelo menos o Nome e a Data do evento.");
                            return;
                        }

                        let res;
                        if (editingEventId) {
                            
                            const evMatch = activeEvents.find(e => e.id === editingEventId);
                            if (evMatch && evMatch.name !== name) {
                                const oldTag = `[Ev:${evMatch.name}] `;
                                const newTag = `[Ev:${name}] `;
                                tasks.forEach(t => {
                                    if (t.title.startsWith(oldTag)) {
                                        t.title = t.title.replace(oldTag, newTag);
                                        supabaseClient.from("tasks").update({ title: t.title }).eq("id", t.id).then();
                                    }
                                });
                            }
                            res = await supabaseClient.from("events").update({ name, location: loc, date, org: goal }).eq("id", editingEventId).select();

                        } else {
                            res = await supabaseClient.from("events").insert([{ name, location: loc, date, org: goal, status: "Ativo" }]).select();
                        }
                        
                        const { data, error } = res;

                        if (error) {
                            console.error("Erro Supabase:", error);
                            alert("ERRO AO SALVAR: " + error.message);
                        } else {
                            console.log("Salvo com sucesso:", data);
                            alert("? SINCRONIZADO: O evento foi atualizado na nuvem!");
                            document.getElementById("evName").value = "";
                            document.getElementById("evLoc").value = "";
                            document.getElementById("evDate").value = "";
                            document.getElementById("evGoal").value = "";
                            
                            const newId = data[0].id;
                            
                            if (templateEventIdToCopy && !editingEventId) {
                                const snapshotRaw = localStorage.getItem(`fin_snapshot_${templateEventIdToCopy}`);
                                if (snapshotRaw) {
                                    const snapshot = JSON.parse(snapshotRaw);
                                    localStorage.setItem(`rodin_budget_${newId}`, snapshot.budget || "0,00");
                                    const trans = [];
                                    const supp = (snapshot.suppliers || []).map(s => ({...s, status: "Em Análise"}));
                                    localStorage.setItem(`rodin_transactions_${newId}`, JSON.stringify(trans));
                                    localStorage.setItem(`rodin_suppliers_${newId}`, JSON.stringify(supp));
                                    localStorage.setItem(`rodin_schedule_${newId}`, JSON.stringify(snapshot.schedule || []));
                                    localStorage.setItem(`rodin_team_${newId}`, JSON.stringify(snapshot.team || []));
                                }
                                templateEventIdToCopy = null;
                            }
                            
                            editingEventId = null;
                            document.querySelector("#formModal h2").innerText = "Novo Grande Evento";
                            
                            await loadDataFromSupabase();
                            if(data && data.length > 0 && !editingEventId) selectEvent(newId, data[0].name);
                            hideForm();
                        }
                    }

                    function updateUI() {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        const grid = document.getElementById('cardsGrid');
                        if (grid) {
                            grid.innerHTML = '';
                            activeEvents.forEach((ev, i) => {
                                let daysText = "";
                                try {
                                    const parts = ev.date.split('/');
                                    const day = parseInt(parts[0]);
                                    const month = parseInt(parts[1]) - 1;
                                    const year = parts[2] ? parseInt(parts[2]) : 2026;
                                    const evDate = new Date(year, month, day);
                                    const diffTime = evDate - today;
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                    if (diffDays === 0) daysText = "É HOJE!";
                                    else if (diffDays < 0) daysText = "Já ocorreu";
                                    else daysText = `Faltam ${diffDays} dias`;
                                } catch (e) { daysText = "---"; }

                                const card = document.createElement('div');
                                card.className = 'event-card';
                                card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div class="card-tag"></div>
                            <span style="font-size: 10px; font-weight: 700; color: #2D68FE; background: #E5F0FF; padding: 4px 8px; border-radius: 4px;">${daysText}</span>
                        </div>
                        <h3 style="margin-top: 10px; color: var(--text-color);">${ev.name}</h3>
                        <p style="color:var(--text-secondary); font-size:12px; margin-top:10px;">📍 ${ev.location || 'Local não definido'}</p>
                        <p style="color:var(--text-secondary); font-size:12px; margin-top:4px;">📅 ${ev.date}</p>
                    `;
                                card.onclick = () => showDetails(ev, i);
                                grid.appendChild(card);
                            });
                        }
                        renderTaskList(); // Sempre tenta atualizar a lista ao atualizar a UI
                    }

                    function showDetails(ev, i) {
                        currentEventIdx = i;
                        document.getElementById('detName').innerText = ev.name;
                        document.getElementById('detInfo').innerHTML = `<b>Local:</b> ${ev.location || 'Não definido'}<br><b>Data:</b> ${(ev.date || "").split("/").length === 2 ? ev.date + "/" + new Date().getFullYear() : ev.date}<br><b>Objetivo:</b> ${ev.org || 'Não definido'}`;
                        document.getElementById('detActiveModules').style.display = 'grid'; 
                        document.getElementById('detailsOverlay').style.display = 'flex';
                        // Calendário renderCalendar removido
                    }

                    function hideDetails() { document.getElementById('detailsOverlay').style.display = 'none'; }

                    async function finishEvent() {
                        try {
                            const ev = activeEvents[currentEventIdx];
                            if (!ev) {
                                alert("Erro: Evento não selecionado.");
                                return;
                            }

                            if (!confirm(`Deseja concluir e arquivar o evento "${ev.name}"? Todos os dados financeiros e cronograma serão salvos no histórico.`)) return;

                            // Coleta dados das tabelas
                            const schedule = [];
                            document.querySelectorAll('#scheduleRows tr').forEach(tr => {
                                const tas = tr.querySelectorAll('textarea');
                                if (tas.length >= 5) {
                                    schedule.push({ time: tas[0].value, act: tas[1].value, resp: tas[2].value, loc: tas[3].value, obs: tas[4].value });
                                }
                            });

                            const team = [];
                            document.querySelectorAll('#teamRows tr').forEach(tr => {
                                const tas = tr.querySelectorAll('textarea');
                                if (tas.length >= 3) {
                                    team.push({ person: tas[0].value, local: tas[1].value, function: tas[2].value });
                                }
                            });

                            const activeIncidents = [];
                            document.querySelectorAll('.incident-tag.active').forEach(tag => {
                                activeIncidents.push(tag.innerText);
                            });
                            const incidentNotes = document.getElementById('incidentNotes') ? document.getElementById('incidentNotes').value : "";
                            const guestsNum = parseInt(document.getElementById('finalGuests')?.value) || 0;
                            const attendanceNum = parseInt(document.getElementById('finalAttendance')?.value) || 0;

                            // Calcula custo final real (apenas o que foi pago/concluído)
                            const finalCostReal = transactions.reduce((acc, t) => acc + (t.status === 'Concluído' ? t.amount : 0), 0);

                            // Captura o estado do checklist de encerramento
                            const closureChecklist = [];
                            document.querySelectorAll(".luxury-checklist .check-item").forEach(item => {
                                const label = item.querySelector(".check-text") ? item.querySelector(".check-text").innerText : item.innerText;
                                const isChecked = item.querySelector('input').checked;
                                closureChecklist.push({ label, checked: isChecked });
                            });

                            // Tira o snapshot completo para o histórico
                            const snapshot = {
                                budget: document.getElementById('gastoPrevistoInput').value,
                                transactions: transactions,
                                suppliers: suppliers,
                                schedule: schedule,
                                team: team,
                                closureChecklist: closureChecklist,
                                summary: {
                                    guests: guestsNum,
                                    estimated_attendance: attendanceNum,
                                    final_cost: finalCostReal,
                                    finished: true,
                                    incidents: activeIncidents,
                                    incident_notes: incidentNotes
                                }
                            };
                            
                            localStorage.setItem(`fin_snapshot_${ev.id}`, JSON.stringify(snapshot));

                            const { error } = await supabaseClient.from('events').update({ status: 'Concluído' }).eq('id', ev.id);
                            const evTag = `[Ev:${ev.name}]`;
                            const tasksToDelete = tasks.filter(t => t.title.startsWith(evTag));
                            if(tasksToDelete.length > 0) {
                                const idsToDelete = tasksToDelete.map(t => t.id);
                                await supabaseClient.from('tasks').delete().in('id', idsToDelete);
                            }
                            if (error) {
                                alert("Erro ao concluir no banco de dados: " + error.message);
                            } else {
                                // Limpa o estado atual para o próximo evento
                                transactions = [];
                                suppliers = [];
                                document.getElementById('gastoPrevistoInput').value = '0,00';
                                document.getElementById('scheduleRows').innerHTML = '';
                                document.getElementById('teamRows').innerHTML = '';
                                
                                saveFinancialState();
                                await loadDataFromSupabase();
                                hideDetails();
                                alert("✅ Evento Arquivado com Sucesso! Todos os dados foram salvos no histórico.");
                            }
                        } catch (err) {
                            console.error("Erro crítico ao finalizar evento:", err);
                            alert("Ocorreu um erro ao processar a finalização: " + err.message);
                        }
                    }

                    async function cancelEvent() {
                        const ev = activeEvents[currentEventIdx];
                        if (!ev) return;
                        const { error } = await supabaseClient.from('events').update({ status: 'Cancelado' }).eq('id', ev.id);
                        if (error) alert("Erro ao cancelar: " + error.message);
                        else {
                            await loadDataFromSupabase();
                            hideDetails();
                        }
                    }

                    function renderPast() {
                        const list = document.getElementById('pastEventsList');
                        if (!list) return;
                        list.innerHTML = '';
                        if (pastEvents.length === 0) {
                            list.innerHTML = '<div style="color:var(--border-soft); text-align:center; padding:50px;">Nenhum evento anterior encontrado.</div>';
                            return;
                        }
                        pastEvents.forEach(ev => {
                            const card = document.createElement('div');
                            card.className = 'past-card';
                            card.style.cursor = 'pointer';
                            card.onclick = () => viewPastDetails(ev);
                            
                            const statusColor = ev.status === 'Concluído' ? '#00E676' : '#FF4B4B';
                            card.innerHTML = `
                                <div class="card-options" onclick="event.stopPropagation(); deleteEventFromSupabase('${ev.id}')">🗑️</div>
                                <h3 style="margin-bottom:10px; color: var(--text-color);">${ev.name}</h3>
                                <p style="color:#888; font-size:12px; margin-bottom: 15px;">📅 ${ev.date} | 📍 ${ev.location || 'Local'}</p>
                                <div class="status-badge" style="background: ${statusColor}15; color: ${statusColor}; border: 1px solid ${statusColor}33;">● ${ev.status}</div>
                            `;
                            list.appendChild(card);
                        });
                    }

                    
                    function remarcarEvento(id, evName) {
                        templateEventIdToCopy = id;
                        document.getElementById("evName").value = evName + " (Remarcado)";
                        document.getElementById("evLoc").value = "";
                        document.getElementById("evDate").value = "";
                        document.getElementById("evGoal").value = "";
                        document.querySelector("#formModal h2").innerText = "🔄 Remarcar Evento";
                        
                        hideDetails(); // Fecha o modal do histrico
                        document.getElementById("dashboardScreen").style.display = "none";
                        document.getElementById("eventSelectionScreen").style.display = "flex";
                        showForm();
                    }

                    function viewPastDetails(ev) {
                        const snapshotRaw = localStorage.getItem(`fin_snapshot_${ev.id}`);
                        if (!snapshotRaw) {
                            alert("Não encontramos detalhes arquivados para este evento antigo.");
                            return;
                        }
                        const snapshot = JSON.parse(snapshotRaw);
                        
                        // Cálculos para o gráfico histórico
                        const budgetNum = parseFloat(snapshot.budget.replace(/\./g, '').replace(',', '.')) || 0;
                        let concluido = 0;
                        let pendente = 0;
                        snapshot.transactions.forEach(t => {
                            if (t.status === 'Concluído') concluido += t.amount;
                            if (t.status === 'Pendente' || t.status === 'Falhou') pendente += t.amount;
                        });
                        const disponivel = budgetNum - (concluido + pendente);
                        const percTotal = Math.min(100, ((concluido + pendente) / budgetNum) * 100) || 0;

                        const overlay = document.getElementById('detailsOverlay');
                        document.getElementById('detName').innerText = `📑 Relatório: ${ev.name}`;
                        
                        const summary = snapshot.summary || { guests: '---', estimated_attendance: '---', final_cost: 0, finished: true };

                        let html = `
                        <!-- BOTÃO DE REMARCAR -->
                        <div style="margin-bottom: 25px; display: flex; justify-content: flex-end;">
                            <button onclick="remarcarEvento('${ev.id}', '${ev.name}')" style="background: var(--accent-color); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;"><span style="font-size: 16px;">🔄</span> Remarcar Evento</button>
                        </div>
                        <!-- RESUMO RÁPIDO DO EVENTO -->
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px;">
                            <div style="background: rgba(0,0,0,0.02); padding: 15px; border-radius: 12px; border: 1px solid var(--border-soft); text-align: center;">
                                <div style="color: #888; font-size: 10px; text-transform: uppercase; margin-bottom: 5px;">Convidados</div>
                                <div style="color: var(--text-color); font-size: 18px; font-weight: 800;">${summary.guests}</div>
                            </div>
                            <div style="background: rgba(0,0,0,0.02); padding: 15px; border-radius: 12px; border: 1px solid var(--border-soft); text-align: center;">
                                <div style="color: #888; font-size: 10px; text-transform: uppercase; margin-bottom: 5px;">Estimativa Presença</div>
                                <div style="color: var(--text-color); font-size: 18px; font-weight: 800;">${summary.estimated_attendance}</div>
                            </div>
                            <div style="background: rgba(0,0,0,0.02); padding: 15px; border-radius: 12px; border: 1px solid var(--border-soft); text-align: center;">
                                <div style="color: #888; font-size: 10px; text-transform: uppercase; margin-bottom: 5px;">Custo Final</div>
                                <div style="color: #00E676; font-size: 18px; font-weight: 800;">R$ ${summary.final_cost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                            </div>
                            <div style="background: rgba(0, 230, 118, 0.1); padding: 15px; border-radius: 12px; border: 1px solid #00E676; text-align: center;">
                                <div style="color: #00E676; font-size: 10px; text-transform: uppercase; margin-bottom: 5px;">Status</div>
                                <div style="color: #00E676; font-size: 18px; font-weight: 800;">FINALIZADO ✅</div>
                            </div>
                        </div>

                        <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:20px; align-items: stretch;">
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 13px;">
                                        <span style="color: var(--text-secondary);"><span style="color:#00E676;">●</span> Disponível:</span>
                                        <span style="color: var(--text-color); font-weight:600;">R$ ${disponivel.toLocaleString('pt-BR', {minimumFractionDigits:2})}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- LADO DIREITO: LISTA DE TRANSAÇÕES ARQUIVADAS -->
                            <div class="luxury-glass-panel">
                                <h4 style="color: var(--text-color); margin-bottom:15px; display:flex; justify-content:space-between;">
                                    <span>Transações do Evento</span>
                                    <span style="font-size:11px; color:#666;">${snapshot.transactions.length} itens</span>
                                </h4>
                                <div style="max-height:300px; overflow-y:auto; padding-right:10px;">
                                    ${snapshot.transactions.map(t => `
                                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--input-bg);">
                                            <div>
                                                <div style="color: var(--text-color); font-size:13px; font-weight:600;">${t.name}</div>
                                                <div style="color:var(--border-soft); font-size:10px;">${t.category} | ${t.date}</div>
                                            </div>
                                            <div style="color:${t.status === 'Concluído' ? '#00E676' : '#FFAB00'}; font-weight:700; font-size:13px;">
                                                R$ ${t.amount.toLocaleString('pt-BR', {minimumFractionDigits:2})}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- SEÇÃO DE FORNECEDORES NO RODAPÉ DO MODAL -->
                        <div class="luxury-glass-panel" style="margin-top:20px;">
                            <h4 style="color: var(--text-color); margin-bottom:15px;">🤝 Equipe e Fornecedores Contratados</h4>
                            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:15px;">
                                ${snapshot.suppliers.map(s => `
                                    <div style="background:rgba(0,0,0,0.02); padding:10px; border-radius:8px; border:1px solid var(--input-bg);">
                                        <div style="color: var(--text-color); font-size:12px; font-weight:600;">${s.name || 'Empresa não nomeada'}</div>
                                        <div style="color:#666; font-size:11px;">${s.service} - ${s.status}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- SEÇÃO DE CRONOGRAMA ARQUIVADO -->
                        <div class="luxury-glass-panel" style="margin-top:20px;">
                            <h4 style="color:#FF4B2B; margin-bottom:15px;">🗓️ Cronograma Realizado</h4>
                            <div style="overflow-x:auto;">
                                <table style="width:100%; border-collapse:collapse; font-size:11px; color: var(--text-secondary);">
                                    <thead>
                                        <tr style="border-bottom:1px solid var(--border-soft); text-align:left;">
                                            <th style="padding:8px;">Horário</th>
                                            <th style="padding:8px;">Atividade</th>
                                            <th style="padding:8px;">Responsável</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${snapshot.schedule ? snapshot.schedule.map(s => `
                                            <tr style="border-bottom:1px solid var(--input-bg);">
                                                <td style="padding:8px; color: var(--text-color);">${s.time}</td>
                                                <td style="padding:8px;">${s.act}</td>
                                                <td style="padding:8px;">${s.resp}</td>
                                            </tr>
                                        `).join('') : '<tr><td colspan="3" style="padding:15px; text-align:center;">Nenhum cronograma arquivado.</td></tr>'}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- SEÇÃO DE EQUIPE ARQUIVADA -->
                        <div class="luxury-glass-panel" style="margin-top:20px;">
                            <h4 style="color:#2196F3; margin-bottom:15px;">👥 Equipe Alocada</h4>
                            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:10px;">
                                ${snapshot.team ? snapshot.team.map(t => `
                                    <div style="background:rgba(33,150,243,0.05); padding:10px; border-radius:8px; border:1px solid rgba(33,150,243,0.1);">
                                        <div style="color: var(--text-color); font-size:12px; font-weight:600;">${t.person}</div>
                                        <div style="color:#2196F3; font-size:10px;">${t.function}</div>
                                    </div>
                                `).join('') : '<div style="color:var(--border-soft);">Nenhuma equipe arquivada.</div>'}
                            </div>
                        </div>

                        <!-- SEÇÃO DE INCIDENTES ARQUIVADOS -->
                        <div class="luxury-glass-panel" style="margin-top:20px;">
                            <h4 style="color:#FF3D00; margin-bottom:15px;">🚨 Incidentes e Observações</h4>
                            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:15px;">
                                ${summary.incidents && summary.incidents.length > 0 
                                    ? summary.incidents.map(inc => `<span style="background:rgba(255,61,0,0.1); color:#FF3D00; padding:5px 12px; border-radius:20px; font-size:11px; font-weight:700; border:1px solid rgba(255,61,0,0.2);">${inc}</span>`).join('')
                                    : '<span style="color:#666; font-size:12px;">Nenhum incidente crítico registrado. ✅</span>'}
                            </div>
                            <div style="background:rgba(0,0,0,0.02); padding:15px; border-radius:10px; border:1px solid var(--border-soft); color: var(--text-secondary); font-size:13px; line-height:1.6;">
                                ${summary.incident_notes || '<i>Sem observações detalhadas.</i>'}
                            </div>
                        </div>

                        <!-- SEÇÃO DE CHECKLIST DE ENCERRAMENTO -->
                        <div class="luxury-glass-panel" style="margin-top:20px;">
                            <h4 style="color:#00E676; margin-bottom:15px;">✅ Checklist de Encerramento Final</h4>
                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                                ${snapshot.closureChecklist ? snapshot.closureChecklist.map(item => `
                                    <div style="display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.02); padding:10px; border-radius:8px; border:1px solid ${item.checked ? 'rgba(0,230,118,0.1)' : 'var(--input-bg)'};">
                                        <div style="width:18px; height:18px; border-radius:4px; display:flex; align-items:center; justify-content:center; background:${item.checked ? '#00E676' : 'transparent'}; border:1px solid ${item.checked ? '#00E676' : 'var(--border-soft)'}; font-size:10px; color:black;">
                                            ${item.checked ? '✓' : ''}
                                        </div>
                                        <span style="font-size:12px; color:${item.checked ? 'white' : '#666'};">
                                            ${item.label}
                                        </span>
                                    </div>
                                `).join('') : '<div style="color:var(--border-soft); font-size:12px;">Checklist não arquivado para este evento.</div>'}
                            </div>
                        </div>
                        `;

                        document.getElementById('detInfo').innerHTML = html;
                        document.getElementById('detActiveModules').style.display = 'none'; 
                        document.getElementById('detailsOverlay').style.display = 'flex';
                    }

                    async function deleteEventFromSupabase(id) {
                        if (confirm("Tem certeza que deseja excluir este evento permanentemente?")) {
                            const { error } = await supabaseClient.from('events').delete().eq('id', id);
                            if (error) {
                                alert("Erro ao excluir: " + error.message);
                            } else {
                                await loadDataFromSupabase();
                            }
                        }
                    }

                    // --- GESTÃO DE CONTRATOS POR FORNECEDOR ---
                    function renderContractSuppliers() {
                        const tbody = document.getElementById('contractSuppliersRows');
                        if (!tbody) return;
                        tbody.innerHTML = '';
                        suppliers.forEach((s, i) => {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td><div style="font-weight: 700; color: var(--text-color);">${s.name || 'Fornecedor s/ Nome'}</div></td>
                                <td><div style="color: #666;">${s.service}</div></td>
                                <td><div style="font-weight: 700; color: var(--text-color);">R$ ${s.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div></td>
                                <td><div class="status-badge-fin" style="background: ${s.status === 'Contratado' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(0,0,0,0.02)'}; color: ${s.status === 'Contratado' ? '#00E676' : '#888'}; border: none;">${s.status}</div></td>
                                <td style="text-align: right;">
                                    <button onclick="openContractEditor(${i})" style="background: var(--accent-color); color: white; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 12px;">+ Emitir Contrato</button>
                                </td>
                            `;
                            tbody.appendChild(tr);
                        });
                    }

                    const CONTRACT_TEMPLATE = `
<h1 style="text-align: center;">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>

<h3>IDENTIFICAÇÃO DAS PARTES CONTRATANTES</h3>

<p><strong>CONTRATANTE:</strong> BALDER EDUCACIONAL LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 29.221.297/0001-05, com sede na [Endereço completo da sede], neste ato representada por seu [Cargo do Representante Legal], [Nome do Representante Legal], [Nacionalidade], [Estado Civil], portador(a) do RG nº [Número do RG] e inscrito(a) no CPF sob o nº [Número do CPF], doravante denominada simplesmente CONTRATANTE.</p>

<p><strong>CONTRATADA:</strong> {{contratado}}, [Nacionalidade], [Estado Civil ou Natureza Jurídica], [Profissão ou Ramo de Atividade], portador(a) do RG nº [Número do RG] e inscrito(a) no CPF/CNPJ sob o nº [Número do CPF/CNPJ], residente e domiciliado(a) ou com sede na [Endereço completo], doravante denominado(a) simplesmente CONTRATADA.</p>

<p>As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente.</p>

<h3>CLÁUSULA PRIMEIRA - DO OBJETO DO CONTRATO</h3>
<p>1.1. O presente contrato tem como objeto a prestação de serviços de <strong>{{servico}}</strong> pela CONTRATADA à CONTRATANTE.</p>

<h3>CLÁUSULA SEGUNDA - DAS OBRIGAÇÕES DA CONTRATADA</h3>
<p>2.1. A CONTRATADA compromete-se a realizar os serviços descritos na Cláusula Primeira com zelo, dedicação e dentro dos prazos estipulados, utilizando-se de profissionais devidamente qualificados.</p>
<p>2.2. A CONTRATADA deverá fornecer à CONTRATANTE todas as informações e relatórios necessários sobre o andamento dos serviços, sempre que solicitada.</p>
<p>2.3. A CONTRATADA obriga-se a manter sigilo absoluto sobre quaisquer informações, dados ou documentos da CONTRATANTE a que venha a ter acesso em virtude da execução deste contrato.</p>

<h3>CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES DA CONTRATANTE</h3>
<p>3.1. A CONTRATANTE deverá fornecer à CONTRATADA todas as informações, documentos e acessos necessários para a perfeita execução dos serviços contratados.</p>
<p>3.2. A CONTRATANTE obriga-se a efetuar o pagamento dos honorários devidos à CONTRATADA nas datas e condições estipuladas na Cláusula Quarta.</p>

<h3>CLÁUSULA QUARTA - DO PREÇO E DAS CONDIÇÕES DE PAGAMENTO</h3>
<p>4.1. Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA o valor total de <strong>R$ {{valor_total}}</strong>, que deverá ser pago da seguinte forma: [descrever a forma de pagamento, ex: à vista, parcelado, datas de vencimento, dados bancários para transferência].</p>
<p>4.2. Em caso de atraso no pagamento, incidirá multa moratória de [Percentual]% sobre o valor da parcela em atraso, além de juros de mora de 1% (um por cento) ao mês, calculados pro rata die, e atualização monetária.</p>

<h3>CLÁUSULA QUINTA - DO PRAZO E DA VIGÊNCIA</h3>
<p>5.1. O presente contrato terá vigência de [Prazo de vigência, ex: 12 (doze) meses], iniciando-se em [Data de início] e encerrando-se em [Data de término], podendo ser prorrogado mediante termo aditivo assinado por ambas as partes.</p>

<h3>CLÁUSULA SEXTA - DA RESCISÃO</h3>
<p>6.1. O presente contrato poderá ser rescindido por qualquer das partes, a qualquer tempo, sem ônus, mediante aviso prévio por escrito com antecedência mínima de [Número de dias, ex: 30 (trinta)] dias.</p>
<p>6.2. O contrato também poderá ser rescindido de pleno direito, independentemente de notificação judicial ou extrajudicial, em caso de descumprimento de qualquer de suas cláusulas, sujeitando a parte infratora ao pagamento de multa compensatória estipulada em [Valor ou percentual da multa].</p>

<h3>CLÁUSULA SÉTIMA - DAS DISPOSIÇÕES GERAIS</h3>
<p>7.1. A prestação de serviço ora pactuada não estabelece qualquer vínculo empregatício entre a CONTRATANTE e os profissionais disponibilizados pela CONTRATADA, regendo-se estritamente pelas disposições da legislação civil.</p>
<p>7.2. Quaisquer alterações a este contrato somente serão válidas se formalizadas por escrito, mediante termo aditivo assinado pelas partes.</p>

<h3>CLÁUSULA OITAVA - DO FORO</h3>
<p>8.1. Para dirimir quaisquer controvérsias oriundas do presente contrato, as partes elegem o foro da comarca de [Nome da Cidade / Estado], renunciando a qualquer outro, por mais privilegiado que seja.</p>
<br>
<p>E, por estarem assim justos e contratados, firmam o presente instrumento em 02 (duas) vias de igual teor e forma, juntamente com 02 (duas) testemunhas.</p>
<br>
<p>[Local], [Dia] de [Mês] de [Ano].</p>
<br>
<p><strong>BALDER EDUCACIONAL LTDA</strong><br>CNPJ: 29.221.297/0001-05<br>CONTRATANTE</p>
<br>
<p><strong>{{contratado}}</strong><br>CONTRATADA</p>
<br>
<p><strong>TESTEMUNHAS:</strong><br><br>
1. Nome: _________________________<br>
CPF: _________________________<br><br>
2. Nome: _________________________<br>
CPF: _________________________</p>
`;

                    function openContractEditor(index) {
                        currentContractSupplierIdx = index;
                        const s = suppliers[index];
                        const event = activeEvents[0] || { name: 'Evento não selecionado', location: 'Local não definido', date: 'Data não definida' };
                        
                        // Verificar se já existe uma versão salva deste contrato
                        const savedKey = `saved_contract_${s.name.replace(/\s+/g, '_')}`;
                        const savedContent = localStorage.getItem(savedKey);

                        if (savedContent) {
                            document.getElementById('contractRichEditor').innerHTML = savedContent;
                        } else {
                            let content = CONTRACT_TEMPLATE;
                            content = content.replace(/{{contratado}}/g, s.name || '__________');
                            content = content.replace(/{{servico}}/g, s.service || '__________');
                            content = content.replace(/{{valor_total}}/g, s.value.toLocaleString('pt-BR', {minimumFractionDigits: 2}));
                            content = content.replace(/{{nome_evento}}/g, event.name);
                            content = content.replace(/{{local_evento}}/g, event.location || '__________');
                            content = content.replace(/{{data_evento}}/g, event.date || '__________');
                            content = content.replace(/{{horario_evento}}/g, '__________');
                            content = content.replace(/{{contratante}}/g, '__________');
                            content = content.replace(/{{cpf_contratante}}/g, '__________');
                            content = content.replace(/{{telefone_contratante}}/g, '__________');
                            content = content.replace(/{{email_contratante}}/g, '__________');
                            content = content.replace(/{{cpf_contratado}}/g, '__________');
                            content = content.replace(/{{telefone_contratado}}/g, '__________');
                            content = content.replace(/{{email_contratado}}/g, '__________');
                            content = content.replace(/{{forma_pagamento}}/g, '__________');
                            content = content.replace(/{{datas_pagamento}}/g, '__________');
                            content = content.replace(/{{dias_cancelamento}}/g, '15');
                            content = content.replace(/{{multa_cancelamento}}/g, '30');
                            content = content.replace(/{{tempo_tolerancia}}/g, '30');
                            content = content.replace(/{{cidade_foro}}/g, '__________');

                            document.getElementById('contractRichEditor').innerHTML = content;
                        }
                        
                        document.getElementById('contractEditorModal').style.display = 'flex';
                    }

                    function saveContractChanges() {
                        if (currentContractSupplierIdx === null) return;
                        const s = suppliers[currentContractSupplierIdx];
                        const editor = document.getElementById('contractRichEditor');
                        const savedKey = `saved_contract_${s.name.replace(/\s+/g, '_')}`;
                        
                        localStorage.setItem(savedKey, editor.innerHTML);
                        
                        // Feedback visual temporário no botão
                        const btn = document.querySelector('button[onclick="saveContractChanges()"]');
                        const originalText = btn.innerText;
                        btn.innerText = "Contrato Salvo! ✅";
                        btn.style.background = "#fff";
                        btn.style.color = "#000";
                        
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.background = "#00E676";
                            btn.style.color = "black";
                        }, 2000);
                    }

                    function hideContractEditor() {
                        document.getElementById('contractEditorModal').style.display = 'none';
                    }

                    function generateDOCXFromEditor() {
                        try {
                            const docxLib = window['docx'];
                            if (!docxLib) {
                                alert("Erro: A biblioteca de geração de Word não foi carregada corretamente. Por favor, recarregue a página (F5) ou verifique sua conexão.");
                                return;
                            }

                            const editor = document.getElementById('contractRichEditor');
                            const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } = docxLib;
                            
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = editor.innerHTML;
                            
                            const docChildren = [];

                            // Função para processar o conteúdo de forma recursiva
                            const parseElement = (element) => {
                                const nodes = element.childNodes;
                                
                                nodes.forEach(node => {
                                    if (node.nodeType === Node.TEXT_NODE) {
                                        const text = node.textContent;
                                        if (text.trim().length > 0) {
                                            docChildren.push(new Paragraph({
                                                children: [new TextRun({ text: text, size: 22 })],
                                                spacing: { after: 120 }
                                            }));
                                        }
                                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                                        const tag = node.nodeName;
                                        const text = node.innerText || "";

                                        if (tag === 'H1') {
                                            docChildren.push(new Paragraph({
                                                children: [new TextRun({ text: text.trim(), bold: true, size: 32 })],
                                                heading: HeadingLevel.HEADING_1,
                                                alignment: AlignmentType.CENTER,
                                                spacing: { before: 400, after: 400 }
                                            }));
                                        } else if (tag === 'H3') {
                                            docChildren.push(new Paragraph({
                                                children: [new TextRun({ text: text.trim(), bold: true, size: 24 })],
                                                spacing: { before: 300, after: 150 }
                                            }));
                                        } else if (tag === 'BR') {
                                            docChildren.push(new Paragraph({ children: [] }));
                                        } else if (tag === 'LI') {
                                            docChildren.push(new Paragraph({
                                                children: [new TextRun({ text: `• ${text.trim()}`, size: 22 })],
                                                spacing: { after: 100 }
                                            }));
                                        } else if (tag === 'DIV' || tag === 'P') {
                                            // Se o DIV/P tiver apenas texto direto
                                            if (node.children.length === 0 && text.trim()) {
                                                docChildren.push(new Paragraph({
                                                    children: [new TextRun({ text: text, size: 22 })],
                                                    spacing: { after: 120 }
                                                }));
                                            } else {
                                                // Se tiver sub-elementos (como BRs ou outros DIVs), processamos os filhos
                                                parseElement(node);
                                            }
                                        } else {
                                            // Outras tags (span, b, i), tentamos pegar o texto
                                            if (text.trim() && node.children.length === 0) {
                                                docChildren.push(new Paragraph({
                                                    children: [new TextRun({ text: text, size: 22 })],
                                                    spacing: { after: 120 }
                                                }));
                                            }
                                        }
                                    }
                                });
                            };

                            parseElement(tempDiv);

                            if (docChildren.length === 0) {
                                alert("O contrato parece estar vazio.");
                                return;
                            }

                            const doc = new Document({
                                sections: [{
                                    children: docChildren
                                }]
                            });

                            Packer.toBlob(doc).then(blob => {
                                saveAs(blob, `Contrato_Rodin_${Date.now()}.docx`);
                                alert("✅ Contrato Gerado com Sucesso!");
                            }).catch(e => alert("Erro no Packer: " + e.message));

                        } catch (err) {
                            alert("Erro ao gerar contrato: " + err.message);
                            console.error(err);
                        }
                    }


                    function saveIncidents() {
                        const activeTags = [];
                        document.querySelectorAll('.incident-tag.active').forEach(tag => {
                            activeTags.push(tag.innerText);
                        });
                        const notes = document.getElementById('incidentNotes').value;
                        console.log("Incidentes Salvos:", activeTags, notes);
                        alert("✅ Registro de incidentes salvo com sucesso!");
                    }

                    function setupGoogleForm() {
                        const currentLink = localStorage.getItem('google_form_base_url') || "";
                        const newLink = prompt("Cole aqui o seu 'Link preenchido automaticamente' do Google Forms:\n(Aquele que tem o 'entry.12345...')", currentLink);
                        if (newLink) {
                            localStorage.setItem('google_form_base_url', newLink);
                            alert("✅ Link do Google Forms configurado!");
                        }
                    }

                    function generateNPSLink() {
                        const event = activeEvents[0] || { name: 'Evento Teste' };
                        // Link real fornecido pelo usuário
                        const defaultLink = "https://docs.google.com/forms/d/e/1FAIpQLSehIzfBBHRjO06zYz0dNFsf-CO_UMlE4gATaFN5BqO_GA09Tg/viewform?usp=pp_url&entry.379471781=Acantonamento";
                        let baseLink = localStorage.getItem('google_form_base_url') || defaultLink;
                        
                        // Lógica para detectar onde injetar o nome do evento no link do Google
                        let fullUrl = baseLink;
                        const entryMatch = baseLink.match(/entry\.\d+=/);
                        
                        if (entryMatch) {
                            const entryPart = entryMatch[0];
                            const baseUrlWithoutValue = baseLink.split(entryPart)[0];
                            fullUrl = `${baseUrlWithoutValue}${entryPart}${encodeURIComponent(event.name)}`;
                        }
                        
                        navigator.clipboard.writeText(fullUrl).then(() => {
                            alert("🔗 Link NPS PERSONALIZADO e copiado!\n\nEvento: " + event.name + "\n\nAgora é só enviar para o cliente.");
                        });
                    }

                    function addScheduleRow(time = "", act = "", resp = "", loc = "", obs = "") {
                        const tbody = document.getElementById('scheduleRows');
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="00:00 - 00:00" oninput="maskTime(this); autoHeight(this)" rows="1" style="max-height: 40px; overflow: hidden;">${time}</textarea></td>
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="Atividade..." oninput="autoHeight(this)" rows="1">${act}</textarea></td>
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="Responsável..." oninput="autoHeight(this)" rows="1">${resp}</textarea></td>
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="Local..." oninput="autoHeight(this)" rows="1">${loc}</textarea></td>
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="Notas..." oninput="autoHeight(this)" rows="1">${obs}</textarea></td>
                <td style="text-align:center;"><button class="btn-del-row" onclick="this.parentElement.parentElement.remove()">🗑️</button></td>
            `;
                        tbody.appendChild(tr);
                        const tas = tr.querySelectorAll('textarea');
                        tas.forEach(ta => autoHeight(ta));
                    }

                    function autoHeight(el) {
                        el.style.height = "auto";
                        el.style.height = (el.scrollHeight) + "px";
                    }

                    function addTeamRow(person = "", local = "", function_ = "") {
                        const tbody = document.getElementById('teamRows');
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="Nome da pessoa..." oninput="autoHeight(this)" rows="1">${person}</textarea></td>
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="Local de atuação..." oninput="autoHeight(this)" rows="1">${local}</textarea></td>
                <td><textarea onchange="if(typeof saveScheduleAndTeam === 'function') saveScheduleAndTeam()" placeholder="Função/Cargo..." oninput="autoHeight(this)" rows="1">${function_}</textarea></td>
                <td style="text-align:center;"><button class="btn-del-row" onclick="this.parentElement.parentElement.remove()">🗑️</button></td>
            `;
                        tbody.appendChild(tr);
                        const tas = tr.querySelectorAll('textarea');
                        tas.forEach(ta => autoHeight(ta));
                    }

                    async function shareOnWhatsApp(type) {
                        const id = type === 'cronograma' ? 'capture-cronograma' : 'capture-equipe';
                        // Primeiro copia a foto e aguarda o resultado
                        const copiou = await copyTableToClipboard(id, true);
                        if (copiou) {
                            window.open(`https://wa.me/`, '_blank');
                        } else {
                            alert("❌ Erro ao capturar a foto. Certifique-se de estar usando o link do servidor (localhost).");
                        }
                    }

                    async function copyTableToClipboard(id, silent = false) {
                        const element = document.getElementById(id);
                        const delBtns = element.querySelectorAll('.btn-del-row');
                        delBtns.forEach(b => b.style.display = 'none');

                        return new Promise(async (resolve) => {
                            try {
                                const canvas = await html2canvas(element, {
                                    backgroundColor: '#0D0D0D',
                                    scale: 3,
                                    useCORS: true,
                                    onclone: (clonedDoc) => {
                                        const clonedElement = clonedDoc.getElementById(id);
                                        const inputs = clonedElement.querySelectorAll('input, textarea');

                                        inputs.forEach(ins => {
                                            const val = ins.value;
                                            const parent = ins.parentElement;
                                            const textDiv = clonedDoc.createElement('div');
                                            textDiv.innerText = val;
                                            textDiv.style.cssText = `
                                    color: var(--text-color);
                                    font-size: 14px;
                                    font-family: 'Inter', sans-serif;
                                    line-height: 1.6;
                                    white-space: pre-wrap;
                                    word-break: break-word;
                                    overflow-wrap: break-word;
                                    padding: 12px 5px;
                                    width: 100%;
                                    display: block;
                                    box-sizing: border-box;
                                `;

                                            ins.style.display = 'none';
                                            parent.appendChild(textDiv);
                                            parent.style.height = 'auto';
                                            parent.style.overflow = 'visible';
                                        });
                                    }
                                });

                                canvas.toBlob(async (blob) => {
                                    try {
                                        const item = new ClipboardItem({ "image/png": blob });
                                        await navigator.clipboard.write([item]);
                                        if (!silent) alert("✅ FOTO COPIADA! Agora basta ir no WhatsApp e apertar Ctrl+V.");
                                        resolve(true);
                                    } catch (clipboardErr) {
                                        console.error("Erro ao copiar:", clipboardErr);
                                        resolve(false);
                                    }
                                });
                            } catch (err) {
                                console.error("Erro ao gerar imagem:", err);
                                resolve(false);
                            } finally {
                                delBtns.forEach(b => b.style.display = 'block');
                            }
                        });
                    }

                    function maskTime(input) {
                        // Remove tudo que não é número
                        let v = input.value.replace(/\D/g, "");

                        // Aplica a máscara XX:XX - XX:XX
                        if (v.length >= 2) v = v.substring(0, 2) + ":" + v.substring(2);
                        if (v.length >= 5) v = v.substring(0, 5) + " - " + v.substring(5);
                        if (v.length >= 10) v = v.substring(0, 10) + ":" + v.substring(10);

                        input.value = v.substring(0, 13);
                    }

                    // Inicializar com algumas linhas exemplo da imagem
                    window.addEventListener('load', () => {
                        if (document.getElementById('scheduleRows')) {
                            if (document.getElementById('scheduleRows').children.length === 0) {
                                addScheduleRow("08:00 - 09:00", "Chegada da equipe e fornecedores", "Produção", "Área Interna", "Todos com crachá");
                                addScheduleRow("09:00 - 10:00", "Montagem da estrutura", "Produção", "Área Interna e Externa", "");
                                addScheduleRow("10:00 - 11:00", "Montagem de som e luz", "Técnica", "Palco", "Verificar cabos");
                            }
                            if (document.getElementById('teamRows') && document.getElementById('teamRows').children.length === 0) {
                                addTeamRow("João Silva", "Área Técnica", "Coordenador de Som");
                                addTeamRow("Maria Souza", "Recepção", "Hostess");
                            }
                        }
                        // Forçar render do calendário se estiver logado
                        renderCalendar('mainCal', 'calMonthLabel');
                        // Forçar ajuste de altura em todos os textareas iniciais
                        setTimeout(() => {
                            document.querySelectorAll('.schedule-table textarea').forEach(ta => autoHeight(ta));
                        }, 100);
                    });
                    function setupGuestService() {
                        const current = localStorage.getItem('guest_service_url') || "https://app.wedy.com/authenticate";
                        const url = prompt("Cole aqui a URL do site de convidados:", current);
                        if (url) {
                            localStorage.setItem('guest_service_url', url);
                            loadGuestService();
                        }
                    }

                    function loadGuestService() {
                        const url = localStorage.getItem('guest_service_url') || "https://app.wedy.com/authenticate";
                        const iframe = document.getElementById('guestIframe');
                        const placeholder = document.getElementById('guestPlaceholder');
                        const openBtn = document.getElementById('openGuestBtn');
                        const noGuest = document.getElementById('noGuestMsg');
                        
                        if (url) {
                            if (openBtn) openBtn.style.display = 'inline-block';
                            if (noGuest) noGuest.style.display = 'none';
                            
                            if (iframe) {
                                iframe.src = url;
                                if (url.includes('wedy.com')) {
                                    iframe.style.display = 'none';
                                }
                            }
                        }
                    }

                    function openExternalGuestService() {
                        const url = localStorage.getItem('guest_service_url') || "https://app.wedy.com/authenticate";
                        window.open(url, '_blank');
                    }

                    // Forçar carregamento inicial
                    window.addEventListener('load', () => {
                        if (!localStorage.getItem('guest_service_url')) {
                            localStorage.setItem('guest_service_url', "https://app.wedy.com/authenticate");
                        }
                        loadGuestService();
                    });
                
