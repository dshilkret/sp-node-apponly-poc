var fs = require('fs');
var jwt = require('jsonwebtoken');
var url = require("url");
var request = require("request");

var siteUrl = "https://sp2013dev/sites/dev";
var sharepointhostname = url.parse(siteUrl).hostname;
var clientid = "ded561d0-05dc-48b8-8c64-9b161392b9e8";
var realm = "3bf32a1f-9ea9-4adb-8727-aad194f89785" // equals to SharePoint Farm ID
var issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a' + "@" + realm;
var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = "v4HGgYynTnuL8gZk368JlFw9FeE";
var keyFilePath = "spaddin.key";

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
    console.log("error");
  }
});