/**
 * Created by alexfeng on 1/13/15.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('searchPage', { title: 'Search mailbox by date and email account' });
});


module.exports = router;
