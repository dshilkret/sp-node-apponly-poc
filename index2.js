var fs = require('fs');
var jwt = require('jsonwebtoken');
var url = require("url");
var request = require("request");


//shaThumbprint: 'QOCIyWwlxy8bM40Og6yzuj9vYkU'

var siteUrl = 'https://spwzb27rov2c3sm.eastus2.cloudapp.azure.com';
var sharepointhostname = url.parse(siteUrl).hostname;
var clientid = 'b66f7e77-de3e-45d2-ba4c-b1b6405ec214';
var realm = 'ddd67120-9259-451c-ad8f-b8cc3b28fac3' // equals to SharePoint Farm ID
var issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a'+ "@" + realm;
var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = 'QOCIyWwlxy8bM40Og6yzuj9vYkU';
var keyFilePath = 'C:\\DocIntegrator\\DIA\\SP OAuth-2016\\OAuth\\HighTrustOAuth.key';

/*
var siteUrl = 'https://spg4sc7skkehdns.eastus2.cloudapp.azure.com';
var sharepointhostname = 'spg4sc7skkehdns.eastus2.cloudapp.azure.com';
var clientid = '87d59c0e-6a2b-408b-9a6c-1f48392d303c';
var realm = 'f094a07e-5375-4b96-a81c-f651a25f5788';
issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a'+ "@" + realm;  //9e9e46c4-6329-4990-a0b8-13b87b3ba56a
audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = '9Y78CA2y1PLHqfaEBNpPf8Y3leA';
var keyFilePath = 'C:\\DocIntegrator\\documentation\\spaddin_real.key';
*/
var options = {
  key: fs.readFileSync(keyFilePath)
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
  nameid: clientid + '@' + realm,
  nbf: (dateref - 21600).toString(),
  exp: (dateref + 21600).toString(),
  trustedfordelegation: true
}

var accessToken = jwt.sign(actortoken, options.key, { header: rs256 });

request.get({
  url: `${siteUrl}/_api/web/lists`,
  rejectUnauthorized: false,
  headers: {
    'Accept': 'application/json;odata=verbose',
    'Authorization': 'Bearer ' + accessToken
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
    //console.log("error");
  }
});