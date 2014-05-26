var express = require('express');
var app = module.exports = express();

app.get('/api', function(req, res) {
	res.send('Hello World!');
});

app.use(express.static('./public'));
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});
