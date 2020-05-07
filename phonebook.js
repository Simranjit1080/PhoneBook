var express=require("express"); 
var bodyParser=require("body-parser"); 
var session = require('express-session');
var path = require('path')
var ejs = require('ejs')
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/PhoneBook',{useNewUrlParser:true},(err)=>{
    if(!err){console.log("mongo connected")}
    else{console.log("Error in DB connection: "+err)}
}); 
var db=mongoose.connection; 
db.collection('user').createIndex( { "email": 1 },{ unique: true })

var app=express() 
  
app.use(session({
    secret: 'abcd12345',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:36000000}
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
        "email":email,
        "name": name, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('user').insertOne(data,function(err){ 
        if (err) {
            return res.render('Login',{"msg":"User already present, Try Login"});
        } 
        else
        {
        console.log("Record inserted Successfully");
        return res.render('Login',{"msg":"User added, you can login now"});
        } 
              
    });  
}) 
var auth = (req,res,next)=>{
    if(req.session.isLogin){
        next();
    }else{
        res.redirect('/');
    }
}
app.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
        var query = {email: email, password: password}
        db.collection('user').findOne(query, function(err, user){
            if(err) throw new Error(err);
            if(!user) 
              {
                  console.log('Not found');
                  res.render('Login',{"msg":"Email address or password incorect"});
              }
            else 
              {
                console.log('Found!');
                req.session.isLogin = 'true';
                req.session.user=user.email;
                res.redirect('/home/'+email);
              }
        });
        
    });
    app.post('/add/:e', function(req, res){
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
        var e=req.params.e;
        db.collection(e).insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Record inserted Successfully in "+e); 
                  
        }); 
        res.redirect("/home/"+e);
    });
    app.post('/edit', function(req, res){
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
app.get('/home/:e',auth,(req,res)=>{
    var email=req.params.e;
    db.collection(email).find({}).toArray(function(err, result) {
        if (err) throw err;
        res.render('dU',{"data":result, "e":"adduser("+'"'+email+'"'+")", "u":email});
    });
    });
app.get('/',function(req,res){ 
return res.render('Login',{"msg":""}); 
}).listen(3000)