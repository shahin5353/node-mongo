const express = require('express')
const app =  express()
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(bodyParser.json())
app.get ('/users',(req,res)=>{
    // client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("store").collection("user");
        collection.find().sort({$natural:-1}).limit(5).toArray((err,documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents);
            } 
        })
        // client.close();
      });
});
app.post('/addUser',(req,res)=>{
    // client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = req.body
    client.connect(err => {
        const collection = client.db("store").collection("user");
        collection.insertOne(user,(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err}) 
            }
            else{
                res.send(result.ops[0]);
            } 
        })
        // client.close();
      });
   
    
    
})
app.listen(process.env.PORT,()=>console.log("Listening from port",process.env.PORT))

