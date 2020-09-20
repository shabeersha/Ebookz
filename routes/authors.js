const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const db = require('../dbconfig/dbconnect')


//all authors route
router.get('/',(req,res) => {
    
    db.connect(function(err){
        if(err){
            console.log("DB connection error before find all author data");
            process.exit(1);
        }else{
        console.log("Db connected successfully, Ready to find all author data")
        db.get().collection('authors').find().toArray(function(err,data){
                 if(!err){
                    res.render('authors/index',{ authors: data})
                     console.log("all Authors data successfully grabed from database")
                 }
             })
            
        }
    })
    
})

//new author route
router.get('/new',async (req,res) => {
    res.render('authors/new')
})

//create new author route
router.post('/',(req,res) => {
    
    db.connect(function(err){
        if(err){
            console.log("DB connection error before pushing new author data");
            process.exit(1);
        }else{
        console.log("Db connected successfully, Ready to insert New author data")
        db.get().collection('authors').insertOne({
                 name:req.body.name
                 },function(err,data){
                
                 if(!err){
                     res.redirect('/authors')
                     console.log("New Author successfully inserted into database")
                 }
             })
            
        }
    })
})

module.exports = router