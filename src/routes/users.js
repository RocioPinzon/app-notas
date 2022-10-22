const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/users/signin', (req,res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req,res) => {
    res.render('users/signup');


});

router.post('/users/signup', async(req,res) =>{
    const {name,email,password, confirmPassword} = req.body;
    const errors = [];
    
    if(name.length<=0){
        errors.push({text:'El nombre no puede estar vacio.'});
    }
    if(name.length<=0){
        errors.push({text:'La contraseña no puede estar vacia.'});
    }
    if(password!=confirmPassword){
        errors.push({text:'Las contraseñas no son iguales.'});
    }

    if(password.length < 4){
        errors.push({text:'La contraseña debe tener al menos 4 caracteres.'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors,name, email, password, confirmPassword});
    }else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','El email ya está en uso');
            res.redirect('/users/signup');
        } 
        
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','Estás registrado');
        res.redirect('/users/signin');
    }

});

module.exports = router;