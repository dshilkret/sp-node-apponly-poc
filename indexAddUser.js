var http = require('http');
var jws = require('jws')
var fs = require('fs');
 
var options = {
    key: fs.readFileSync('HighTrustOAuth2.key'),
    cert: fs.readFileSync('HighTrustOAuth.pem'),
    //key: fs.readFileSync('server.key'),
    //cert: fs.readFileSync('server.crt')
};
 
function base64urlEscape(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function base64urlEncode(str) {
  return new Buffer.byteLength(str).toString('base64');
}

var siteUrl = 'https://spwzb27rov2c3sm.eastus2.cloudapp.azure.com';
var sharepointhostname = "spwzb27rov2c3sm.eastus2.cloudapp.azure.com"; //url.parse(siteUrl).hostname;
var clientid = 'b66f7e77-de3e-45d2-ba4c-b1b6405ec214';
var realm = 'ddd67120-9259-451c-ad8f-b8cc3b28fac3' // equals to SharePoint Farm ID
var issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a'+ "@" + realm;
var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = 'QOCIyWwlxy8bM40Og6yzuj9vYkU';  //shaThumbprint: 'QOCIyWwlxy8bM40Og6yzuj9vYkU'
var keyFilePath = 'HighTrustOAuth2.key';



// var sharepointhostname = process.argv[2]
// var clientid = "927e7578-6a96-4120-be36-495a5bbb989b"
// var realm = "5df7ebc5-9401-43fe-93e2-86a07f62c2b2" // equals to SharePoint Farm ID
// var issuerid = '2a80398d-800e-44b1-ac67-e34b1207114f' + "@" + realm
// var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm
// var x5t = "+NgPPAV6+Nm+sqGz/WHYxq1Mp8E" // ohne "=" am Ende
var nameid = 'S-1-5-21-3742593036-348766599-3532525165-503';
var nii = "urn:office:idp:activedirectory"
 
var dateref = parseInt((new Date()).getTime() / 1000)
var rs256 = '{"typ":"JWT","alg":"RS256","x5t":"' + x5t + '"}'
 
var actortoken = {
    aud: audience,
    iss: issuerid,
    nameid : clientid + '@' + realm,
    nbf:    (dateref - 21600).toString(),
    exp:    (dateref + 21600).toString(),
    trustedfordelegation: true
  }
console.log("actortoken: " + JSON.stringify(actortoken)); 
var payload = {
  aud: audience,
  iss: clientid + '@' + realm,
  nbf: (dateref - 21600).toString(),
  exp: (dateref + 21600).toString(),
  nameid: nameid,
  nii: nii,
  actortoken: jws.sign(
    {
        header: JSON.parse(rs256),
        payload: JSON.stringify(actortoken),
        privateKey : options.key
    })
}
var outerHead = {"typ":"JWT", "alg":"none"};
var authtoken = base64urlEncode(JSON.stringify(outerHead)) + '.' + base64urlEncode(JSON.stringify(payload)) + '.';
authtoken = authtoken.replace(/=/g, '') // my SharePoint does not accept base64 padding
console.log("outerHead: " + typeof(outerHead) + " " + JSON.stringify(outerHead));
console.log("payload: " + typeof(payload) + " " + JSON.stringify(payload));
var headers = {
  'Accept'        : 'application/json;odata=verbose',
  'Authorization' : 'Bearer ' + authtoken
};
options = {
  host          : sharepointhostname,
  port          : 443,
  path          : "/" + '_api/web/lists',
  method        : 'GET',
  headers       : headers,
  agent         : false,
  ciphers       : 'RC4',
  secureOptions : require ('constants').SSL_OP_NO_TLSv1_2
};
var listreq = http.get(options, function(listres) {
  listres.setEncoding('utf8');
  var listdata = "";
  listres.on('data', function(data) {
    listdata += data;
  });
  listres.on('end', function() {
   console.log("Response headers");
    console.log(JSON.stringify(listres.headers));
    console.log("Request headers");
    console.log(JSON.stringify(headers));
    console.log("Req fin\n\n");
    console.log(listdata);
    listdata = JSON.parse(listdata);
    //var lists = [];
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
