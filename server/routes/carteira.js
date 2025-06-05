const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Página da Carteira');
});

module.exports = router;