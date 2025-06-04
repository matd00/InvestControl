function showMessage(text, isError = false, timeoutDuration = 3000) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = text;
    msgDiv.className = 'message' + (isError ? ' error' : '');
    msgDiv.style.display = 'block';
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, timeoutDuration);
}

// Carrega a function apenas depois do HTML ser carregado
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#register-card form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Formulário de registro enviado');
            
            const name = registerForm.querySelector('input[type="text"]').value;
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('Usuário registrado com sucesso!');
                    
                    // window.location.href = '/dashboard'; //
                } else {
                    showMessage(data.error || 'Erro ao registrar usuário', true);
                }
            } catch (err) {
                console.error(err);
                showMessage('Erro de conexão', true);
            }
        });
    }
});