const express = require('express');
const router = express.Router();
const Nota = require('../models/Nota');


router.get('/notas/add', (req,res) => {
    res.render('notas/new-note');
});

router.post('/notas/new-note', async (req,res)=>{
    /*console.log(req.body);
    res.send('ok');*/
    console.log(req.body)
    const {title, description}= req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Porfavor escribe un titulo'});
    }
    if(!description){
        errors.push({text: 'Porfavor escribe una descripcion'});
    }
    if(errors.length>0){
        res.render('notas/new-note', {
            errors,
            title,
            description
        });
    }else{
       const newNote = new Nota({ title, description });
       await newNote.save();
       req.flash('success_msg','Nota Guardada Correctamente');
       console.log(newNote);
       res.redirect('/notas');
    }
    
});

router.get('/notas', async(req,res) => {

    const notas = await Nota.find().lean().sort({date:'desc'});
    res.render('notas/all-notes', { notas });
});

router.get('/notas/edit/:id', async(req,res) => {
    const reqParamId = req.params.id;
    const note = await Nota.findById(reqParamId).lean();
    res.render('notas/edit-note', {note});
});

router.put('/notas/edit-note/:id', async(req,res)=>{

    const {title,description} = req.body;
    await Nota.findByIdAndUpdate(req.params.id,{ title, description});
    req.flash('success_msg','Nota Actualizada Correctamente');

    res.redirect('/notas');
});

router.delete('/notas/delete/:id', async(req,res) => {
    const reqParamId = req.params.id;
    await Nota.findByIdAndDelete(reqParamId).lean();
    req.flash('success_msg','Nota Eliminada Correctamente');
    res.redirect('/notas');
    //console.log(req.params.id);
    //res.send('ok');
});

module.exports = router;