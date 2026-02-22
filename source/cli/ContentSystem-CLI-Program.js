const libCLIProgram = require('pict-service-commandlineutility');

let _PictCLIProgram = new libCLIProgram(
	{
		Product: 'retold-content-system',
		Version: require('../../package.json').version,

		Command: 'retold-content-system',
		Description: 'Serve and edit markdown content folders with reader and editor apps powered by Pict.'
	},
	[
		require('./commands/ContentSystem-Command-Serve.js')
	]);

module.exports = _PictCLIProgram;
