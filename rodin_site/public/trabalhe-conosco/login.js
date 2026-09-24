document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');

    // Se já estiver logado, redireciona pro dashboard
    if (sessionStorage.getItem('rodin_hr_auth') === 'true') {
        window.location.href = 'painel-rh.html';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Login simples (Apenas para demonstração de frontend)
        // Usuário: admin / Senha: 123
        if (username === 'admin' && password === '123') {
            sessionStorage.setItem('rodin_hr_auth', 'true');
            window.location.href = 'painel-rh.html';
        } else {
            errorMsg.style.display = 'block';
            
            // Oculta a mensagem de erro após 3 segundos
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 3000);
        }
    });
});
