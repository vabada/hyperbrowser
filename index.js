var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname))

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

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
