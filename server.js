require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');

app.use('/login', loginRoute);
app.use('/dashboard', dashboardRoute);

