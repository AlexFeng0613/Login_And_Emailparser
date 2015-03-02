/**
 * Created by alexfeng on 1/13/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    user:String,
    password:String,
    type: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users',User);