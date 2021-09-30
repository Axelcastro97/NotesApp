const express = require('express');
const router = express.Router();

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.get('/notes', (req, res) => {
    res.end('Notes from database');
});

router.post('/notes/new-note', (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Por favor escriba el titulo' });
    }
    if (!description) {
        errors.push({ text: 'Por favor escriba una descripción' })
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        res.send('ok');
    }
});

module.exports = router;