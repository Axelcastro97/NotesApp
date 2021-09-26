const express = require('express');
const path = require('path');
const exphan = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
//Initilizations
const app = express();
require('./database');

//Setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphan({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Meddlewares 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
}));


//Glogal variable 

//Routes 
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Server is listenning 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));

});