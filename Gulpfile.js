var gulp = require('gulp'),
	gulpConfig = require('./config/gulp'),
	spawn = require('child_process').spawn,
	debounce = require('debounce'),
	pkg = require('./package.json');

var paths = gulpConfig.paths;

gulp.task('default', ['watch']);

gulp.task('test', [], function(cb) {
	var testProcess = spawn('node', ['./config/run-jasmine', paths.test.run]);
	testProcess.stdout.pipe(process.stdout);
	testProcess.stderr.pipe(process.stderr);
	testProcess.on('error', cb);
	testProcess.on('exit', function(exitStatus) {
		cb(null, exitStatus);
	});
})

var serverProcess;
gulp.task('serve', [], function() {
	serverProcess = spawn('node', ['./server.js']);
	serverProcess.stdout.pipe(process.stdout);
	serverProcess.stderr.pipe(process.stderr);
	serverProcess.on('error', console.error.bind(console));
	serverProcess.on('exit', function() {
		serverProcess = null;
	});
});
gulp.task('watch', ['watch:test', 'watch:serve']);
gulp.task('watch:test', ['test'], function() {
	gulp.watch([paths.app, paths.test.watch], ['test']);
});
gulp.task('watch:serve', ['serve'], function() {
	gulp.watch([paths.app], debounce(restartServer, 1000, true));
});
function restartServer() {
	if (serverProcess) {
		serverProcess.on('exit', restartServer);
		stopServer();
	}
	else {
		gulp.start('serve')
	}
}
function stopServer() {
	serverProcess && serverProcess.kill('SIGHUP');
}
process.on('exit', stopServer);
