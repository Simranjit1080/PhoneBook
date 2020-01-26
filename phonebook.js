var express=require("express"); 
var bodyParser=require("body-parser"); 
var session = require('express-session');
var path = require('path')
var ejs = require('ejs')
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/PhoneBook',{useNewUrlParser:true},(err)=>{
    if(!err){console.log("moongo connected")}
    else{console.log("Error in DB connection: "+err)}
}); 
var db=mongoose.connection; 
  

var app=express() 
  
app.use(session({
    secret: 'abcd12345',
    resave: false,
    saveUninitialized: true
  }));
  app.set('views', path.join(__dirname, 'Views'));
  app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('user').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('index.html'); 
}) 
var auth = (req,res,next)=>{
    if(req.session.isLogin){
        next();
    }else{
        res.redirect('/');
    }
}
app.post('/login', function(req, res){
    email = req.body.email;
    password = req.body.password;
        var query = {email: email, password: password}
        db.collection('user').findOne(query, function(err, user){
            if(err) throw new Error(err);
            if(!user) 
              {
                  console.log('Not found');
                  res.redirect("/");
              }
            else 
              {
                console.log('Found!');
                req.session.isLogin = 'ture';
                req.session.user=user.email;
                res.redirect('/home');
              }
        });
        
    });
    app.post('/add', function(req, res){
        name =req.body.name;
        email = req.body.email;
        phone = req.body.phone;
        address = req.body.address;
        var data = { 
            "name": name, 
            "email":email, 
            "phone":phone, 
            "address":address 
        } 
        db.collection('data').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Record inserted Successfully"); 
                  
        }); 
        db.collection('data').find({}).toArray(function(err, result) {
            if (err) throw err;
            res.render('dU',{"data":result});
        });
    });
app.get('/home',auth,(req,res)=>{
    db.collection('data').find({}).toArray(function(err, result) {
        if (err) throw err;
        res.render('dU',{"data":result});
    });
    });
app.get('/',function(req,res){ 
return res.redirect('index.html'); 
}).listen(3000)