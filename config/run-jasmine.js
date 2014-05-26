#!/usr/bin/env node
var jasmineRequire = require('jasmine-core'),
	printFn = require('util').print,
	gs = require('glob-stream'),
	map = require('map-stream');

loadSpecsAndRun(jasmineRequire.boot(jasmineRequire), process.argv.splice(2));

function loadSpecsAndRun(jasmine, globPattern) {
	loadSpecs(globPattern, {read: false})
		.on('end', function() {
			runSpecs(jasmine);
		});
}

function loadSpecs(globPattern) {
	return gs.create(globPattern)
		.pipe(map(function(file, cb) {
			require(file.path);
			cb();
		}));
}

function runSpecs(jasmine) {
	var consoleReporter = new jasmine.ConsoleReporter({
		print: printFn,
		onComplete: onDone,
		showColors: true,
		timer: new jasmine.Timer()
	});

	var env = jasmine.getEnv();
	var clearScreenAsciiEscape = '\u001B[2J\u001B[0;0f';
	printFn(clearScreenAsciiEscape);
	env.addReporter(consoleReporter);
	env.execute();
}

function onDone(passed) {
	process.exit(Number(!passed));
}
