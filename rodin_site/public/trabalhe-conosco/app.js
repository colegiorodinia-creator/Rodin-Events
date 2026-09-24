// Verificação de Autenticação
if (sessionStorage.getItem('rodin_hr_auth') !== 'true') {
    window.location.href = 'login.html';
}

// Lógica de logout
function logout() {
    sessionStorage.removeItem('rodin_hr_auth');
    window.location.href = 'login.html';
}

// Chaves do Supabase
const supabaseUrl = 'https://iafuyoohinwpokzcqzwy.supabase.co/rest/v1/rodin_curriculos';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZnV5b29oaW53cG9remNxend5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzMzODgsImV4cCI6MjA5NzIwOTM4OH0.epthJRsSQMwaJ2qL2EXqHzm8px8mJZgCXu1n55UYl-M';

// Lista global de candidatos
let candidates = [];

// Ícones dos formatos
const formatIcons = {
    'LinkedIn': '<svg class="format-icon" viewBox="0 0 24 24" fill="#0077b5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'PDF': '<svg class="format-icon" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>',
    'Formulário': '<svg class="format-icon" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
};

// Cores dos status (classes CSS)
const statusClasses = {
    'Novo': 'status-new',
    'Em Análise': 'status-analysis',
    'Entrevista': 'status-interview',
    'Rejeitado': 'status-rejected'
};

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('candidates-body');
    const tableBodyHistory = document.getElementById('candidates-body-history');
    const sectorsGrid = document.getElementById('sectors-grid');
    const viewHistoricoSetor = document.getElementById('view-historico-setor');
    const viewHistorico = document.getElementById('view-historico');
    const historicoSetorTitle = document.getElementById('historico-setor-title');
    const btnVoltarPastas = document.getElementById('btn-voltar-pastas');
    
    // Todos os setores possíveis
    const allSectors = ["Administrativo", "Coordenação Pedagógica", "Corpo Docente", "Inspetoria / Apoio ao Aluno", "Limpeza / Manutenção / Zeladoria", "Marketing / Comunicação", "Secretaria / Portaria", "Tecnologia da Informação (TI)", "Outros"];
    let currentActiveSector = null;

    // Filtros
    const statusFilterHistory = document.getElementById('status-filter-history');
    const searchInput = document.querySelector('.search-bar input');

    // Elementos do Modal
    const modal = document.getElementById('candidate-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    // Função para buscar os candidatos no Supabase
    async function loadCandidatesFromSupabase() {
        try {
            const response = await fetch(`${supabaseUrl}?select=*&order=created_at.desc`, {
                method: 'GET',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`
                }
            });
            
            if (!response.ok) throw new Error('Erro ao buscar dados do Supabase');
            
            const rawData = await response.json();
            
            // Filtra os candidatos de teste que foram marcados para exclusão lógica
            candidates = rawData.filter(c => c.status !== 'Excluido_Teste');
            
            renderFolders();
            filterCandidates();
            updateStats();
            if(typeof renderVagas === 'function') renderVagas();
        } catch (error) {
            console.error('Erro de conexão:', error);
            if (tableBody) tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: #ef4444;">Erro ao carregar dados do banco de dados.</td></tr>`;
        }
    }

    // Função para renderizar as pastas de setores
    function renderFolders() {
        if (!sectorsGrid) return;
        
        let htmlStr = '';
        allSectors.forEach(sector => {
            const count = candidates.filter(c => c.sector === sector && c.status !== 'Rejeitado').length;
            htmlStr += `
                <div class="folder-card" onclick="openSectorView('${sector}')">
                    <svg class="folder-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <div class="folder-info">
                        <h3>${sector}</h3>
                        <p>${count} currículo${count !== 1 ? 's' : ''}</p>
                    </div>
                </div>
            `;
        });
        
        // Pasta especial "Descartados"
        const descartadosCount = candidates.filter(c => c.status === 'Rejeitado').length;
        htmlStr += `
            <div class="folder-card" onclick="openSectorView('Descartados')" style="border-color: #ef4444; background-color: #fef2f2;">
                <svg class="folder-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <div class="folder-info">
                    <h3 style="color: #ef4444;">Descartados</h3>
                    <p>${descartadosCount} currículo${descartadosCount !== 1 ? 's' : ''}</p>
                </div>
            </div>
        `;
        
        sectorsGrid.innerHTML = htmlStr;
    }

    // Navegar para a visão de um setor específico
    window.openSectorView = function(sector) {
        currentActiveSector = sector;
        if (historicoSetorTitle) historicoSetorTitle.textContent = `Setor: ${sector}`;
        
        // Esconde mural, mostra tabela
        viewHistorico.style.display = 'none';
        viewHistorico.classList.remove('active');
        viewHistoricoSetor.style.display = 'block';
        
        // Trigger reflow e animação
        void viewHistoricoSetor.offsetWidth;
        viewHistoricoSetor.classList.add('active');
        
        filterCandidates();
    }
    
    if (btnVoltarPastas) {
        btnVoltarPastas.addEventListener('click', () => {
            currentActiveSector = null;
            viewHistoricoSetor.style.display = 'none';
            viewHistoricoSetor.classList.remove('active');
            
            viewHistorico.style.display = 'block';
            void viewHistorico.offsetWidth;
            viewHistorico.classList.add('active');
            
            renderFolders(); // Atualizar as contagens
        });
    }

    // Função para renderizar a tabela
    function renderTable(data, targetBody, isHistory = false) {
        if (!targetBody) return;
        let htmlStr = '';
        
        if (data.length === 0) {
            const colSpan = isHistory ? 5 : 6;
            htmlStr = `
                <tr>
                    <td colspan="${colSpan}" style="text-align: center; padding: 40px; color: var(--text-muted);">
                        Nenhum candidato encontrado.
                    </td>
                </tr>
            `;
        } else {
            data.forEach(candidate => {
                const iconFormat = formatIcons[candidate.format] || formatIcons['Formulário'];
                htmlStr += `
                    <tr>
                        <td>
                            <div class="candidate-cell">
                                <div class="candidate-avatar">${candidate.avatar || 'RH'}</div>
                                <div class="candidate-details">
                                    <span class="candidate-name">${candidate.name}</span>
                                    <span class="candidate-email">${candidate.email}</span>
                                </div>
                            </div>
                        </td>
                        ${!isHistory ? `<td><span class="sector-badge">${candidate.sector}</span></td>` : ''}
                        <td>
                            <div class="format-badge">
                                ${iconFormat}
                                ${candidate.format}
                            </div>
                        </td>
                        <td style="color: var(--text-muted); font-size: 0.9rem;">${candidate.date}</td>
                        <td>
                            <span class="status-badge ${statusClasses[candidate.status] || 'status-new'}">${candidate.status}</span>
                        </td>
                        <td style="display: flex; gap: 8px;">
                            <button class="action-btn" title="Ver Detalhes" data-id="${candidate.id}" onclick="openModal('${candidate.id}')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                            ${candidate.status !== 'Rejeitado' ? `
                            <button class="action-btn" title="Descartar (Mover p/ Lixeira)" style="color: #ef4444;" onclick="rejectCandidate('${candidate.id}')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                            ` : `
                            <button class="action-btn" title="Restaurar (Mover p/ Novo)" style="color: #10b981;" onclick="restoreCandidate('${candidate.id}')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                            </button>
                            `}
                        </td>
                    </tr>
                `;
            });
        }
        targetBody.innerHTML = htmlStr;
    }

    // Modal no escopo global para o onclick
    let activeCandidateId = null;
    
    window.openModal = function(id) {
        const candidate = candidates.find(c => c.id == id);
        if(!candidate) return;
        
        activeCandidateId = id;

        document.getElementById('modal-avatar').textContent = candidate.avatar || 'RH';
        document.getElementById('modal-name').textContent = candidate.name;
        document.getElementById('modal-email').innerHTML = `${candidate.email}<br>${candidate.phone || 'Sem telefone'}`;
        document.getElementById('modal-sector').textContent = candidate.sector;
        
        // Renderizar Badges de Formato
        const formatDiv = document.getElementById('modal-format-badges');
        const formats = candidate.format ? candidate.format.split(' + ') : ['Formulário'];
        formatDiv.innerHTML = formats.map(f => `<div class="sector-badge modal-badge" style="background: #e2e8f0; color: #475569;">${f}</div>`).join('');
        
        const modalResumeDiv = document.getElementById('modal-resume');
        const btnBaixarPdf = document.getElementById('btn-modal-baixar-pdf');
        const groupResume = document.getElementById('group-resume');
        const groupMotivation = document.getElementById('group-motivation');
        
        let htmlContent = '';
        let hasPdf = false;
        let hasForm = false;
        let pdfUrlForButton = '';

        let resumeStr = candidate.resume || '';
        const motivationStr = candidate.motivation || '';

        // Extracao de Notas e remocao do texto principal para nao interferir no render legado
        let extractedNotes = '';
        const notasMatch = resumeStr.match(/\[NOTAS\](.*?)\[\/NOTAS\]/s);
        if (notasMatch) {
            extractedNotes = notasMatch[1].trim();
            resumeStr = resumeStr.replace(/\[NOTAS\].*?\[\/NOTAS\]/s, '').trim();
        }
        
        const modalNotes = document.getElementById('modal-notes');
        const btnSaveNotes = document.getElementById('btn-save-notes');
        if (modalNotes) {
            modalNotes.value = extractedNotes;
            // Mostra o botao salvar apenas se houver edicao
            modalNotes.oninput = () => {
                btnSaveNotes.style.display = 'block';
            };
            btnSaveNotes.style.display = 'none';
        }

        if (resumeStr.includes('[URL_PDF]') || resumeStr.includes('[URL_LINKEDIN]') || resumeStr.includes('[TEXTO]')) {
            // Extracao PDF
            const pdfMatch = resumeStr.match(/\[URL_PDF\](.*?)\[\/URL_PDF\]/s);
            if (pdfMatch && pdfMatch[1]) {
                const url = pdfMatch[1].trim();
                hasPdf = true;
                pdfUrlForButton = url;
                htmlContent += `
                    <div style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; height: 650px; background: #f1f5f9; display: flex; justify-content: center; align-items: center;">
                        <iframe src="${url}" width="100%" height="100%" style="border:none;"></iframe>
                    </div>
                `;
            }

            // Extracao LinkedIn
            const lnMatch = resumeStr.match(/\[URL_LINKEDIN\](.*?)\[\/URL_LINKEDIN\]/s);
            if (lnMatch && lnMatch[1]) {
                const url = lnMatch[1].trim();
                htmlContent += `
                    <a href="${url}" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: #0077b5; color: white; text-decoration: none; border-radius: 8px; font-weight: 500; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Ver Perfil Completo no LinkedIn
                    </a>
                `;
            }

            // Extracao Texto (Formulário)
            const txtMatch = resumeStr.match(/\[TEXTO\](.*?)\[\/TEXTO\]/s);
            if (txtMatch && txtMatch[1]) {
                hasForm = true;
                const text = txtMatch[1].trim();
                htmlContent += `
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="display:block; margin-bottom: 5px; color: var(--text-main);">Resposta do Formulário:</strong>
                        <p style="margin:0; white-space: pre-wrap;">${text}</p>
                    </div>
                `;
            }
        } else {
            // Renderização Legada (Testes antigos)
            if (resumeStr && resumeStr !== 'Nenhum resumo fornecido.' && resumeStr !== 'Currículo recebido em formato LinkedIn.' && resumeStr !== 'Currículo recebido em formato PDF.') {
                htmlContent = `
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid var(--border-color);">
                        <p style="margin:0; white-space: pre-wrap;">${resumeStr}</p>
                    </div>
                `;
            }
            if (motivationStr && motivationStr !== 'Nenhuma motivação fornecida.' && motivationStr !== 'Candidatura enviada via portal Trabalhe Conosco.') {
                hasForm = true;
            }
        }

        // Mostrar Resumo se tiver algo
        if (htmlContent) {
            modalResumeDiv.innerHTML = htmlContent;
            groupResume.style.display = 'block';
        } else {
            groupResume.style.display = 'none';
        }

        // Mostrar Motivação apenas se usou Formulário
        if (hasForm && motivationStr) {
            document.getElementById('modal-motivation').textContent = motivationStr;
            groupMotivation.style.display = 'block';
        } else {
            groupMotivation.style.display = 'none';
        }

        if (hasPdf && btnBaixarPdf) {
            btnBaixarPdf.style.display = 'inline-block';
            btnBaixarPdf.onclick = () => window.open(pdfUrlForButton, '_blank');
        } else if (btnBaixarPdf) {
            btnBaixarPdf.style.display = 'none';
        }
        document.getElementById('modal-status').value = candidate.status;

        // Renderizar opções de Vagas Disponíveis e checar se está vinculado
        const modalVaga = document.getElementById('modal-vaga');
        if (modalVaga) {
            modalVaga.innerHTML = '<option value="">Nenhuma</option>' + 
                vagas.map(v => `<option value="${v.id}">${v.title}</option>`).join('');
            
            const linkedVaga = vagas.find(v => v.candidates && v.candidates.includes(candidate.id.toString()));
            if (linkedVaga) {
                modalVaga.value = linkedVaga.id;
            } else {
                modalVaga.value = "";
            }
        }

        modal.classList.add('active');
    }
    
    // Salvar Notas via API
    const btnSaveNotes = document.getElementById('btn-save-notes');
    const modalNotes = document.getElementById('modal-notes');
    if (btnSaveNotes && modalNotes) {
        btnSaveNotes.addEventListener('click', async () => {
            if (!activeCandidateId) return;
            const candidate = candidates.find(c => c.id == activeCandidateId);
            if (!candidate) return;
            
            const newNotes = modalNotes.value.trim();
            let baseResume = candidate.resume || '';
            // Remove notas antigas
            baseResume = baseResume.replace(/\[NOTAS\].*?\[\/NOTAS\]/s, '').trim();
            // Appends novas notas
            if (newNotes) {
                baseResume += `\n\n[NOTAS]\n${newNotes}\n[/NOTAS]`;
            }
            
            const originalText = btnSaveNotes.textContent;
            btnSaveNotes.textContent = 'Salvando...';
            btnSaveNotes.disabled = true;
            
            try {
                const response = await fetch(`${supabaseUrl}?id=eq.${candidate.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': supabaseKey,
                        'Authorization': `Bearer ${supabaseKey}`
                    },
                    body: JSON.stringify({ resume: baseResume })
                });
                
                if (!response.ok) throw new Error('Falha ao salvar nota');
                
                candidate.resume = baseResume;
                btnSaveNotes.textContent = 'Salvo!';
                setTimeout(() => {
                    btnSaveNotes.style.display = 'none';
                    btnSaveNotes.textContent = originalText;
                }, 2000);
            } catch (error) {
                console.error(error);
                alert('Erro ao salvar a nota. Tente novamente.');
                btnSaveNotes.textContent = originalText;
            } finally {
                btnSaveNotes.disabled = false;
            }
        });
    }

    // Atualizar status via API
    const modalStatus = document.getElementById('modal-status');
    if (modalStatus) {
        modalStatus.addEventListener('change', async (e) => {
            if (!activeCandidateId) return;
            const newStatus = e.target.value;
            const candidate = candidates.find(c => c.id == activeCandidateId);
            
            if (candidate) {
                // Desabilitar o seletor enquanto atualiza
                modalStatus.disabled = true;
                
                // Atualizar no Supabase
                try {
                    const response = await fetch(`${supabaseUrl}?id=eq.${candidate.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': supabaseKey,
                            'Authorization': `Bearer ${supabaseKey}`
                        },
                        body: JSON.stringify({ status: newStatus })
                    });
                    
                    if (!response.ok) throw new Error('Falha ao atualizar no banco');
                    
                    candidate.status = newStatus;
                    filterCandidates(); // Atualiza a tabela
                    updateStats(); // Atualiza as estatísticas
                    renderFolders(); // Atualiza contador nas pastas
                } catch (error) {
                    console.error(error);
                    alert('Erro ao atualizar o status. Tente novamente.');
                    // Reverte visualmente
                    modalStatus.value = candidate.status;
                } finally {
                    modalStatus.disabled = false;
                }
            }
        });
    }

    // Vincular candidato a uma vaga via LocalStorage
    const modalVagaSelect = document.getElementById('modal-vaga');
    if (modalVagaSelect) {
        modalVagaSelect.addEventListener('change', (e) => {
            if (!activeCandidateId) return;
            const targetVagaId = e.target.value;
            const candIdStr = activeCandidateId.toString();
            
            // Remover de todas as vagas primeiro
            vagas.forEach(v => {
                if(v.candidates) {
                    v.candidates = v.candidates.filter(cid => cid !== candIdStr);
                }
            });

            // Adicionar na nova vaga
            if (targetVagaId) {
                const targetVaga = vagas.find(v => v.id == targetVagaId);
                if (targetVaga) {
                    if(!targetVaga.candidates) targetVaga.candidates = [];
                    targetVaga.candidates.push(candIdStr);
                }
            }
            
            localStorage.setItem('rodin_vagas', JSON.stringify(vagas));
            renderVagas();
        });
    }

    // Função de exclusão rápida (Move para Rejeitado)
    window.rejectCandidate = async function(id) {
        if (!confirm('Deseja mover este currículo para os Descartados?')) return;
        
        const candidate = candidates.find(c => c.id == id);
        if(!candidate) return;
        
        try {
            const response = await fetch(`${supabaseUrl}?id=eq.${candidate.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`
                },
                body: JSON.stringify({ status: 'Rejeitado' })
            });
            
            if (!response.ok) throw new Error('Falha ao atualizar no banco');
            
            candidate.status = 'Rejeitado';
            filterCandidates();
            updateStats();
            renderFolders();
        } catch (error) {
            console.error(error);
            alert('Erro ao descartar o candidato. Tente novamente.');
        }
    };

    // Função de restauração (Move de volta para Novo)
    window.restoreCandidate = async function(id) {
        if (!confirm('Deseja restaurar este currículo para a área de recrutamento ativo?')) return;
        
        const candidate = candidates.find(c => c.id == id);
        if(!candidate) return;
        
        try {
            const response = await fetch(`${supabaseUrl}?id=eq.${candidate.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`
                },
                body: JSON.stringify({ status: 'Novo' })
            });
            
            if (!response.ok) throw new Error('Falha ao atualizar no banco');
            
            candidate.status = 'Novo';
            filterCandidates();
            updateStats();
            renderFolders();
        } catch (error) {
            console.error(error);
            alert('Erro ao restaurar o candidato. Tente novamente.');
        }
    };

    // Filtros
    function filterCandidates() {
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';

        // Tabela Painel Geral
        const filteredGeral = candidates.filter(candidate => {
            const matchSearch = candidate.name.toLowerCase().includes(searchValue) || 
                                candidate.email.toLowerCase().includes(searchValue) ||
                                candidate.sector.toLowerCase().includes(searchValue);
            return matchSearch;
        });
        renderTable(filteredGeral, tableBody, false);
        
        // Tabela Histórico Setor
        if (currentActiveSector) {
            const statusValue = statusFilterHistory ? statusFilterHistory.value : 'all';
            const filteredSetor = candidates.filter(candidate => {
                const matchSearch = candidate.name.toLowerCase().includes(searchValue) || 
                                    candidate.email.toLowerCase().includes(searchValue);
                
                if (currentActiveSector === 'Descartados') {
                    return candidate.status === 'Rejeitado' && matchSearch;
                }

                const matchSector = candidate.sector === currentActiveSector;
                const matchStatus = statusValue === 'all' || candidate.status === statusValue;
                const notRejected = candidate.status !== 'Rejeitado';
                
                return matchSector && matchStatus && notRejected && matchSearch;
            });
            renderTable(filteredSetor, tableBodyHistory, true);
        }
    }

    if(statusFilterHistory) statusFilterHistory.addEventListener('change', filterCandidates);
    if(searchInput) searchInput.addEventListener('input', filterCandidates);

    function closeModal() {
        modal.classList.remove('active');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });

    // Atualização de Estatísticas (Dashboard)
    function updateStats() {
        const totalEl = document.getElementById('stat-total');
        const interviewEl = document.getElementById('stat-interview');
        
        if(totalEl) totalEl.textContent = candidates.length;
        if(interviewEl) {
            const interviews = candidates.filter(c => c.status === 'Entrevista').length;
            interviewEl.textContent = interviews;
        }
    }

    // Carregamento inicial do banco de dados (chama a API do Supabase)
    loadCandidatesFromSupabase();

    // ==========================================
    // Navegação SPA
    // ==========================================
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            viewSections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            const targetView = document.getElementById(targetId);
            if(targetView) {
                targetView.style.display = 'block';
                void targetView.offsetWidth; // trigger reflow
                targetView.classList.add('active');
            }
        });
    });

    // ==========================================
    // Vagas - Estilo Post-it
    // ==========================================
    const vagasGrid = document.getElementById('vagas-grid');
    const btnAddVaga = document.getElementById('btn-add-vaga');
    const vagaModal = document.getElementById('vaga-modal');
    const closeVagaModalBtn = document.getElementById('close-vaga-modal');
    const btnSalvarVaga = document.getElementById('btn-salvar-vaga');
    
    // Vagas (Persistidas no localStorage para não perder ao recarregar)
    let vagas = JSON.parse(localStorage.getItem('rodin_vagas')) || [];

    window.excluirVaga = function(id) {
        if(confirm('Tem certeza que deseja remover esta vaga?')) {
            vagas = vagas.filter(v => v.id !== id);
            localStorage.setItem('rodin_vagas', JSON.stringify(vagas));
            renderVagas();
        }
    }

    window.concluirVaga = function(id) {
        const vaga = vagas.find(v => v.id === id);
        if (vaga) {
            // Toggle the status
            vaga.status = vaga.status === 'concluida' ? 'aberta' : 'concluida';
            localStorage.setItem('rodin_vagas', JSON.stringify(vagas));
            renderVagas();
        }
    }

    function renderVagas() {
        if(!vagasGrid) return;
        vagasGrid.innerHTML = '';
        
        const vagasAtivasEl = document.getElementById('stat-vagas-ativas');
        if(vagasAtivasEl) vagasAtivasEl.textContent = vagas.length;

        if(vagas.length === 0) {
            vagasGrid.innerHTML = '<p style="color:var(--text-muted); width:100%; grid-column: 1 / -1;">Nenhuma vaga cadastrada. Clique em "+ Nova Vaga" para criar a primeira.</p>';
            return;
        }

        vagas.forEach(vaga => {
            const div = document.createElement('div');
            div.className = 'post-it';
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            
            let candList = '';
            let linkedCandidates = [];
            candidates.forEach(c => {
                const isManuallyLinked = vaga.candidates && vaga.candidates.includes(c.id.toString());
                const isAutoLinked = c.resume && c.resume.includes(`[VAGA_ID]${vaga.id}[/VAGA_ID]`);
                if (isManuallyLinked || isAutoLinked) {
                    // Check if not already in the list to prevent duplicates
                    if (!linkedCandidates.some(linkedCand => linkedCand.id === c.id)) {
                        linkedCandidates.push(c);
                    }
                }
            });

            if (linkedCandidates.length > 0) {
                candList = `<div class="post-it-candidates" style="margin-top: 15px; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 10px;">
                    <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 5px;">Candidatos Redirecionados:</span>
                    <ul style="list-style: none; padding: 0; margin: 0;">`;
                
                linkedCandidates.forEach(c => {
                    const firstName = c.name.split(' ')[0];
                    candList += `<li style="font-size: 0.85rem; padding: 4px 0; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--text-main); font-weight: 500;">${firstName}</span>
                        <button onclick="openModal('${c.id}')" style="background: none; border: none; color: var(--primary-orange); cursor: pointer; font-size: 0.8rem; text-decoration: underline;">Ver ficha</button>
                    </li>`;
                });
                candList += `</ul></div>`;
            }

            const isConcluida = vaga.status === 'concluida';
            const opacity = isConcluida ? '0.7' : '1';
            const bgColor = isConcluida ? '#f1f5f9' : '#fff';
            const borderColor = isConcluida ? '#10b981' : 'var(--border-color)';
            
            div.style.opacity = opacity;
            div.style.backgroundColor = bgColor;
            div.style.borderColor = borderColor;
            
            const badgeHtml = isConcluida ? `<div style="font-size: 0.75rem; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 12px; display: inline-block; margin-bottom: 8px; font-weight: 600;">Processo Concluído</div>` : '';

            div.innerHTML = `
                ${badgeHtml}
                <div class="post-it-title" style="${isConcluida ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${vaga.title}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 25px;">
                    <strong>Local:</strong> ${vaga.local || 'Não informado'}<br>
                    <strong>Função:</strong> ${vaga.funcao || 'Não informada'}
                </div>
                <button onclick="viewVagaCompleta(${vaga.id})" style="background-color: #fff7ed; border: 1px solid var(--primary-orange); color: var(--primary-orange); border-radius: 6px; padding: 6px 12px; font-size: 0.85rem; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 10px; width: fit-content; transition: all 0.2s;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    Ver Detalhes
                </button>
                ${candList}
                <div class="post-it-footer" style="margin-top: auto; padding-top: 15px;">
                    <span>Criado em: ${vaga.date}</span>
                    <div style="display: flex; gap: 5px;">
                        <button class="post-it-delete" onclick="concluirVaga(${vaga.id})" title="${isConcluida ? 'Reabrir Processo' : 'Concluir Processo'}" style="color: ${isConcluida ? '#8b5cf6' : '#10b981'};">
                            ${isConcluida ? 
                                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>' : 
                                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
                            }
                        </button>
                        <button class="post-it-delete" onclick="excluirVaga(${vaga.id})" title="Excluir Vaga">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
            `;
            vagasGrid.appendChild(div);
        });
    }

    if(btnAddVaga && vagaModal) {
        btnAddVaga.addEventListener('click', () => {
            document.getElementById('nova-vaga-titulo').value = '';
            document.getElementById('nova-vaga-sobre').value = '';
            document.getElementById('nova-vaga-local').value = '';
            document.getElementById('nova-vaga-funcao').value = '';
            document.getElementById('nova-vaga-responsabilidades').value = '';
            document.getElementById('nova-vaga-habilidades').value = '';
            document.getElementById('nova-vaga-destaque').value = '';
            document.getElementById('nova-vaga-beneficios').value = '';
            
            const textoPadraoSalvo = localStorage.getItem('rodin_vaga_texto_padrao') || "No Colégio Rodin, acreditamos que aprender é viver experiências, construir conexões e crescer juntos. Valorizamos pessoas comprometidas, criativas e apaixonadas por fazer a diferença no dia a dia. Aqui, trabalhamos em equipe, celebramos conquistas e criamos momentos que marcam a trajetória dos nossos alunos e colaboradores.";
            document.getElementById('nova-vaga-textopadrao').value = textoPadraoSalvo;
            
            vagaModal.classList.add('active');
        });

        const btnSaveDefaultText = document.getElementById('btn-save-default-text');
        if(btnSaveDefaultText) {
            btnSaveDefaultText.addEventListener('click', () => {
                const newDefault = document.getElementById('nova-vaga-textopadrao').value.trim();
                localStorage.setItem('rodin_vaga_texto_padrao', newDefault);
                alert('Novo texto padrão salvo com sucesso! Ele será carregado automaticamente nas próximas vagas.');
            });
        }

        closeVagaModalBtn.addEventListener('click', () => {
            vagaModal.classList.remove('active');
        });
        vagaModal.addEventListener('click', (e) => {
            if(e.target === vagaModal) vagaModal.classList.remove('active');
        });

        const viewVagaModal = document.getElementById('view-vaga-modal');
        const closeViewVagaModalBtn = document.getElementById('close-view-vaga-modal');

        if(closeViewVagaModalBtn && viewVagaModal) {
            closeViewVagaModalBtn.addEventListener('click', () => {
                viewVagaModal.classList.remove('active');
            });
            viewVagaModal.addEventListener('click', (e) => {
                if(e.target === viewVagaModal) viewVagaModal.classList.remove('active');
            });
        }

        window.viewVagaCompleta = function(id) {
            const vaga = vagas.find(v => v.id == id);
            if (!vaga || !viewVagaModal) return;

            document.getElementById('view-vaga-title').textContent = vaga.title;
            document.getElementById('view-vaga-local').innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${vaga.local || 'Não informado'}`;
            document.getElementById('view-vaga-funcao').innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${vaga.funcao || 'Não informada'}`;
            
            document.getElementById('view-vaga-sobre').textContent = vaga.desc || '';
            document.getElementById('view-vaga-responsabilidades').textContent = vaga.responsabilidades || '';
            document.getElementById('view-vaga-habilidades').textContent = vaga.habilidades || '';
            
            const destaque = vaga.destaque || '';
            const beneficios = vaga.beneficios || '';
            
            const destaqueContainer = document.getElementById('view-vaga-destaque-container');
            if (destaque.trim() !== '') {
                destaqueContainer.style.display = 'block';
                document.getElementById('view-vaga-destaque').textContent = destaque;
            } else {
                destaqueContainer.style.display = 'none';
            }

            const beneficiosContainer = document.getElementById('view-vaga-beneficios-container');
            if (beneficios.trim() !== '') {
                beneficiosContainer.style.display = 'block';
                document.getElementById('view-vaga-beneficios').textContent = beneficios;
            } else {
                beneficiosContainer.style.display = 'none';
            }

            document.getElementById('view-vaga-textopadrao').textContent = vaga.textoPadrao || '';

            viewVagaModal.classList.add('active');
        };

        // Configura formatação de lista (bullets) automática para os campos de textarea
        const listTextareas = [
            'nova-vaga-responsabilidades',
            'nova-vaga-habilidades',
            'nova-vaga-destaque',
            'nova-vaga-beneficios'
        ];
        
        listTextareas.forEach(id => {
            const el = document.getElementById(id);
            if(!el) return;
            
            el.addEventListener('focus', () => {
                if(el.value.trim() === '') {
                    el.value = '• ';
                }
            });
            
            el.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    // Obtém a posição atual do cursor
                    const start = el.selectionStart;
                    const end = el.selectionEnd;
                    const val = el.value;
                    
                    // Insere nova linha e bullet
                    el.value = val.substring(0, start) + '\n• ' + val.substring(end);
                    
                    // Move o cursor
                    el.selectionStart = el.selectionEnd = start + 3;
                }
            });
            
            // Limpa o bullet se a pessoa apagar tudo
            el.addEventListener('keyup', () => {
                if(el.value === '•' || el.value === '• ') {
                    // Só não limpa se ela ainda estiver no começo querendo digitar
                }
            });
            el.addEventListener('blur', () => {
                if(el.value.trim() === '•' || el.value.trim() === '') {
                    el.value = '';
                }
            });
        });

        btnSalvarVaga.addEventListener('click', () => {
            const title = document.getElementById('nova-vaga-titulo').value.trim();
            const desc = document.getElementById('nova-vaga-sobre').value.trim();
            const local = document.getElementById('nova-vaga-local').value.trim();
            const funcao = document.getElementById('nova-vaga-funcao').value.trim();
            const responsabilidades = document.getElementById('nova-vaga-responsabilidades').value.trim();
            const habilidades = document.getElementById('nova-vaga-habilidades').value.trim();
            const destaque = document.getElementById('nova-vaga-destaque').value.trim();
            const beneficios = document.getElementById('nova-vaga-beneficios').value.trim();
            const textoPadrao = document.getElementById('nova-vaga-textopadrao').value.trim();
            
            if(!title || !desc || !local || !funcao || !responsabilidades || !habilidades) {
                alert('Por favor, preencha todos os campos obrigatórios (*).');
                return;
            }

            const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
            const newVaga = { 
                id: Date.now(), 
                title, 
                desc, 
                local, 
                funcao, 
                responsabilidades, 
                habilidades, 
                destaque, 
                beneficios,
                textoPadrao,
                date 
            };
            vagas.push(newVaga);
            localStorage.setItem('rodin_vagas', JSON.stringify(vagas));
            renderVagas();
            vagaModal.classList.remove('active');
        });
    }

    renderVagas();
});
