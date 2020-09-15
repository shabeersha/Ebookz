if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
let MongoClient=require('mongodb').MongoClient;


let state={
    db:null,
};

module.exports.connect=function(done){

    const url=process.env.DATABASE_URL;
    const dbName='ebookz';
    const client=new MongoClient(url,{useUnifiedTopology: true});

    client.connect(function (err) {
        if(err) return done(err);

        console.log("connected successfully to Database");

        const dbs=client.db(dbName);
        state.db=dbs;
        done();
        

    });

};
module.exports.get=function () {
    return state.db;

};