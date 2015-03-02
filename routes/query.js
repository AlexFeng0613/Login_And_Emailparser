/**
 * Created by alexfeng on 1/13/15.
 */
var express = require('express');
var router = express.Router();
var imap = require('./imap');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
    res.redirect('/search');
});

router.post('/', function(req, res) {
    if(!req.user)  res.redirect('/');
    var address = req.param('address');
    var password = req.param('password');
    var host = req.param('host');
    var port = req.param('port');
    var startDate = req.param('sdate');
    var endDate = req.param('edate');
    console.log(req.body.address);

    imap(address,password,host,port,startDate,endDate,function(connectionStatus,fetches){
        console.log(connectionStatus);
        var headers = [];
        for(var item in fetches){

            var headerString = fetches[item].head;
            var header = {};

            var splits = headerString.split(/(From:\s|To:\s|Subject:\s)/);
            for(var i = 1, len = splits.length; i <len; i++){
                if(splits[i] === 'From: '){
                    header.from = splits[i + 1].replace(/[\r\n]/g,'').replace('=20',' ');
                }
                if(splits[i] === 'To: '){
                    header.to = splits[i + 1].replace(/[\r\n]/g,'');
                }
                if(splits[i] === 'Subject: '){
                    header.subject = splits[i + 1].replace(/[\r\n]/g,'').replace('=20',' ');
                }
                /*header[splits[i]] = splits[i + 1];*/
                i+=1;
            }
            headers.push(header);
        }
        /*fetches.forEach(function(headerString){
            console.log('************************************');
            var splits = headerString.split(/(From:\s|To:\s|Subject:\s)/);
            for(var i = 1, len = splits.length; i <len; i++){
                console.log(splits[i]);
            }
        });
        console.log(headers);*/

        res.render('initiate',{connectionStatus:connectionStatus,results:headers});
    });

});

module.exports = router;