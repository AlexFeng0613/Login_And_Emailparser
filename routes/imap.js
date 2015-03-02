/**
 * Created by alexfeng on 1/13/15.
 */
/**
 * Created by alexfeng on 1/8/15.
 */
var Imap = require('imap'),
    fs = require('fs'),
    inspect = require('util').inspect;

module.exports = function(address,password,host,port,startDate,endDate,callback) {
    var imap = new Imap({
        user:address,
        password:password,
        host:host,
        port:port,
        /*host: 'imap.gmail.com',
        port: 993,*/
        tls: true
    }), result = {};

    imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err) throw err;
            //imap.search([ 'SEEN', ['SINCE', '01/04/2015'],['BEFORE','01/05/2015']], function(err, results) {
            imap.search([['SINCE', startDate],['BEFORE',endDate]], function(err, results) {
/*
                var f = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM TO SUBJECT)','TEXT'], struct:'true' });*/
                var f = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM TO SUBJECT)'], struct:'true' });
                f.on('message', function(msg, seqno) {
                    //console.log('Message #%d', seqno);
                    var prefix = '(#' + seqno + ') ';
                    msg.on('body', function(stream, info) {
                        var buffer = '', count = 0, header = '';
                        stream.on('data', function(chunk) {
                            count += chunk.length;
                            buffer += chunk.toString('utf8');
                        });
                        stream.once('end', function() {
                            if (info.which !== 'TEXT') {
                                result[seqno] = result[seqno] || {};
                                result[seqno]['head'] = buffer;
                            }
                            else {
                                result[seqno] = result[seqno] || {};
                                result[seqno]['body'] = buffer;
                            }
                        });
                    });
                });
                f.once('error', function(err) {
                });
                f.once('end', function() {
                    console.log('Done fetching all messages!');
                    imap.end();
                });
            });
        });
    });


    imap.once('error', function(err) {
        //console.log(err);
        //fs.writeFileSync('result.txt', JSON.stringify(result));
        /*{
            [Error: Invalid credentials (Failure)] textCode: 'AUTHENTICATIONFAILED',
            source: 'authentication'
        }
        {
            [Error: read ECONNRESET] code: 'ECONNRESET',
            errno: 'ECONNRESET',
            syscall: 'read',
            source: 'socket'
        }*/

        if(err['source'] === 'authentication'){
            callback({connection:'AUTHENTICATIONFAILED'},result);
        } else {
            callback({connection:'BADLY ENDED'},result);
        }

    });

    imap.once('end', function() {
        //fs.writeFileSync('result.txt', JSON.stringify(result));
        callback({connection:'ENDED'},result);
    });

    function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
    }

    imap.connect();
 }


