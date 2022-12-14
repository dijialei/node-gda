const express = require('express');
const app = express();
const User = require('./models/users');

const port = 3001;
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/gestiondb');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    next();
});

app.post('/verification', async(req,res)=>{
    
    let result= await User.find({email:req.body.email,password:req.body.password});
        res.send(result[0]); 
});






app.listen(port, '127.0.0.1', () => {
    console.log('Node listning port :' + port);
});