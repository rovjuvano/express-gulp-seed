# Setup

install node_modules

	npm install

# Development

run tests and restart server when source files change

	./node_modules/.bin/gulp
	open http://localhost:3000/

serve static pages

	ln -s ../acme-single-page-app/dist public

# Directory Structure

	src/ - source files of the express app
	src/app.js - module that exports the express app
	public - symbolic link to files to serve statically
	server.js - script to launch app server
	spec/ - test files and helpers (see paths.run for naming conventions)
	config/ - configuration files
	config/gulp.js - settings for Gulp
	config/run-jasmine.js - simple zero-config test runner for Jasmine 2.0 with minimatch glob support (included here until a stable module exists that has feature parity)

# Under the hood

## Gulp tasks

	default - watch
	test - run test suite once
	serve - launch app server once
	watch - watch:test, watch:serve
	watch:test - re-test as needed
	watch:serve - restart app server as needed

## Gulp configuration (config/gulp.js)

	paths.app - source files of express app and server
	paths.test.run - path to spec files (e.g. end in -spec.js, _spec.js, or Spec.js)
	paths.test.watch - file pattern of unit test dependencies

# TODOS

* add source file linting
* add jasmine-given and coffee-script for testing
