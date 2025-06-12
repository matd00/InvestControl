document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        try {
            // 1. Buscar o token CSRF
            const csrfRes = await fetch('/csrf-token');
            if (!csrfRes.ok) throw new Error('Falha ao obter o token CSRF');
            const { csrfToken } = await csrfRes.json();

            // 2. Enviar os dados para o backend para registro
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': csrfToken
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Usuário registrado com sucesso!');
                window.location.href = './dashboard';
            } else {
                showMessage(data.error || 'Erro ao registrar usuário', true);
            }
        } catch (err) {
            console.error('Erro ao registrar usuário:', err);
            showMessage('Erro de conexão', true);
        }
    });
});

// Função para mostrar mensagens no frontend
function showMessage(text, isError = false, timeoutDuration = 3000) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = text;
    msgDiv.className = 'message' + (isError ? ' error' : '');
    msgDiv.style.display = 'block';
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, timeoutDuration);
}