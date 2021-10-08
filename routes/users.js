const express = require('express');
const Users = require('../models/Users');
const routes = express.Router();
const users = require('../models/Users');
routes.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

routes.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

routes.post('/users/signup', async (req, res) => {
    const {name, lastname, email, password, confirm_password} = req.body; 
    const errors = [];
    if(name.length <= 0) {
        errors.push({text: `Debes poner el nombre`}); 
    }
    if(lastname.length <= 0 ){
        errors.push({text: `Debes poner el apellido`});   
    }
    if(email.length <= 0) {
        errors.push({text: `Debes poner el email`});
    }
    if(password != confirm_password) {
        errors.push({text: `Las contraseñas deben coincidir`});
    }
    if(password.length < 4) {
        errors.push({text: `Debes poner una contraseña superior a 4 caracteres`});
    }
    if(errors.length > 0) {
        res.render('/users/signup', {errors, name, lastname, email, password, confirm_password});
    } else {
        const emailUser = await Users.findOne({email: email});
        if(emailUsers) { 
            req.flash('error_msg', `Este email ya esta en uso`);
            res.redirect('/users/signup');
        }
        const newUsers = new Users({name, lastname, email, password});
        newUsers.password = await newUsers.encryptPassword(password)
        await newUsers.save();
        req.flash('success_mgs', `Ya estas registrado`);
        res.redirect('/users/signin');
    }
});
module.exports = routes;