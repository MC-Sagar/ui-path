// dependencies
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');
var unirest = require("unirest");
let errorResposne = {
    results: []
};
var port = process.env.PORT || 8080;
// create serve and configure it.
const server = express();
server.use(bodyParser.json());



server.post('/postError',function (request,response)  {



   const Http = new XMLHttpRequest();
   // const Http = require("xmlhttprequest").XMLHttpRequest;
   //const Http = new XMLHttpRequest();
   const postUrl='https://platform.uipath.com/api/account/authenticate';
   Http.open("POST",postUrl,true);
   Http.setRequestHeader('Content-Type', 'application/json');
   Http.send(JSON.stringify({
      "tenancyName" : "KartikKulks",
      "usernameOrEmailAddress" : "kartik.koolks@gmail.com",
      "password" : "Passw0rd"
   }));
   resp_bearer = Http.responseText.result;
   console.log(resp_bearer);


   post_jobs='https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs';

   Http.setRequestHeader('Authorization','Bearer ' + resp_bearer);
   Http.open("POST",post_jobs,true);
   Http.setRequestHeader('Content-Type', 'application/json');


   Http.setRequestHeader('Authorization', 'Bearer ' + resp_bearer);
   Http.setRequestHeader('Content-Type','application/json');
   Http.send(JSON.stringify({
    "startInfo": {
      "ReleaseKey": "dd0518b0-135b-46a3-8787-c796431f9b8e"
    }
  }));




  response.setHeader('Content-Type','application/json');
  response.send(JSON.stringify({
    "speech" : "Working properly",
    "displayText" : "working properly displayText",
    "source" : "ui-path-webhook"}));

});
server.get('/getName',function (req,res){
    res.send('Kartiks hook');
});
server.listen(port, function () {
    console.log("Server is up and running...");
});
