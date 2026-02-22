/**
 * Retold Content System -- Standalone Server Entry Point
 *
 * This is the simple entry point for running the content system server
 * with default paths relative to this project directory.
 *
 * For CLI usage from arbitrary directories, use the `retold-content-system` command instead.
 *
 * Usage:
 *   npm run build-all   (build client bundles first)
 *   npm start           (start this server)
 *   Open http://localhost:8086       (reader mode)
 *   Open http://localhost:8086/edit.html  (editor mode)
 */

const libPath = require('path');
const libSetupServer = require('./source/cli/ContentSystem-Server-Setup.js');

let tmpPort = parseInt(process.env.PORT, 10) || 8086;

libSetupServer(
	{
		ContentPath: libPath.join(__dirname, 'content'),
		UploadPath: libPath.join(__dirname, 'uploads'),
		DistPath: libPath.join(__dirname, 'dist'),
		Port: tmpPort
	},
	function (pError, pServerInfo)
	{
		if (pError)
		{
			console.error('Failed to start server:', pError.message);
			process.exit(1);
		}
		pServerInfo.Fable.log.info('==========================================================');
		pServerInfo.Fable.log.info(`  Retold Content System running on http://localhost:${pServerInfo.Port}`);
		pServerInfo.Fable.log.info('==========================================================');
		pServerInfo.Fable.log.info(`  Content path: ${libPath.join(__dirname, 'content')}`);
		pServerInfo.Fable.log.info(`  Upload path:  ${libPath.join(__dirname, 'uploads')}`);
		pServerInfo.Fable.log.info(`  Reader:       http://localhost:${pServerInfo.Port}/`);
		pServerInfo.Fable.log.info(`  Editor:       http://localhost:${pServerInfo.Port}/edit.html`);
		pServerInfo.Fable.log.info('==========================================================');
	});
