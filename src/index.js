const express = require('express');
const path  = require('path');
const exphandle = require('express-handlebars');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Initiliazations
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));

app.engine('.hbs', exphandle.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret:'mySecretWord',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());


//Global Variables 
app.use((req,res, next)=>{
    
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');

    next();
});

//Routes

app.use(require('./routes/index'));
app.use(require('./routes/notas'));
app.use(require('./routes/users'));

// Static files

app.use(express.static(path.join(__dirname,'public')));

// Server is listenning 
app.listen(app.get('port'), () =>{
    console.log('Servidor en puerto', app.get('port'))
});