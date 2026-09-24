document.addEventListener('DOMContentLoaded', async () => {
    // Supabase Credentials
    const supabaseUrl = 'https://iafuyoohinwpokzcqzwy.supabase.co/rest/v1';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZnV5b29oaW53cG9remNxend5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzMzODgsImV4cCI6MjA5NzIwOTM4OH0.epthJRsSQMwaJ2qL2EXqHzm8px8mJZgCXu1n55UYl-M';
    const supabaseStorageUrl = 'https://iafuyoohinwpokzcqzwy.supabase.co/storage/v1/object/curriculos';
    const step0 = document.getElementById('step-0');
    const stepVagas = document.getElementById('step-vagas');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const stepSuccess = document.getElementById('step-success');
    
    // Elements - Buttons
    const btnShowVagas = document.getElementById('btn-show-vagas');
    const btnBancoTalentos = document.getElementById('btn-banco-talentos');
    const btnBackVagas = document.getElementById('btn-back-vagas');
    const btnBackStep1 = document.getElementById('btn-back-step1');
    const btnContinue = document.getElementById('btn-continue');
    const btnBack = document.getElementById('btn-back');
    const btnSubmit = document.getElementById('btn-submit');
    
    // Elements - Form Data Step 1
    const nomeInput = document.getElementById('nome');
    const celularInput = document.getElementById('celular');
    const emailInput = document.getElementById('email');
    
    // Elements - Form Data Step 2
    const areaSelect = document.getElementById('area');
    const subareaContainer = document.getElementById('subarea-container');
    const subareaTags = document.getElementById('subarea-tags');
    const subareaInput = document.getElementById('subarea');
    
    // Checkboxes and Sections
    const checkPdf = document.getElementById('check-pdf');
    const checkLinkedin = document.getElementById('check-linkedin');
    const checkWrite = document.getElementById('check-write');
    
    const sectionPdf = document.getElementById('section-pdf');
    const sectionLinkedin = document.getElementById('section-linkedin');
    const sectionWrite = document.getElementById('section-write');
    
    // Toggle Sections
    checkPdf.addEventListener('change', (e) => {
        sectionPdf.style.display = e.target.checked ? 'block' : 'none';
    });
    
    checkLinkedin.addEventListener('change', (e) => {
        sectionLinkedin.style.display = e.target.checked ? 'block' : 'none';
    });
    
    checkWrite.addEventListener('change', (e) => {
        sectionWrite.style.display = e.target.checked ? 'block' : 'none';
    });
    
    // --- Lógica de Subcategorias (Tags) ---
    const subcategoriasPorArea = {
        'administrativo': ['Gestão Financeira', 'Recursos Humanos', 'Logística', 'Marketing', 'Vendas', 'Recepção / Atendimento'],
        'corpo-docente': ['Matemática', 'História', 'Geografia', 'Português / Literatura', 'Ciências / Biologia', 'Física', 'Química', 'Inglês', 'Educação Física', 'Artes', 'Educação Infantil'],
        'coordenacao': ['Coordenação Pedagógica', 'Direção Escolar', 'Orientação Educacional'],
        'apoio': ['Limpeza', 'Manutenção', 'Zeladoria', 'Portaria', 'Inspetoria'],
        'ti': ['Suporte Técnico', 'Infraestrutura', 'Sistemas e Desenvolvimento']
    };

    function renderSubareas(areaValue) {
        // Limpar o input hidden
        if(subareaInput) subareaInput.value = '';
        if(subareaTags) subareaTags.innerHTML = '';
        
        const tags = subcategoriasPorArea[areaValue];
        
        if (tags && tags.length > 0 && subareaContainer) {
            subareaContainer.style.display = 'block';
            tags.forEach(tagTexto => {
                const tagEl = document.createElement('div');
                tagEl.className = 'subarea-tag';
                tagEl.textContent = tagTexto;
                
                tagEl.addEventListener('click', () => {
                    // Desmarcar as outras tags
                    document.querySelectorAll('.subarea-tag').forEach(t => t.classList.remove('active'));
                    
                    // Se clicou na mesma tag que já estava ativa, desmarca.
                    if (subareaInput.value === tagTexto) {
                        subareaInput.value = '';
                    } else {
                        // Marca a nova tag
                        tagEl.classList.add('active');
                        subareaInput.value = tagTexto;
                    }
                });
                
                subareaTags.appendChild(tagEl);
            });
        } else if (subareaContainer) {
            subareaContainer.style.display = 'none';
        }
    }

    if (areaSelect) {
        areaSelect.addEventListener('change', (e) => {
            renderSubareas(e.target.value);
        });
    }
    
    // Email Validation Regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Mask for Celular
    celularInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 11) val = val.slice(0, 11);
        if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
        if (val.length > 10) val = `${val.slice(0, 10)}-${val.slice(10)}`;
        e.target.value = val;
    });

    // --- Vagas Dinâmicas (Criadas no Painel RH) ---
    let vagasDisponiveis = [];
    try {
        const rhVagas = JSON.parse(localStorage.getItem('rodin_vagas')) || [];
        // Filtrar apenas vagas abertas (não concluídas)
        const vagasAbertas = rhVagas.filter(v => v.status !== 'concluida');
        
        if (vagasAbertas.length > 0) {
            vagasDisponiveis = vagasAbertas.map(v => ({
                id: v.id,
                titulo: v.title,
                area: 'outros', // Define como outros pois a vaga customizada não tem setor mapeado
                tipo: 'Vaga Aberta',
                descricao: v.desc
            }));
        } else {
            // Se não houver nenhuma vaga criada no painel, mostra um aviso na tela
        }
    } catch (e) {
        console.error("Erro ao carregar vagas do RH", e);
    }

    const vagasListContainer = document.getElementById('vagas-list-container');
    
    let selectedVagaId = null;
    
    function renderVagas() {
        if (!vagasListContainer) return;
        vagasListContainer.innerHTML = '';

        if (vagasDisponiveis.length === 0) {
            vagasListContainer.innerHTML = '<p style="text-align: center; color: #64748b; padding: 20px;">Não há vagas abertas no momento. Você ainda pode enviar seu currículo para o Banco de Talentos!</p>';
            return;
        }
        vagasDisponiveis.forEach(vaga => {
            const card = document.createElement('div');
            card.className = 'vaga-card';
            card.innerHTML = `
                <div class="vaga-card-header">
                    <h3>${vaga.titulo}</h3>
                    <span class="vaga-badge">${vaga.tipo || 'Vaga Aberta'}</span>
                </div>
                <div class="vaga-separator"></div>
                <div class="vaga-info-compact">
                    <p><strong>Local:</strong> Presencial - Colégio Rodin</p>
                    <p><strong>Função:</strong> Administrativo - ${vaga.area}</p>
                </div>
                <div class="vaga-descricao-full" style="display: none;">
                    <p>${vaga.descricao.replace(/\n/g, '<br>')}</p>
                </div>
                <div class="vaga-actions">
                    <button type="button" class="btn-detalhes">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <span>Ver Detalhes</span>
                    </button>
                    <button type="button" class="btn-candidatar" data-area="${vaga.area}" data-title="${vaga.titulo}" data-id="${vaga.id}" style="display: none;">Candidatar-se</button>
                </div>
            `;
            vagasListContainer.appendChild(card);
        });

        // Eventos para Ver Detalhes
        document.querySelectorAll('.btn-detalhes').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const card = button.closest('.vaga-card');
                const desc = card.querySelector('.vaga-descricao-full');
                const btnCand = card.querySelector('.btn-candidatar');
                const span = button.querySelector('span');
                
                if (desc.style.display === 'none') {
                    desc.style.display = 'block';
                    btnCand.style.display = 'inline-block';
                    span.textContent = 'Ocultar Detalhes';
                    button.querySelector('svg').innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
                } else {
                    desc.style.display = 'none';
                    btnCand.style.display = 'none';
                    span.textContent = 'Ver Detalhes';
                    button.querySelector('svg').innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
                }
            });
        });

        // Adicionar eventos aos botões de candidatura
        document.querySelectorAll('.btn-candidatar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const area = e.target.getAttribute('data-area');
                const title = e.target.getAttribute('data-title');
                selectedVagaId = e.target.getAttribute('data-id');
                
                areaSelect.value = area; // Pré-seleciona a área
                renderSubareas(area); // Renderiza as tags (se existirem para a área da vaga)
                
                // Adiciona o nome da vaga no final da motivação para o RH saber
                const q3 = document.getElementById('q3');
                if (q3 && title) {
                    q3.value = `[Candidatura para a vaga: ${title}]\n\n`;
                }
                
                stepVagas.classList.remove('active');
                step1.classList.add('active');
            });
        });
    }

    renderVagas();

    // --- Navegação entre as Etapas Iniciais ---
    if (btnShowVagas) {
        btnShowVagas.addEventListener('click', () => {
            step0.classList.remove('active');
            stepVagas.classList.add('active');
        });
    }

    if (btnBancoTalentos) {
        btnBancoTalentos.addEventListener('click', () => {
            areaSelect.value = ""; // Limpa a área
            step0.classList.remove('active');
            step1.classList.add('active');
        });
    }

    if (btnBackVagas) {
        btnBackVagas.addEventListener('click', () => {
            stepVagas.classList.remove('active');
            step0.classList.add('active');
        });
    }

    if (btnBackStep1) {
        btnBackStep1.addEventListener('click', () => {
            step1.classList.remove('active');
            // Se veio das vagas e a área estava preenchida, volta para vagas. Senão volta pro step-0.
            // Para simplificar, sempre volta para step-0 (o candidato pode repensar).
            step0.classList.add('active');
        });
    }

    // Step 1 -> Step 2
    btnContinue.addEventListener('click', () => {
        const nome = nomeInput.value.trim();
        const celular = celularInput.value.replace(/\D/g, '');
        const email = emailInput.value.trim();
        
        if (!nome) {
            alert('Por favor, informe seu nome.');
            nomeInput.focus();
            return;
        }
        if (celular.length < 10) {
            alert('Por favor, informe um número de celular válido.');
            celularInput.focus();
            return;
        }
        if (!emailRegex.test(email)) {
            alert('Por favor, informe um e-mail válido.');
            emailInput.focus();
            return;
        }
        
        step1.classList.remove('active');
        step2.classList.add('active');
    });

    // Step 2 -> Step 1
    btnBack.addEventListener('click', () => {
        step2.classList.remove('active');
        step1.classList.add('active');
    });

    // File Input Logic
    const fileInput = document.getElementById('curriculo-pdf');
    const fileMsg = document.querySelector('.file-msg');
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileMsg.innerHTML = 'Arquivo selecionado:<br><strong>' + e.target.files[0].name + '</strong>';
        } else {
            fileMsg.innerHTML = 'Arraste seu arquivo PDF aqui<br>ou <strong>clique para buscar</strong>';
        }
    });

    checkWrite.addEventListener('change', (e) => {
        sectionWrite.style.display = e.target.checked ? 'block' : 'none';
    });

    // Lógica da Versão: URL (Campo bonito)

    // Final Form Submit
    step2.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!areaSelect.value) {
            alert('Por favor, selecione a Área de Interesse.');
            areaSelect.focus();
            return;
        }

        if (!checkPdf.checked && !checkLinkedin.checked && !checkWrite.checked) {
            alert('Por favor, selecione pelo menos uma forma de enviar seu currículo.');
            return;
        }

        const linkedinUrlInput = document.getElementById('linkedin-url');
        if (checkLinkedin.checked && (!linkedinUrlInput.value || !linkedinUrlInput.value.includes('linkedin.com'))) {
            alert('Por favor, insira uma URL válida do LinkedIn (ex: linkedin.com/in/seu-nome).');
            linkedinUrlInput.focus();
            return;
        }

        if (checkPdf.checked && fileInput.files.length === 0) {
            alert('Por favor, selecione um arquivo PDF.');
            return;
        }

        const originalBtnText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = 'Enviando...';
        btnSubmit.disabled = true;

        try {
            let pdfUrl = null;

            // Upload do PDF se existir
            if (checkPdf.checked && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

                const uploadResponse = await fetch(`${supabaseStorageUrl}/${fileName}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${supabaseKey}`,
                        'apikey': supabaseKey,
                        'Content-Type': file.type || 'application/pdf'
                    },
                    body: file
                });

                if (!uploadResponse.ok) {
                    const err = await uploadResponse.text();
                    throw new Error('Falha no upload do PDF: ' + err);
                }

                pdfUrl = `https://iafuyoohinwpokzcqzwy.supabase.co/storage/v1/object/public/curriculos/${fileName}`;
            }

            // Preparar dados do candidato
            const fullName = nomeInput.value.trim();
            const nameParts = fullName.split(' ');
            let avatar = nameParts[0].charAt(0).toUpperCase();
            if (nameParts.length > 1) {
                avatar += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
            }

            let formatList = [];
            let resumeText = "";
            let motivationText = "";

            if (checkPdf.checked) {
                formatList.push("PDF");
                resumeText += `[URL_PDF]${pdfUrl}[/URL_PDF]\n`;
            }
            if (checkLinkedin.checked) {
                formatList.push("LinkedIn");
                resumeText += `[URL_LINKEDIN]${linkedinUrlInput.value.trim()}[/URL_LINKEDIN]\n`;
            }
            if (checkWrite.checked) {
                formatList.push("Formulário");
                let textBody = `🔹 Resumo sobre você:\n${document.getElementById('q1').value}\n\n`;
                textBody += `🔹 Principais experiências:\n${document.getElementById('q2').value}\n\n`;
                textBody += `🔹 O que te motiva a querer fazer parte do Colégio Rodin?:\n${document.getElementById('q3').value}\n\n`;
                textBody += `🔹 Maiores habilidades:\n${document.getElementById('q4').value}\n\n`;
                textBody += `🔹 Informações Adicionais:\n${document.getElementById('q5').value}`;
                resumeText += `[TEXTO]\n${textBody}\n[/TEXTO]`;
                motivationText = document.getElementById('q3').value;
            }

            if (!motivationText) {
                motivationText = "Candidatura enviada via portal Trabalhe Conosco.";
            }

            if (selectedVagaId) {
                resumeText += `\n[VAGA_ID]${selectedVagaId}[/VAGA_ID]`;
            }

            const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ de /g, ' ').replace('.', '');

            let fullSector = areaSelect.options[areaSelect.selectedIndex].text;
            if (subareaInput && subareaInput.value) {
                fullSector += ` - ${subareaInput.value}`;
            }

            const newCandidate = {
                name: fullName,
                email: emailInput.value.trim(),
                phone: celularInput.value,
                sector: fullSector,
                format: formatList.join(' + '), // Mostra múltiplos formatos
                date: dataAtual,
                status: "Novo",
                avatar: avatar,
                resume: resumeText.trim() || "Nenhum resumo fornecido.",
                motivation: motivationText
            };

            // Inserir no banco de dados
            const dbResponse = await fetch(`${supabaseUrl}/rodin_curriculos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(newCandidate)
            });

            if (!dbResponse.ok) {
                const errData = await dbResponse.json().catch(() => null);
                throw new Error(errData ? errData.message || JSON.stringify(errData) : 'Erro DB ' + dbResponse.status);
            }

            // Prepara resumo de sucesso visual
            const successArea = document.getElementById('success-area');
            successArea.textContent = fullSector;
            const successItems = document.getElementById('success-items');
            successItems.innerHTML = '';
            formatList.forEach(fmt => {
                successItems.innerHTML += `<li>${fmt}</li>`;
            });

            // Tela de Sucesso
            step2.classList.remove('active');
            stepSuccess.classList.add('active');

        } catch (error) {
            console.error(error);
            alert('Ops! Ocorreu um erro:\n' + error.message);
        } finally {
            btnSubmit.innerHTML = originalBtnText;
            btnSubmit.disabled = false;
        }
    });

    // --- Intersection Observer para animação do form no Mobile ---
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    formContainer.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        
        observer.observe(formContainer);
    }
});
