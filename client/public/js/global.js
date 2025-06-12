document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userInfoDiv = document.getElementById('user-info');
    if (token && userInfoDiv) {
        // Decodifica o payload do JWT (base64)
        const payload = JSON.parse(atob(token.split('.')[1]));
        userInfoDiv.innerHTML = `
            <span>👤 ${payload.name || payload.email}</span>
            <button class="logout-btn" id="logout-btn">Sair</button>
        `;
        document.getElementById('logout-btn').onclick = () => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        };
    }
});