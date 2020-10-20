var fs = require('fs');
var jwt = require('jsonwebtoken');
var url = require("url");
var request = require("request");
var base64js = require("base64-js");
const { Buffer } = require('buffer');

/*
 * base64.js: An extremely simple implementation of base64 encoding / decoding using node.js Buffers
 *
 * (C) 2010, Nodejitsu Inc.
 * (C) 2011, Cull TV, Inc.
 *
 */

base64js.encode = function(unencoded) {
  return new Buffer(unencoded || '').toString('base64');
};
base64js.decode = function(encoded) {
  return new Buffer(encoded || '', 'base64').toString('utf8');
};

base64js.base64.urlEncode = function(unencoded) {
  var encoded = base64.encode(unencoded);
  return encoded.replace('+', '-').replace('/', '_').replace(/=+$/, '');
};

base64js.urlDecode = function(encoded) {
  encoded = encoded.replace('-', '+').replace('_', '/');
  while (encoded.length % 4)
    encoded += '=';
  return base64.decode(encoded);
};
var base64 = exports;

base64.encode = function(unencoded) {
  return new Buffer(unencoded || '').toString('base64');
};

base64.decode = function(encoded) {
  return new Buffer(encoded || '', 'base64').toString('utf8');
};

base64.urlEncode = function(unencoded) {
  var encoded = base64.encode(unencoded);
  return encoded.replace('+', '-').replace('/', '_').replace(/=+$/, '');
};

base64.urlDecode = function(encoded) {
  encoded = encoded.replace('-', '+').replace('_', '/');
  while (encoded.length % 4)
    encoded += '=';
  return base64.decode(encoded);
};
//SP-2013
// var siteUrl = 'https://spg4sc7skkehdns.eastus2.cloudapp.azure.com';
// var sharepointhostname = 'spg4sc7skkehdns.eastus2.cloudapp.azure.com';
// var clientid = '87d59c0e-6a2b-408b-9a6c-1f48392d303c';
// var realm = 'f094a07e-5375-4b96-a81c-f651a25f5788';
// var issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a'+ "@" + realm;  //9e9e46c4-6329-4990-a0b8-13b87b3ba56a
// var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
// var x5t =  '9Y78CA2y1PLHqfaEBNpPf8Y3leA'; //'F58EFC080DB2D4F2C7A9F68404DA4F7FC63795E0';  
// var keyFilePath = 'sp-real-addin.key';

//SP-2016
var siteUrl = 'https://docintsp2016.discovertechnologies.com';//'https://spwzb27rov2c3sm.eastus2.cloudapp.azure.com';
var sharepointhostname = 'docintsp2016.discovertechnologies.com';   //url.parse(siteUrl).hostname;
var clientid = 'b66f7e77-de3e-45d2-ba4c-b1b6405ec214';
var realm = 'ddd67120-9259-451c-ad8f-b8cc3b28fac3' // equals to SharePoint Farm ID
var issueridout = '57df0fe0-f569-4118-be1e-17cc8faa8c87' + "@" + realm;
var issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a' + "@" + realm;
var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = 'QOCIyWwlxy8bM40Og6yzuj9vYkU';  //shaThumbprint: 'QOCIyWwlxy8bM40Og6yzuj9vYkU'
var keyFilePath = 'C:\\cert\\HighTrustOAuth.key';

  /**
         *  Out Token JWT Json sapmle。
         {"typ":"JWT","alg":"none"}.
         {"aud":"00000003-0000-0ff1-ce00-000000000000/sharepoint@200a8e79-a98e-4b79-a6e3-c637c6482471",
         "iss":"4ebb8f86-b40c-4cc5-8255-4ebeea018dc5@200a8e79-a98e-4b79-a6e3-c637c6482471",
         "nbf":"1444889107",
         "exp":"1633881331",
         "nameid":"s-1-5-21-1030104071-1452137555-3129204420-500", //wmic useraccount get name,sid
         "nii":"urn:office:idp:activedirectory",
         "actortoken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkxSeEhSSXAtQktEN3hHNy1rdEttZ29OVDdFbyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc2hhcmVwb2ludEAyMDBhOGU3OS1hOThlLTRiNzktYTZlMy1jNjM3YzY0ODI0NzEiLCJpc3MiOiIxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTFAMjAwYThlNzktYTk4ZS00Yjc5LWE2ZTMtYzYzN2M2NDgyNDcxIiwibmJmIjoiMTQ0NDc4MDgwMCIsImV4cCI6IjE0NDQ4MjQwMDAiLCJuYW1laWQiOiI0ZWJiOGY4Ni1iNDBjLTRjYzUtODI1NS00ZWJlZWEwMThkYzVAMjAwYThlNzktYTk4ZS00Yjc5LWE2ZTMtYzYzN2M2NDgyNDcxIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJ0cnVlIn0.ug03mm3q6yinrqwT4MrwK-xRYTlND17NpzrNo4fjJNEVcsflcjmFMjFXAeaORCR-FNJrNnt5BMMRlTilwmOa9FnYqviA4GK-hKIkDFAs_GmmzidIBe72pX88dX375HO3bccLpVu_Q_9IcYD6j247PdRN0MgX2SJmrZ5BMoCEAcbwYqbGTyBgomSPs6rqgE5sTI5Pklk9p_gLKc-14PhkR9i-SAc9NwFSkBuun3GUxkMXOLkLN_pcN5wXlBvk6wumCC2VrAKXTevuSVp_qqGdSEWPKVxhbZtUYwNhq3WOCtZjroBsuUs4at4LpOTBjyH766ANg_DJWO2LGIXldpAGHA"}}
         * */
var options = {
  key: fs.readFileSync(keyFilePath) //Use SN code equiv.
};

var dateref = parseInt((new Date()).getTime() / 1000);

var rs256 = {
  typ: "JWT",
  alg: "RS256",
  x5t: x5t
}

var actortoken = {
  aud: audience,
  iss: issuerid,
  nameid: issueridout,
  nbf: (dateref - 21600).toString(), //Use SN date-time now
  exp: (dateref + 21600).toString(),  //"1633881331"
  trustedfordelegation: "true"
}
//get accessToken
var accessToken = jwt.sign(actortoken, options.key, { header: rs256 });
var outerHead = base64.urlEncode('{"typ":"JWT", "alg":"none"}');
//87d59c0e-6a2b-408b-9a6c-1f48392d303c@f094a07e-5375-4b96-a81c-f651a25f5788 nameid from inner token
//9e9e46c4-6329-4990-a0b8-13b87b3ba56a@f094a07e-5375-4b96-a81c-f651a25f5788 issuerid from inner token
var outerBodyPre = {
  
  "nameid": "s-1-5-21-1286024123-3030230169-4242449832-500",  //"S-1-5-21-2311490888-1445708243-199565805-500",   //spg4sc7skkehdns\\dtech
  "nii":"urn:office:idp:activedirectory",
  "actortoken": "",
  "nbf": (dateref - 21600).toString(), //Use SN date-time now
  "exp": (dateref + 21600).toString(),
  "iss": issueridout, //"9e9e46c4-6329-4990-a0b8-13b87b3ba56a@f094a07e-5375-4b96-a81c-f651a25f5788",
  "aud": audience,//"00000003-0000-0ff1-ce00-000000000000/spwzb27rov2c3sm.eastus2.cloudapp.azure.com@ddd67120-9259-451c-ad8f-b8cc3b28fac3",
};
outerBodyPre.aud = audience;
outerBodyPre.actortoken = accessToken;
//outerBodyPre = JSON.stringify(outerBodyPre);
console.log("outerBodyPre: " +  typeof(outerBodyPre));
console.log(JSON.stringify(outerBodyPre) + typeof(outerBodyPre));
var outerBody = outerBodyPre;
var outerToken = outerHead + '.' + outerBody + '.';
var outerTokenEnc = outerHead + '.' + base64.urlEncode(JSON.stringify(outerBody)) + '.';
console.log("outerTokenEnc:");
console.log(outerTokenEnc);

request.get({
  url: `${siteUrl}/_api/web/lists`,
  rejectUnauthorized: false,
  headers: {
    'Accept': 'application/json;odata=verbose',
    'Authorization': 'Bearer ' + outerToken  //accessToken
  }
}, function (error, response, body) {
  
  if (!error) {
    var listdata = JSON.parse(body);
    if (listdata.d && listdata.d.results) {

      for (var ri in listdata.d.results) {
        var list = listdata.d.results[ri];
        console.log(list.Title);
      }
    }
  } else {
    console.log("error");
  }
});