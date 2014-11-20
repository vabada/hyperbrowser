var express    = require('express')
  , http       = require('http')
  , path       = require('path')
  , db         = require('./models')
  , fs         = require('fs')
  , bodyParser = require('body-parser')
  , pg         = require('pg');

var app = express();

// all environments
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.redirect('javascript.html');
});

app.get('/hyperbrowser.html', function(req, res) {
    res.redirect('javascript.html');
});

app.get('/javascript', function(req, res) {
    res.redirect('javascript.html');
});

app.get('/temporal', function(req, res) {
    res.redirect('temporal.html');
});

app.get('/shaders', function(req, res) {
    res.redirect('shaders.html');
});

//stats handler (copying them to a file)
app.post('/statsHandler', function(req, res) {

    //write to database
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      //var query = client.query('SELECT * FROM your_table');

      //query.on('row', function(row) {
      //console.log(JSON.stringify(row));
      });
    });

    console.log("Receiving stats:");
    console.log(req.body);
    fs.appendFile('stats.log', JSON.stringify(req.body)+"\n", function (err) {
      if (err) throw err;
      console.log('Saved to file OK');
    });
    res.status(200).end();
});

/*app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})*/

db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err[0]
  } else {
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'))
    })
  }
})
