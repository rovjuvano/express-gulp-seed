module.exports = {
	paths: {
		app: ['./server.js', './src/**/*'],
		test: {
			run: './spec/**/*{[-_]s,S}pec.js',
			watch: './spec/**/*',
		},
	},
};
