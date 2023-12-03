const express = require('express')
const {MongoClient} = require('mongodb')
const path = require('path');

const uri = 'mongodb://localhost:27017/tutora';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const database = client.db('tutora');
const userCollection = database.collection('users');

const server = express();
server.use(express.json());
server.use(express.static(path.join(__dirname,'client','build')))



server.post('/register',async (req,res)=>{
    console.log("NEW USER REGISTERD");
    const insertResult = await userCollection.insertOne(req.body);
    res.send('SUCCESS');
});


server.post('/login',async (req,res)=>{
    let user = await userCollection.findOne({username:req.body.username});
    if(user){
        if(req.body.password == user.password){
            res.json({error:false,data:user});
        }else{
            res.json({error:true,data:'Incorrect Password'});
        }
    }else{
        res.json({error:true,data:'Username Not Found'});
    }
});

client.connect().then(()=>{
    server.listen(8080,()=>{
        console.log("✅ SERVER IS RUNNING");
    });
});


