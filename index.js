var http = require('https');
var fs = require('fs');
var jwt = require('jsonwebtoken');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var options = {
  key: fs.readFileSync('spaddin.key')
};
 
function base64urlEscape(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function base64urlEncode(str) {
  return new Buffer(str).toString('base64');
}
 
var sharepointhostname = "sp2013dev";
var clientid = "92077b46-baeb-4915-8328-fdad1cda5214";
var realm = "3bf32a1f-9ea9-4adb-8727-aad194f89785" // equals to SharePoint Farm ID
var issuerid = '11111111-1111-1111-1111-111111111111' + "@" + realm;
var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = "qwY067w_B9iIdwkCMut0eag1JJA"; // ohne "=" am Ende
 
var dateref = parseInt((new Date()).getTime() / 1000);

var rs256 = {
  typ: "JWT",
  alg: "RS256",
  x5t: x5t
}

var actortoken = {
    aud: audience,
    iss: issuerid,
    nameid : clientid + '@' + realm,
    nbf:    (dateref - 21600).toString(),
    exp:    (dateref + 21600).toString(),
    trustedfordelegation: true
  }

var accessToken = jwt.sign(actortoken, options.key, {header: rs256});

var headers = {
  'Accept'        : 'application/json;odata=verbose',
  'Authorization' : 'Bearer ' + accessToken
};
var options = {
  host          : sharepointhostname,
  port          : 443,
  path          : "/sites/dev/" + '_api/web/lists',
  method        : 'GET',
  headers       : headers,
  agent         : false,
  ciphers       : 'RC4',
  secureOptions : require ('constants').SSL_OP_NO_TLSv1_2
};
var listreq = http.get(options, function(listres) {
  listres.setEncoding('utf8');
  var listdata = "";
  listres.on('data', function(data) {
    listdata += data;
  });
  listres.on('end', function() {
    listdata = JSON.parse(listdata);
    var lists = [];
    if (listdata.d && listdata.d.results) {
      for (var ri in listdata.d.results) {
        var list = listdata.d.results[ri];
        console.log(list.Title);
      }
    }
  });
}).on('error', function(e) {
  console.log("Error " + e.message);
  console.log(JSON.stringify(e));
});
