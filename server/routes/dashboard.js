const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/',authenticateToken, (req, res) => {
  res.send('Página do Dashboard');
});

module.exports = router;