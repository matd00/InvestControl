const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken ,(req, res) => {
  res.send('Página de Relatórios');
});

module.exports = router;