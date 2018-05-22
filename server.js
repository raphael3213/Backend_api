// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url=require('url');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
var urlobj;
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  urlobj=url.parse(request.url,true);
  
});
app.get("/date/:dater",function(request,response){
  var dateval=request.param.dater;
  
  var options={
    years:"numeric"
    ,months:"long"
    ,day:"numeric"
  };
  if(isNaN(dateval))
     {
       var natdate=new Date(dateval);
       natdate=natdate.toLocaleDateString("en-us",options);
       var unixdate=new Date(dateval).getTime()/1000;
       
       response.json({
       "unixtime":unixdate,
       "natural":natdate
       });
  
     }
  else{
    
    var unixdate=dateval;
    var natdate=new Date(dateval*1000);
    natdate=natdate.toLocaleDateString("en-us",options);
    response.json({
       "unixtime":unixdate,
       "natural":natdate
       });
  }
  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log(urlobj)
});




