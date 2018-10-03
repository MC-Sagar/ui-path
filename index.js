var express = require('express');
var http = require('https');
var unirest = require('unirest');


var server = express();
var token = '';

var myjson = {
    "tenancyName" : "<Your Tenacy Name>",
    "usernameOrEmailAddress" : "<Your Email>",
    "password" : "<Your password for the orchestrator>"
 }

server.get('/postError',function (request,response)  {
    unirest.post('https://platform.uipath.com/api/account/authenticate')
    .header('Accept', 'application/json')
    .send(myjson)
    .end(function (response) {
        token = response.body.result;
        console.log(token);
    });

    post_jobs='https://platform.uipath.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs';

    unirest.post(post_jobs)
    .headers({'Content-Type': 'application/json','Authorization': 'Bearer '+ token})
    .send({
        "startInfo": {
                "ReleaseKey": "dd0518b0-135b-46a3-8787-c796431f9b8e" }})
    .end(function (response) {
    console.log(response.body);
});


        });
server.listen(3000);
