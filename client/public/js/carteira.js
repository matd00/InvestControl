document.getElementById('provento-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const ativo = document.getElementById('ativo').value.trim();
    const tipo = document.getElementById('tipo').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
    const msg = document.getElementById('provento-message');
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href('/login');
        return;
    }
    
    const response = await fetch('/api/proventos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ativo, tipo, valor, data })
    });

    if (!localStorage.getItem('token') || response.status == 401 || response.status == 403) {
        window.location.href = '/';
        return;
}
    const dataResp = await response.json();
    if (dataResp.error) {
        msg.style.display = 'block';
        msg.textContent = dataResp.error;
        msg.className = 'message error';
        return;
    }

    msg.style.display = 'block';
    msg.textContent = 'Provento adicionado com sucesso!';
    msg.className = 'message success';
    this.reset();
    
});


