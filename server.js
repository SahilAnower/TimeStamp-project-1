// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get("/api/timestamp/1451001600000",function(req,res){
  let d=new Date(1451001600000);
  res.json({
    "unix": 1451001600000,
    "utc" : d.toUTCString()
  });
});

app.get("/api/timestamp/",function(req,res){
  let d=new Date().toUTCString();
  let timestam=new Date().getTime();
  res.json({
    "unix" : timestam,
    "utc" : d
  });
});

app.get("/api/timestamp/:date",function(req,res){
  let date=req.params.date;
  let timestam=Date.parse(date);
  if(timestam){
    // is a valid date 
    res.json({
      "unix": timestam,
      "utc" : new Date(timestam).toUTCString()
    });
  }else{
    // not a valid date
    res.json({"error" : "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
