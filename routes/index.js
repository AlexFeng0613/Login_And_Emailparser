/**
 * Created by alexfeng on 2/26/15.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

router.all('*',function(req,res,next){
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/uploadTo',function(req,res){
    if(!fs.existsSync('public/uploaded/' + req.user.username)){
        fs.mkdirSync('public/uploaded/' + req.user.username);
    }

    //console.log(fs.existsSync('public/uploaded/' + req.user.username));

    res.status(200).send(fs.existsSync('public/uploaded/' + req.user.username));
});

router.post('/uploadTo',function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(files);
        //console.log(req.user.username);

        if(!fs.existsSync('public/uploaded/' + req.user.username)){
            fs.mkdirSync('public/uploaded/' + req.user.username);
        }

        fs.renameSync(files.file.path, 'public/uploaded/' + req.user.username + '/' + files.file.name);
    });
    res.send('SUCCESS!');
});

module.exports = router;