#!/usr/bin/env node
var server = require('./src/app.js').listen(process.env.PORT || 3000, function() {
	console.log('Listening on port %d', server.address().port);
});
