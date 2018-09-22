"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
var querystring = require("querystring");
const Http = require("http");

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/errors", function(req, res) {

// const postUrl='https://platform.uipath.com/api/account/authenticate';

var token ='';
const postUrl='https://platform.uipath.com/api/account/authenticate';
//  Http.open("POST",postUrl,true);
//  Http.setRequestHeader('Content-Type', 'application/json');
//  Http.send({
//    "tenancyName" : "KartikKulks",
//    "usernameOrEmailAddress" : "kartik.koolks@gmail.com",
//    "password" : "Passw0rd"
// });

//add querystring.stringify({})
var post_data = querystring.stringify({
  "tenancyName" : "KartikKulks",
  "usernameOrEmailAddress" : "kartik.koolks@gmail.com",
  "password" : "Passw0rd"
});
var post_options = {
  host: postUrl,
  method: 'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded',
  'Content-Length': Buffer.byteLength(post_data)}
};

var post_req = http.request(post_options,function(res){
  res.setEncoding('utf8');
  res.on('data',function(chunk){
    console.log('Response' + chunk);
  });
});

post_req.write(post_data);
console.log(post_data);

//
// request(post_options,function(error,presp, pbody){
//   res.status(200).send(pbody);
// });
//
//
// Http.onreadystatechange = function() {
//     if (Http.readyState == XMLHttpRequest.DONE) {
//         token = Http.responseText;
//     }
// }
// console.log(token)
// restService.post(postUrl,function(reqq,ress){
//   var tenancyName = "KartikKulks";
//   var usernameOrEmailAddress = "kartik.koolks@gmail.com";
//   var password = "Passw0rd";
//   ress.send(tenancyName+' ' + usernameOrEmailAddress+' ' +password);
// });

//Bearer token which gets expired after 30 mins


//
// Http.setRequestHeader('Authorization','Bearer ' + token);
// Http.open("POST",post_jobs,true);
// Http.setRequestHeader('Content-Type', 'application/json');
// Http.send(JSON.stringify({
//  "startInfo": {
//    "ReleaseKey": "dd0518b0-135b-46a3-8787-c796431f9b8e"
//  }
// }));


  return res.json({
    speech: " error fallback done",
    displayText: "test for fallback error done",
    source: "webhook-echo-sample"
  });

  //till here
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
