const libCommandLineCommand = require('pict-service-commandlineutility').ServiceCommandLineCommand;

const libFs = require('fs');
const libPath = require('path');

class ContentSystemCommandServe extends libCommandLineCommand
{
	constructor(pFable, pManifest, pServiceHash)
	{
		super(pFable, pManifest, pServiceHash);

		this.options.CommandKeyword = 'serve';
		this.options.Description = 'Start the content system server for a content folder.';

		this.options.CommandArguments.push(
			{ Name: '[content-path]', Description: 'Path to the markdown content folder (defaults to current directory).' });

		this.options.CommandOptions.push(
			{ Name: '-p, --port [port]', Description: 'Port to serve on (defaults to random 7000-7999).', Default: '0' });

		this.addCommand();
	}

	onRunAsync(fCallback)
	{
		let tmpContentPath = libPath.resolve(this.ArgumentString || process.cwd());

		// If no explicit content-path was given and the resolved directory has a
		// content/ subfolder, use that instead.  This way running the CLI from
		// a project root that has a content/ folder does the right thing.
		if (!this.ArgumentString)
		{
			let tmpContentSubfolder = libPath.join(tmpContentPath, 'content');
			if (libFs.existsSync(tmpContentSubfolder) && libFs.statSync(tmpContentSubfolder).isDirectory())
			{
				tmpContentPath = tmpContentSubfolder;
			}
		}

		let tmpDistPath = libPath.resolve(__dirname, '..', '..', '..', 'web-application');
		let tmpPortOption = parseInt(this.CommandOptions.port, 10);
		let tmpPort = (tmpPortOption > 0) ? tmpPortOption : (7000 + Math.floor(Math.random() * 1000));

		// Validate web-application path (packaged with the module)
		if (!libFs.existsSync(tmpDistPath))
		{
			this.log.error(`Built assets not found at ${tmpDistPath}. Run 'npm run build-all' in the retold-content-system package first.`);
			return fCallback(new Error('web-application folder not found'));
		}

		// Ensure content directory exists
		if (!libFs.existsSync(tmpContentPath))
		{
			libFs.mkdirSync(tmpContentPath, { recursive: true });
			this.log.info(`Created content directory: ${tmpContentPath}`);
		}

		let tmpSelf = this;
		let tmpSetupServer = require('../ContentSystem-Server-Setup.js');

		tmpSetupServer(
			{
				ContentPath: tmpContentPath,
				DistPath: tmpDistPath,
				Port: tmpPort
			},
			function (pError, pServerInfo)
			{
				if (pError)
				{
					tmpSelf.log.error(`Failed to start server: ${pError.message}`);
					return fCallback(pError);
				}

				tmpSelf.log.info('');
				tmpSelf.log.info('==========================================================');
				tmpSelf.log.info(`  Retold Content System running on http://localhost:${pServerInfo.Port}`);
				tmpSelf.log.info('==========================================================');
				tmpSelf.log.info(`  Content: ${tmpContentPath}`);
				tmpSelf.log.info(`  Assets:  ${tmpDistPath}`);
				tmpSelf.log.info(`  Reader:  http://localhost:${pServerInfo.Port}/`);
				tmpSelf.log.info(`  Editor:  http://localhost:${pServerInfo.Port}/edit.html`);
				tmpSelf.log.info('==========================================================');
				tmpSelf.log.info('');
				tmpSelf.log.info('  Press Ctrl+C to stop.');
				tmpSelf.log.info('');

				// Intentionally do NOT call fCallback() here.
				// The server should keep running -- the Orator listener
				// keeps the event loop alive.
			});
	}
}

module.exports = ContentSystemCommandServe;
