var express = require('express');
var router = express.Router();


router.get('/uploadTo',function(req,res){
  console.log(fs.existsSync('../public'));
  res.status(200);
});
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');//connection & createconnection: latter one does not work
var userSchema = new mongoose.Schema({
  user:String,
  password:String
});
var User = mongoose.model('users',userSchema);//schema required, different from previous project*//*

var dafeng = new User({
  user: 'dafeng6',
  password: 'test6'
});
dafeng.save(function (err, results) {
  console.log(results);
});*/

/* GET home page. */
/*router.get('/', function(req, res) {
  //res.render('index', { title: 'Hello World!' });
  res.redirect('/main');
});*/

/*router.get('/main',function(req,res){
  res.render('main');
});*/

/*router.post('/login',function(req,res){
  console.log(req.body);
  res.status(200).send('SUCCESSFUL LOGGED IN!')
});*/

router.post('/register',function(req,res){
  console.log('REGISTER');
  res.status(200).send('SUCCESSFUL REGISTERED!')
});


module.exports = router;