/**
 * Created by alexfeng on 2/2/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var postsSchema = new Schema({
    title:String,
    content:String,
    author:String
});

postsSchema.plugin(passportLocalMongoose);

module.export = mongoose.model('posts',postsSchema);