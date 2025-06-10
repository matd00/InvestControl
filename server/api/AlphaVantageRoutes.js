const express = require('express');
const AlphaVantageController = require('./AlphaVantageController');
const authenticateToken = require('../middleware/auth')
const router = express.Router();

router.get('/asset', AlphaVantageController.getAssetQuote);
router.get('/search', AlphaVantageController.searchAssets);

router.get('/private-data', authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.name}!` });
});

module.exports = router;
