const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const MongoClient = require('mongodb').MongoClient

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static("public"))

MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology:true},function(err,client){
    if(err){
        console.log("Error found:"+err)
    }else{
        console.log("DB Connected Successfully....,");
    }
})

app.use('/',indexRouter)



app.listen(process.env.PORT || 3000)