const express = require('express');
const bcrypt = require('bcryptjs')
const path = require('path')
const pool = require('../db')

const router = express.Router();
        
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});


module.exports = router;