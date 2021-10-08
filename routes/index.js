const { Router } = require('express');
const express = require('express');
const routes = express.Router();

routes.get('/index', (req, res) => {
    res.render('index');
});

routes.get('/about', (req, res) => {
    res.render('about');
});

module.exports = routes;