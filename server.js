if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const MongoClient = require('mongodb').MongoClient

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static("public"))

MongoClient.connect(process.env.DATABASE_URL,{useUnifiedTopology:true},function(err,client){
    if(err){
        console.log("Error found:"+err)
    }else{
        console.log("DB Connected Successfully....,");
    }
})

app.use('/',indexRouter)
app.use('/authors',authorRouter)



app.listen(process.env.PORT || 3000)