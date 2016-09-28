var fs = require('fs');
var jwt = require('jsonwebtoken');
var url = require("url");
var request = require("request");

var options = {
  key: fs.readFileSync('spaddin.key')
};

var siteUrl = "https://sp2013dev/sites/dev";
var sharepointhostname = url.parse(siteUrl).hostname;
var clientid = "92077b46-baeb-4915-8328-fdad1cda5214";
var realm = "3bf32a1f-9ea9-4adb-8727-aad194f89785" // equals to SharePoint Farm ID
var issuerid = '11111111-1111-1111-1111-111111111111' + "@" + realm;
var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = "qwY067w_B9iIdwkCMut0eag1JJA";

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
    console.log(error);
  }
});