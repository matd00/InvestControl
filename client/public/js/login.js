document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-card form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();

        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await handleLogin(email, password); // Remova o csrfToken daqui!
        } catch (error) {
            console.error('Erro durante o processo de login:', error);
            alert(error.message || 'Erro inesperado. Tente novamente.');
        }
    });
});

async function handleLogin(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login bem-sucedido!', data);
            alert('Login bem-sucedido!');
            localStorage.setItem('token', data.token);
            window.location.href = '/carteira';
        } else {
            console.warn('Erro ao fazer login:', data.error || data);
            throw new Error(data.error || 'Erro ao fazer login.');
        }
    } catch (error) {
        console.error('Erro ao enviar login:', error);
        throw new Error('Erro de conexão ao enviar login.');
    }
}