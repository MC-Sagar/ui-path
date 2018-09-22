"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
var querystring = require("querystring");
var request = require("request");
const Http = require("http");


var bearer_token = '';
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


const postUrl='https://platform.uipath.com/api/account/authenticate';
//  Http.open("POST",postUrl,true);
//  Http.setRequestHeader('Content-Type', 'application/json');
//  Http.send({
//    "tenancyName" : "KartikKulks",
//    "usernameOrEmailAddress" : "kartik.koolks@gmail.com",
//    "password" : "Passw0rd"
// });

//add querystring.stringify({})
var post_data = {
  "tenancyName" : "KartikKulks",
  "usernameOrEmailAddress" : "kartik.koolks@gmail.com",
  "password" : "Passw0rd"
};


request.post({
headers:{'Content-Type':'application/json'},
  url:postUrl,
form:post_data
},
function(error,response,body){
  bearer_token = response.result;
  if (!error && response.statusCode==200){

    console.log(body);
  }
});

const post_jobs='https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs';

job_data = {"startInfo": {
    "ReleaseKey": "dd0518b0-135b-46a3-8787-c796431f9b8e"
  }};

request.post({
  headers:{'Content-Type':'application/json','Authorization':'Bearer '+bearer_token},
  url: post_jobs,
  form: job_data
});
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
