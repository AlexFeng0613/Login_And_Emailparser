/**
 * Created by alexfeng on 1/7/15.
 */
var fs = require('fs');

module.exports = function run(securityFile,encoding){
    var security = JSON.parse(fs.readFileSync(securityFile,encoding)).security;
    return security;
};