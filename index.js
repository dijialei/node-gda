const express = require('express');
const cors=require('cors');
const app = express();
const User = require('./models/users');
const Absence = require('./models/absences');
const port = 3001;
const mongoose = require('mongoose');
const JourFerie = require('./models/jourferie');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/gestiondb');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(cors());
app.all('*', function (req,res){
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', "GET, PUT, DELETE, POST");
    req.next();
}); */




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    next();
});

//增删改操作加await会出错，不加有时会读取不准确
app.post('/updateUser', async(req,res)=>{
    let result= await User.findByIdAndUpdate(req.body._id, req.body);
    res.send(result);
});

app.post('/verification', async (req, res) => {
    //console.log(req.body);
    let result = await User.find({ email: req.body.email, password: req.body.password });
    //console.log(result);
    res.send(result[0]);
    
});
app.post('/absence', async(req,res)=>{
    let result = await Absence.find(req.body).exec();
    res.json(result);
});

app.post('/createAbsence', async (req, res) => {
   let result = await Absence.create(req.body);
   res.send(result);   
});
app.post('/check', async(req,res)=>{
    let result = await JourFerie.find(req.body);
    
    res.send(result[0]);
});
app.post('/deleteAbsence', async(req,res)=> {    
    let result= await Absence.findByIdAndDelete(req.body._id);
    res.send(result);    
    /* let result = await Absence.find({userId:req.body.userId}).exec();
    res.json(result); */    
});
app.post('/updateAbsence',async(req,res)=>{
    let result = await Absence.findByIdAndUpdate(req.body._id,req.body);
    res.send(result);
});







app.get('/jourferie', async (req, res) => {
    let result = await JourFerie.find({});
    res.json(result);
});
app.post('/addjourferie', async (req, res) => {
    JourFerie.create(req.body, (error, jourferie) => { console.log(error, jourferie) });
    let result = await JourFerie.find({});
    res.json(result);
});
app.post('/deletejourferie', async (req, res) => {    
    JourFerie.findByIdAndDelete(req.body._id, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Object:", docs);
        }

    });
    let result = await JourFerie.find({});
    res.json(result);
    
});
app.post('/updatejourferie',async(req,res)=>{
     JourFerie.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log("Updated Object:", docs);
        }
    });
    let result = await JourFerie.find({});
    res.json(result);
});
 












app.listen(port, '127.0.0.1', () => {
    console.log('Node listning port :' + port);
});