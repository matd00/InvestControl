const express = require('express');
const AuthController = require('./AuthController');
const router = express.Router();

router.post('/login', AuthController.login);

module.exports = router;