const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Página do Dashboard');
});

module.exports = router;