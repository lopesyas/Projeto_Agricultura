// Sistema de Gestão para Agricultura Sustentável
// JavaScript puro - sem frameworks

// Estado da aplicação
let farmers = JSON.parse(localStorage.getItem('farmers')) || [];
let editingFarmerId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeForm();
    initializeChatbot();
    updateDashboard();
    renderFarmers();
});

// Gerenciamento de Tabs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected tab and button
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

// Gerenciamento de Formulário
function initializeForm() {
    const form = document.getElementById('farmer-form');
    const cancelBtn = document.getElementById('cancel-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
    });
    
    cancelBtn.addEventListener('click', () => {
        resetForm();
    });
}

function handleFormSubmit() {
    const nome = document.getElementById('nome').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    
    if (!nome || !cnpj || !cidade || !estado) {
        showToast('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (editingFarmerId) {
        // Atualizar agricultor existente
        const index = farmers.findIndex(f => f.id === editingFarmerId);
        farmers[index] = { id: editingFarmerId, nome, cnpj, cidade, estado };
        showToast('Agricultor atualizado com sucesso!', 'success');
    } else {
        // Adicionar novo agricultor
        const newFarmer = {
            id: Date.now().toString(),
            nome,
            cnpj,
            cidade,
            estado
        };
        farmers.push(newFarmer);
        showToast('Agricultor cadastrado com sucesso!', 'success');
    }
    
    saveFarmers();
    resetForm();
    updateDashboard();
    renderFarmers();
    switchTab('lista');
}

function resetForm() {
    document.getElementById('farmer-form').reset();
    document.getElementById('form-title').textContent = 'Cadastrar Agricultor';
    document.getElementById('submit-text').textContent = 'Cadastrar';
    document.getElementById('cancel-btn').style.display = 'none';
    editingFarmerId = null;
}

function editFarmer(id) {
    const farmer = farmers.find(f => f.id === id);
    if (!farmer) return;
    
    editingFarmerId = id;
    document.getElementById('nome').value = farmer.nome;
    document.getElementById('cnpj').value = farmer.cnpj;
    document.getElementById('cidade').value = farmer.cidade;
    document.getElementById('estado').value = farmer.estado;
    
    document.getElementById('form-title').textContent = 'Atualizar Agricultor';
    document.getElementById('submit-text').textContent = 'Atualizar';
    document.getElementById('cancel-btn').style.display = 'inline-flex';
    
    switchTab('cadastro');
}

function deleteFarmer(id) {
    const farmer = farmers.find(f => f.id === id);
    if (!farmer) return;
    
    const modal = document.getElementById('delete-modal');
    const message = document.getElementById('delete-message');
    const confirmBtn = document.getElementById('confirm-delete');
    const cancelBtn = document.getElementById('cancel-delete');
    
    message.innerHTML = `Tem certeza que deseja excluir <strong>${farmer.nome}</strong>? Esta ação não pode ser desfeita.`;
    modal.classList.add('show');
    
    confirmBtn.onclick = () => {
        farmers = farmers.filter(f => f.id !== id);
        saveFarmers();
        updateDashboard();
        renderFarmers();
        modal.classList.remove('show');
        showToast(`${farmer.nome} foi removido com sucesso.`, 'success');
    };
    
    cancelBtn.onclick = () => {
        modal.classList.remove('show');
    };
}

// Renderização da Lista de Agricultores
function renderFarmers() {
    const container = document.getElementById('farmers-list');
    const emptyState = document.getElementById('lista-empty-state');
    
    if (farmers.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = farmers.map(farmer => `
        <div class="farmer-card">
            <h3>${farmer.nome}</h3>
            <div class="farmer-info">
                <span>📄</span>
                <span>${farmer.cnpj}</span>
            </div>
            <div class="farmer-info">
                <span>📍</span>
                <span>${farmer.cidade}, ${farmer.estado}</span>
            </div>
            <div class="farmer-actions">
                <button class="btn btn-secondary btn-small" onclick="editFarmer('${farmer.id}')">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteFarmer('${farmer.id}')">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// Atualização do Dashboard
function updateDashboard() {
    const totalFarmers = farmers.length;
    const uniqueStates = new Set(farmers.map(f => f.estado)).size;
    const uniqueCities = new Set(farmers.map(f => f.cidade)).size;
    const impact = totalFarmers > 0 ? 'Ativo' : 'Aguardando';
    
    document.getElementById('total-agricultores').textContent = totalFarmers;
    document.getElementById('total-estados').textContent = uniqueStates;
    document.getElementById('total-cidades').textContent = uniqueCities;
    document.getElementById('impacto').textContent = impact;
    
    const emptyState = document.getElementById('empty-state');
    emptyState.style.display = totalFarmers === 0 ? 'block' : 'none';
}

// Chatbot
function initializeChatbot() {
    const options = document.querySelectorAll('.chatbot-option');
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            const action = option.dataset.action;
            handleChatbotAction(action);
        });
    });
}

function handleChatbotAction(action) {
    const resultDiv = document.getElementById('chatbot-result');
    
    switch(action) {
        case 'insumos':
            showInputModal('Calcular Insumos', [
                { label: 'Nome do insumo', id: 'insumo-nome', type: 'text' },
                { label: 'Quantidade por hectare (kg/ha)', id: 'insumo-taxa', type: 'number' },
                { label: 'Área da propriedade (ha)', id: 'insumo-area', type: 'number' }
            ], calculateInsumos);
            break;
        case 'agua':
            showInputModal('Uso de Água', [
                { label: 'Água usada (litros/ha)', id: 'agua-total', type: 'number' },
                { label: 'Redução proporcionada (%)', id: 'agua-reducao', type: 'number' },
                { label: 'Área da propriedade (ha)', id: 'agua-area', type: 'number' }
            ], calculateAgua);
            break;
        case 'irrigacao':
            showResult('💧 Dicas para Economizar Água na Irrigação', [
                'Irrigação por gotejamento',
                'Irrigar no início da manhã ou fim da tarde',
                'Reaproveitar água da chuva',
                'Evitar excesso de irrigação no solo',
                'Monitorar umidade do solo regularmente'
            ]);
            break;
        case 'produtividade':
            showResult('🌱 Como Aumentar a Produtividade Sustentável', [
                'Rotação de culturas',
                'Plantio direto para conservar o solo',
                'Uso de variedades resistentes a pragas',
                'Monitoramento de nutrientes do solo',
                'Integração lavoura-pecuária-floresta'
            ]);
            break;
        case 'adubacao':
            showResult('🌿 Técnicas de Adubação Orgânica', [
                'Compostagem de resíduos vegetais',
                'Adubos verdes (feijão-guandu e crotalária)',
                'Esterco animal tratado',
                'Aplicação equilibrada de nutrientes',
                'Biofertilizantes e húmus de minhoca'
            ]);
            break;
    }
}

function showInputModal(title, fields, callback) {
    const modal = document.getElementById('chatbot-modal');
    const modalTitle = document.getElementById('chatbot-modal-title');
    const modalBody = document.getElementById('chatbot-modal-body');
    const submitBtn = document.getElementById('submit-chatbot');
    const cancelBtn = document.getElementById('cancel-chatbot');
    
    modalTitle.textContent = title;
    
    modalBody.innerHTML = fields.map(field => `
        <div class="form-group">
            <label for="${field.id}">${field.label}</label>
            <input type="${field.type}" id="${field.id}" required>
        </div>
    `).join('');
    
    modal.classList.add('show');
    
    submitBtn.onclick = () => {
        const values = fields.map(field => {
            const input = document.getElementById(field.id);
            return field.type === 'number' ? parseFloat(input.value) : input.value;
        });
        
        if (values.some(v => !v && v !== 0)) {
            showToast('Preencha todos os campos', 'error');
            return;
        }
        
        callback(values);
        modal.classList.remove('show');
    };
    
    cancelBtn.onclick = () => {
        modal.classList.remove('show');
    };
}

function calculateInsumos([nome, taxa, area]) {
    const total = taxa * area;
    showResult('📦 Resultado do Cálculo de Insumos', [
        `Insumo: ${nome}`,
        `Taxa: ${taxa} kg/ha`,
        `Área: ${area} ha`,
        `<strong>Total necessário: ${total.toFixed(2)} kg</strong>`
    ]);
}

function calculateAgua([aguaTotal, reducao, area]) {
    const aguaAjustada = aguaTotal * (1 - reducao / 100);
    const aguaTotalFazenda = aguaAjustada * area;
    showResult('💧 Resultado do Cálculo de Água', [
        `Água original: ${aguaTotal} L/ha`,
        `Redução: ${reducao}%`,
        `Área: ${area} ha`,
        `<strong>Água após técnica sustentável: ${aguaAjustada.toFixed(2)} L/ha</strong>`,
        `<strong>Total na fazenda: ${aguaTotalFazenda.toFixed(2)} L</strong>`
    ]);
}

function showResult(title, items) {
    const resultDiv = document.getElementById('chatbot-result');
    resultDiv.innerHTML = `
        <h3>${title}</h3>
        <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    resultDiv.classList.add('show');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Armazenamento Local
function saveFarmers() {
    localStorage.setItem('farmers', JSON.stringify(farmers));
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
