/**
 * Created by alexfeng on 2/2/15.
 */
var passport = require('passport');
var User = require('../models/users');

module.exports = function(app){
    app.get('/', function (req, res) {
        var obj = {};
        obj.user = req.user?req.user.username:'DEFAULT';

        if(req.user){
            obj.user = req.user.username;
        }

        res.render('main', obj);
    });

    app.get('/validate',function(req,res){
        res.status(200).send(req.user?req.user.username:'');
    });

    app.get('/login',function(req,res){
        /*console.log('session: ' + JSON.stringify(req.session));
        console.log('sessionID: ' + req.sessionID);*/
        res.status(200).send('LOGIN GET SUCCESS!');
    });

    app.get('/logout',function(req,res){
        req.user = undefined;
        req.session.passport = {};
        //res.status(200).send('LOG OUT!');
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local'), function(req,res){
        res.status(200).send({status:'LOGIN POST SUCCESS!', currentUser:req.user.username});
    });

    app.post('/register', function(req, res) {
        console.log(req.body);
        User.register(new User({username: req.body.username}), req.body.password, function (err, account) {
            if (err) {
                console.log(err);
                res.status(500).send({error:'mongodb error'});
            }

            User.update({username:req.body.username},{type:req.body.type},{multi:true}, function(err, numberAffected){

            });

            passport.authenticate('local')(req, res, function () {
                res.status(200).send('REGISTER SUCCESS!');
            });
        });
    });
}