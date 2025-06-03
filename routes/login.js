const express = require('express');
const session = require('express-session')

const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.use(session({secret:'qwertyuiop1234567'}))

module.exports = router;