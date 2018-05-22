// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url=require('url');
var bodyparser=require('body-parser');
var cors=require('cors')


app.use(express.static('public'));
app.use(bodyparser.json())
app.use(cors());
var urlobj;
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
 
  
});
app.get("/date/:dater",function(request,response){
  var dateval=request.params.dater;
  
  var options={
    year:"numeric"
    ,month:"long"
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




