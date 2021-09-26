const express = require('express');
const router = express.Router();



router.get('/notes', (req, res) => {
    res.end('Notes from database');
});

module.exports = router