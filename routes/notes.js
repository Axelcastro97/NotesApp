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
    } /*else {
        const newNote = new Note({title, description});
        await newNote.save();
        req.flash('success_msg', 'Nota agregada con exito!');
        res.redirect('/notes');
    }*/
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/edit/:id',  async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-notes', {notes});
});

router.put('/notes/edit-notes/:id', async(req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Nota agregada con exito!')
    res.redirect('/notes')
});

router.delete('/notes/delete/:id', async (req, res) => { 
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada con exito!')
    res.redirect('/notes');
})

module.exports = router;