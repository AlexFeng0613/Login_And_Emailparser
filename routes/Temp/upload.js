/**
 * Created by alexfeng on 1/22/15.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

router.get('/',function(req,res){
    res.render('upload');
});

router.post('/', function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(files);
        console.log(req.user.username);

        if(!fs.existsSync('public/uploaded/' + req.user.username)){
            fs.mkdirSync('public/uploaded/' + req.user.username);
        }

        fs.renameSync(files.file.path, 'public/uploaded/' + req.user.username + '/' + files.file.name);
    });
    res.send('SUCCESS!');

});

module.exports = router;