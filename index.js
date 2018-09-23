"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
var querystring = require("querystring");
var request = require("request");
const Http = require("http");
var http = require('https');
var unirest = require('unirest');


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

restService.get("/errors", function(req, res) {


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

//from here to do
//
//
// request({
// method:'POST',
// headers:{'Content-Type':'application/json'},
//   url:postUrl,
// form:post_data
// },
//  function(error,response,body){
//
//   if (!error && response.statusCode==200){
//     bearer_token = response.body.result;
//     // console.log(response);
//   //  console.log(body);
//   }
// });
// console.log(bearer_token);

//till here done
bearer_token = "gTMfCVyjHspG4yc2vmSQhl6EibNdBYvUz3z2bYICuE2WD13U8AWCMu8SJ4CBQHdnT7_rD4U2Nt46YCFMVgO4SHKCwYsTJFfat0U78lN2GYyHBYn9uH4B7HvZ8BatK_ZeCPR6WIhx0_MBP1U3nm_eQaGTCpycYHSEIbRhJ6q9FadSkN5F7Yk41gMYc7u2zsvDEqr61tweFxPt6KEEhLp7tqgAzVegISOSU3Uus_YGlAjYlG35ZD0tAJqOBuUkH-caxv4_yaKn6x3Pw0RtL0AXYY6HiYyhVFvnAztf23SOjsz1HbrQkwlEpXSCVHdoX8rmFsPmdtsDBYwGwJ3A0Hv4YcXvIkPiITc-d-llcNOwdQWNDK-QMnkiZ2m9WC84cGon3DXlaeFNSeip4lS6iYHsf-7cPQL7XF_e3DT7_ArHFMq21-PeMj7CzvdbvOE6rKuTnJm6F6mRSkX1Ui1fimX9bqm_yOZc5LV_fJRmpkVKVIKKDv98-NSfwM_nfpfr9FGl5ThDSI327tetSQ-xWAk4kg"


const post_jobs='https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs';

var job_data = {"startInfo": {
    "ReleaseKey": "dd0518b0-135b-46a3-8787-c796431f9b8e"
  }};
//console.log(bearer_token);



    unirest.post(post_jobs)
    .headers({'Content-Type': 'application/json','Authorization': 'Bearer '+ bearer_token})
    .send({
        "startInfo": {
                "ReleaseKey": "dd0518b0-135b-46a3-8787-c796431f9b8e" }})
    .end(function (response) {
    console.log(response.body);
});



// request({
//   headers:{'Content-Type':'application/json','Authorization':'Bearer '+bearer_token},
//   url: post_jobs,
//   form: job_data
// });
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
