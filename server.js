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
app.get('/api/timestamp', (req, res) => {
  const utc = new Date(Date.now())
  const unix = utc.getTime()
  res.json({
    unix,
    utc: utc.toUTCString()
  })
})
app.get("/api/timestamp/:date", function (req, res) {
    if(/\d{5,}/.test(req.params.date)) {
        const unix = +req.params.date;
        const utc = new Date(unix).toUTCString()
        if(utc == 'Invalid Date') {
        res.json({
            error: 'Invalid Date'
        })
        }else {
        res.json({
        unix,
        utc
        });
        }
    }
  else {
      const date = req.params.date
      const utc = new Date(date)
      if(utc.toString() === 'Invalid Date') {
        res.json({
          error: 'Invalid Date'
        })
      }else {
        const unix = utc.getTime()
        res.json({
          unix,
          utc: utc.toUTCString()
        });
      } 
  }
});
app.get('*', function(req, res){
  res.send('Not Found', 404);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
