var fs = require('fs');
var jwt = require('jsonwebtoken');
var url = require("url");
var request = require("request");


//SP 2016
// var siteUrl = 'https://spwzb27rov2c3sm.eastus2.cloudapp.azure.com';
// var sharepointhostname = url.parse(siteUrl).hostname;
// var clientid = 'b66f7e77-de3e-45d2-ba4c-b1b6405ec214';
// var realm = 'ddd67120-9259-451c-ad8f-b8cc3b28fac3' // equals to SharePoint Farm ID
// var issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a'+ "@" + realm;
// var audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
// var x5t = 'QOCIyWwlxy8bM40Og6yzuj9vYkU';  //shaThumbprint: 'QOCIyWwlxy8bM40Og6yzuj9vYkU'
// var keyFilePath = 'HighTrustOAuth.key';

//SP 2013
var siteUrl = 'https://spg4sc7skkehdns.eastus2.cloudapp.azure.com';
var sharepointhostname = 'spg4sc7skkehdns.eastus2.cloudapp.azure.com';
var clientid = '87d59c0e-6a2b-408b-9a6c-1f48392d303c';
var realm = 'f094a07e-5375-4b96-a81c-f651a25f5788';
issuerid = '9e9e46c4-6329-4990-a0b8-13b87b3ba56a'+ "@" + realm;  //9e9e46c4-6329-4990-a0b8-13b87b3ba56a
audience = '00000003-0000-0ff1-ce00-000000000000/' + sharepointhostname + '@' + realm;
var x5t = '9Y78CA2y1PLHqfaEBNpPf8Y3leA';
var keyFilePath = 'C:\\DocIntegrator\\documentation\\spaddin_real.key';


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
  nameid: clientid + '@' + realm,
  nbf: (dateref - 21600).toString(), //Use SN date-time now
  exp: (dateref + 21600).toString(),
  trustedfordelegation: true
}
var h = typeof(rs256);
var p = typeof(actortoken);
//get accessToken
//accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlFPQ0l5V3dseHk4Yk00ME9nNnl6dWo5dllrVSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3B3emIyN3JvdjJjM3NtLmVhc3R1czIuY2xvdWRhcHAuYXp1cmUuY29tQGRkZDY3MTIwLTkyNTktNDUxYy1hZDhmLWI4Y2MzYjI4ZmFjMyIsImlzcyI6IjllOWU0NmM0LTYzMjktNDk5MC1hMGI4LTEzYjg3YjNiYTU2YUBkZGQ2NzEyMC05MjU5LTQ1MWMtYWQ4Zi1iOGNjM2IyOGZhYzMiLCJuYW1laWQiOiJiNjZmN2U3Ny1kZTNlLTQ1ZDItYmE0Yy1iMWI2NDA1ZWMyMTRAZGRkNjcxMjAtOTI1OS00NTFjLWFkOGYtYjhjYzNiMjhmYWMzIiwibmJmIjoiMTYwMDc4NDA3OCIsImV4cCI6IjE2MDA4MjcyNzgiLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6dHJ1ZSwiaWF0IjoxNjAwODA1NjgyfQ.NzViMzE4OTBjOWRkZjBlZjBhMmRiOTMyYzA5M2ZiNzI3ODRkNTBkMDY2Yjk1ZDE4MDVlMGRhZDk3ODhhMTVjMwo=';
var accessToken = jwt.sign(actortoken, options.key, { header: rs256 });
//var accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlFPQ0l5V3dseHk4Yk00ME9nNnl6dWo5dllrVSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3B3emIyN3JvdjJjM3NtLmVhc3R1czIuY2xvdWRhcHAuYXp1cmUuY29tQGRkZDY3MTIwLTkyNTktNDUxYy1hZDhmLWI4Y2MzYjI4ZmFjMyIsImlzcyI6IjllOWU0NmM0LTYzMjktNDk5MC1hMGI4LTEzYjg3YjNiYTU2YUBkZGQ2NzEyMC05MjU5LTQ1MWMtYWQ4Zi1iOGNjM2IyOGZhYzMiLCJuYW1laWQiOiJiNjZmN2U3Ny1kZTNlLTQ1ZDItYmE0Yy1iMWI2NDA1ZWMyMTRAZGRkNjcxMjAtOTI1OS00NTFjLWFkOGYtYjhjYzNiMjhmYWMzIiwibmJmIjoiMTYwMDU4ODY4MiIsImV4cCI6IjE2MTExMDA4MDAiLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6dHJ1ZSwiaWF0IjoxNjAwNjEwMjkwfQ.xuuG1j-55qSWvD3yzpbI7hfwh890xrm5cLEs1Q5D6GvxSufsSsXnF_l0PQkMlervnd53okIW-AhNiX07XPDBTyDGCa_GI9ZQcXo-LsL9Wc2j4dE3jv_3Y6JJ6CqzDeB9F5E7Koo28ZoCY9qYcJhmv3CawCSYN8lydx1uObSQTOS2vXrjM2eowBBoE2rJV5YgZnAtINZGZdX8ce1-JUNFbToucc64Vz9DGrDgyM9-KEYeioLmQ8TKk4V8jqzD4UM8fdNY2GERgS5UNkMEFDNkb9tcl2FmDT3Z8Ru9-ntc-8PY9Z9a8ScCsqoOO8G62fJiH-_l6hn6fCG2yPhSXgzqQA';
//var accessToken =   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjlZNzhDQTJ5MVBMSHFmYUVCTnBQZjhZM2xlQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3BnNHNjN3Nra2VoZG5zLmVhc3R1czIuY2xvdWRhcHAuYXp1cmUuY29tQGYwOTRhMDdlLTUzNzUtNGI5Ni1hODFjLWY2NTFhMjVmNTc4OCIsImlzcyI6IjllOWU0NmM0LTYzMjktNDk5MC1hMGI4LTEzYjg3YjNiYTU2YUBmMDk0YTA3ZS01Mzc1LTRiOTYtYTgxYy1mNjUxYTI1ZjU3ODhAZjA5NGEwN2UtNTM3NS00Yjk2LWE4MWMtZjY1MWEyNWY1Nzg4IiwibmFtZWlkIjoiODdkNTljMGUtNmEyYi00MDhiLTlhNmMtMWY0ODM5MmQzMDNjQGYwOTRhMDdlLTUzNzUtNGI5Ni1hODFjLWY2NTFhMjVmNTc4OCIsIm5iZiI6IjE2MDE2NTU0MjMiLCJleHAiOiIxNjExMTk0NTIyIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOnRydWV9.aWea7xlFf4JPVmsaPVgJFzomMo_tWtEVKjL9q1skewJ97Q3uXPb_R5dyvHLD8q0iC8FbDsNQ7WjKecsqK1Eis_whBFnn1GGmfRciB1xjhEc_yBAmuhHOvh3SQoni0osqxZk1T5L6GYDCm7dQ7i7bvauajk7KoHRrsdDED4YJQpumgE9YSwqGUITHW3eZPno9lwtShVC8vJKgME_EEkBt0hi1n1v8kiGT4Ez9PJRAX5cGNE4d-YlDfIO294FKCtVM1NYSH39SP2rvw68GswllR9RT2qKFx1IgNHYBoQd-uyXQskd9LI843GYVyKyVH1X7UmHDrTeB5WYSA7HO_aFeZw';
//var accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IjlZNzhDQTJ5MVBMSHFmYUVCTnBQZjhZM2xlQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3BnNHNjN3Nra2VoZG5zLmVhc3R1czIuY2xvdWRhcHAuYXp1cmUuY29tQGYwOTRhMDdlLTUzNzUtNGI5Ni1hODFjLWY2NTFhMjVmNTc4OCIsImlzcyI6IjllOWU0NmM0LTYzMjktNDk5MC1hMGI4LTEzYjg3YjNiYTU2YUBmMDk0YTA3ZS01Mzc1LTRiOTYtYTgxYy1mNjUxYTI1ZjU3ODgiLCJuYW1laWQiOiI4N2Q1OWMwZS02YTJiLTQwOGItOWE2Yy0xZjQ4MzkyZDMwM2NAZjA5NGEwN2UtNTM3NS00Yjk2LWE4MWMtZjY1MWEyNWY1Nzg4IiwibmJmIjoiMTYwMTY1NTc3MyIsImV4cCI6IjE2MDE2OTg5NzMiLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6dHJ1ZSwiaWF0IjoxNjAxNjc3Mzc1fQ.QtOI4UDtfylhMb9y9R96fE504le_PisBdMvoFDj1JpwmJ13BEh4nZ9ZL5FkdVdXVXbDNLiynG2crrd_lJ256zKGH2rbzMlQJkgXc0LDJmDohRv_7hyo7SYZRk51CMCu-mB3OuDuT00AxhBHxQwFPeokPFLTihh_bACEFkV4yzHfAiVF_85sGQQEurlhTwF8JTk5D_97jiz5op9NNTt9iMWOrQ4BTQ5KYJxnFHArPbT6xv6vda82-tRfkk0Tz7oN0m84Id5vXSg6psMLmJON0NR_H5He3u2fIs9GTrB_5BViDdl_W7LNg_Gdgkn7fQRPpFG3mVuAFlGDoiYYsBC8QYg'

//Generated from DocInt
//var accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IjlZNzhDQTJ5MVBMSHFmYUVCTnBQZjhZM2xlQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3BnNHNjN3Nra2VoZG5zLmVhc3R1czIuY2xvdWRhcHAuYXp1cmUuY29tQGYwOTRhMDdlLTUzNzUtNGI5Ni1hODFjLWY2NTFhMjVmNTc4OCIsImlzcyI6IjllOWU0NmM0LTYzMjktNDk5MC1hMGI4LTEzYjg3YjNiYTU2YUBmMDk0YTA3ZS01Mzc1LTRiOTYtYTgxYy1mNjUxYTI1ZjU3ODgiLCJuYW1laWQiOiI4N2Q1OWMwZS02YTJiLTQwOGItOWE2Yy0xZjQ4MzkyZDMwM2NAZjA5NGEwN2UtNTM3NS00Yjk2LWE4MWMtZjY1MWEyNWY1Nzg4IiwibmJmIjoiMTYwMTY1NjQyMiIsImV4cCI6IjE2MTExOTQ1MjIiLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6dHJ1ZX0.imGyk3d_DsdHnMuwOv_RrvL_M16KjJ2boZAlAA2LZsa4dJmgx9qZyzKaBSXgygzwQ5cUMjeU6NNHqG6A1s_ewhSDuFTyWqgs0STFLK78xiRCSKlx7tegtYEXLMqmjFKwGPeQukWi_IhAjL0O0OA3d48nSTP_-zrHpUZlIsOgMmBbRiktvCnGK1p5gGZhLahjC_D1aOzTT14eaFx3_u1-VKn7-_Y3ugxLMdQBLv3YQJFMiPirhPJ90qrKU6-wiHEAP13Ip15_SJpC-r6HFjX3CQ-mjNiLcU82oraowiWgFZIm63M7qZwqt3JUzpjgsvDdzjymVFSxazUDZ9eI5DyAyQ'

//var accessToken =   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlFPQ0l5V3dseHk4Yk00ME9nNnl6dWo5dllrVSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3B3emIyN3JvdjJjM3NtLmVhc3R1czIuY2xvdWRhcHAuYXp1cmUuY29tQGRkZDY3MTIwLTkyNTktNDUxYy1hZDhmLWI4Y2MzYjI4ZmFjMyIsImlzc3VlcmlkIjoiOWU5ZTQ2YzQtNjMyOS00OTkwLWEwYjgtMTNiODdiM2JhNTZhQGRkZDY3MTIwLTkyNTktNDUxYy1hZDhmLWI4Y2MzYjI4ZmFjMyIsIm5hbWVpZCI6ImI2NmY3ZTc3LWRlM2UtNDVkMi1iYTRjLWIxYjY0MDVlYzIxNEBkZGQ2NzEyMC05MjU5LTQ1MWMtYWQ4Zi1iOGNjM2IyOGZhYzMiLCJuYmYiOiIxNjAxODQ5NjA2IiwiZXhwIjoiMTYxMTE5NDUyMiIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjp0cnVlfQ.UKKRh1KF-6yN-scwKBzbfReMfIYGn3i7DHI-84fHZ7M5saiOiwiioWKVPtv1RSSG_8f997b-3YAZlnuuj0ZUZB5IDAtEpC5mjjD2LfL0PD8-umlZfQY7BtGbHU3JfCLi6atAzx5yFj4IFUVz1CXcL3D_QD52u7tYUW_Ts9heeL8uIRDdK7Yah31ZIPp1HA5nnn10wBXzkGaAgnuRDc_9Oh6Q_NoGqqColkv-Hj7_Zyc8VAo5y99jdBJ4hEXILwI4BG6Xk3mMny3Mm8FrysUbQlOUEH52v4_SM8f-0eiJKI9BAqaWlvLOsgH2EqW_S-rVILYYNft3icN7qdxJ1c-w5A';
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