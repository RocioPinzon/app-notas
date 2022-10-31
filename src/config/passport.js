const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email,password,done) =>{
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, {message:'Usuario no encontrado'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return(null, false, {message:'Contraseña incorrecta.'});
        }
    }

}));



//----- serializeUser y deserializeUser ----//
// Nos permite validar a cada momento que un usuario quiera loguearse en la app

//Almacenamos en una sesion el ID del usuario. 
passport.serializeUser((user, done) => {
    done(null,user.id);
});

// Busca/Obtiene en la BD un ID y genera un usuario
passport.deserializeUser((id,done) => {
    User.findById(id,(err,user)=>{
        done(err, user);
    });
});