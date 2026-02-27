/**
 * Retold Content System -- Shared Orator Server Setup
 *
 * This module encapsulates all server initialization logic so it can be
 * used by both the standalone server.js entry point and the CLI serve command.
 *
 * @param {object} pOptions
 * @param {string} pOptions.ContentPath  - Absolute path to the markdown content folder
 * @param {string} pOptions.DistPath     - Absolute path to the built web-application folder
 * @param {number} pOptions.Port         - HTTP port to listen on
 * @param {Function} fCallback           - Callback(pError, { Fable, Orator, Port })
 */

const libFs = require('fs');
const libPath = require('path');

const libFable = require('fable');
const libOrator = require('orator');
const libOratorServiceServerRestify = require('orator-serviceserver-restify');
const libFileBrowserService = require('pict-section-filebrowser').FileBrowserService;

/**
 * Sanitize a file path -- prevent directory traversal attacks.
 *
 * @param {string} pPath - The raw path from the client
 * @returns {string|null} A safe relative path, or null if invalid
 */
function sanitizePath(pPath)
{
	if (!pPath || typeof (pPath) !== 'string')
	{
		return null;
	}

	// Decode URI components
	let tmpPath = decodeURIComponent(pPath);

	// Remove leading slashes
	tmpPath = tmpPath.replace(/^\/+/, '');

	// Block directory traversal
	if (tmpPath.includes('..'))
	{
		return null;
	}

	// Block absolute paths
	if (libPath.isAbsolute(tmpPath))
	{
		return null;
	}

	// Remove dangerous characters
	tmpPath = tmpPath.replace(/[<>"|?*]/g, '_');

	return tmpPath || null;
}

/**
 * Sanitize a filename -- strip path separators and dangerous characters.
 *
 * @param {string} pName - The raw filename from the client
 * @returns {string} A safe filename
 */
function sanitizeFilename(pName)
{
	if (!pName || typeof (pName) !== 'string')
	{
		return 'upload';
	}
	let tmpName = libPath.basename(pName);
	tmpName = tmpName.replace(/[\/\\:*?"<>|]/g, '_');
	if (tmpName.length > 200)
	{
		tmpName = tmpName.substring(0, 200);
	}
	return tmpName || 'upload';
}

/**
 * Set up and start the Retold Content System Orator server.
 */
function setupContentSystemServer(pOptions, fCallback)
{
	let tmpContentPath = pOptions.ContentPath;
	let tmpDistFolder = pOptions.DistPath;
	let tmpPort = pOptions.Port;

	let tmpSettings =
	{
		Product: 'Retold-Content-System',
		ProductVersion: require('../../package.json').version,
		APIServerPort: tmpPort,
		ContentPath: tmpContentPath
	};

	let tmpFable = new libFable(tmpSettings);

	// Ensure the content directory exists
	if (!libFs.existsSync(tmpContentPath))
	{
		libFs.mkdirSync(tmpContentPath, { recursive: true });
	}

	tmpFable.serviceManager.addServiceType('OratorServiceServer', libOratorServiceServerRestify);
	tmpFable.serviceManager.instantiateServiceProvider('OratorServiceServer');
	tmpFable.serviceManager.addServiceType('Orator', libOrator);
	let tmpOrator = tmpFable.serviceManager.instantiateServiceProvider('Orator');

	// Set up the FileBrowserService for the content directory
	let tmpFileBrowser = new libFileBrowserService(tmpFable,
	{
		BasePath: tmpContentPath,
		APIRoutePrefix: '/api/filebrowser',
		ServeWebApp: false,
		IncludeHiddenFiles: false
	});

	tmpOrator.initialize(
		function ()
		{
			let tmpServiceServer = tmpOrator.serviceServer;

			// Enable body parsing for POST/PUT requests
			tmpServiceServer.server.use(tmpServiceServer.bodyParser());

			// Connect the file browser API routes
			tmpFileBrowser.connectRoutes();

			// --- PUT /api/filebrowser/settings ---
			// Toggle file browser options at runtime (e.g. hidden files)
			tmpServiceServer.put('/api/filebrowser/settings',
				(pRequest, pResponse, fNext) =>
				{
					try
					{
						if (pRequest.body && typeof (pRequest.body.IncludeHiddenFiles) === 'boolean')
						{
							tmpFileBrowser.options.IncludeHiddenFiles = pRequest.body.IncludeHiddenFiles;
						}
						pResponse.send({ Success: true });
					}
					catch (pError)
					{
						pResponse.send(500, { Error: pError.message });
					}
					return fNext();
				});

			// --- GET /api/content/read/* ---
			// Read the raw markdown content of a file
			tmpServiceServer.get('/api/content/read/*',
				(pRequest, pResponse, fNext) =>
				{
					try
					{
						let tmpFilePath = sanitizePath(pRequest.params['*']);

						if (!tmpFilePath)
						{
							pResponse.send(400, { Success: false, Error: 'Invalid file path.' });
							return fNext();
						}

						let tmpFullPath = libPath.join(tmpContentPath, tmpFilePath);

						// Ensure the resolved path is within the content directory
						let tmpRealContent = libFs.realpathSync(tmpContentPath);
						if (!tmpFullPath.startsWith(tmpRealContent))
						{
							pResponse.send(403, { Success: false, Error: 'Access denied.' });
							return fNext();
						}

						if (!libFs.existsSync(tmpFullPath))
						{
							pResponse.send(404, { Success: false, Error: 'File not found.' });
							return fNext();
						}

						let tmpContent = libFs.readFileSync(tmpFullPath, 'utf8');
						pResponse.send({ Success: true, Path: tmpFilePath, Content: tmpContent });
					}
					catch (pError)
					{
						pResponse.send(500, { Success: false, Error: pError.message });
					}
					return fNext();
				});

			// --- PUT /api/content/save/* ---
			// Save markdown content to a file (create or overwrite)
			tmpServiceServer.put('/api/content/save/*',
				(pRequest, pResponse, fNext) =>
				{
					try
					{
						let tmpFilePath = sanitizePath(pRequest.params['*']);

						if (!tmpFilePath)
						{
							pResponse.send(400, { Success: false, Error: 'Invalid file path.' });
							return fNext();
						}

						let tmpFullPath = libPath.join(tmpContentPath, tmpFilePath);

						// Ensure the resolved path target is within the content directory
						let tmpRealContent = libFs.realpathSync(tmpContentPath);
						let tmpTargetDir = libPath.dirname(tmpFullPath);
						// The file may not exist yet, but the directory should be within content
						if (!tmpTargetDir.startsWith(tmpRealContent))
						{
							pResponse.send(403, { Success: false, Error: 'Access denied.' });
							return fNext();
						}

						let tmpContent = '';
						if (pRequest.body && typeof (pRequest.body) === 'object' && pRequest.body.Content !== undefined)
						{
							tmpContent = pRequest.body.Content;
						}
						else if (typeof (pRequest.body) === 'string')
						{
							tmpContent = pRequest.body;
						}

						// Ensure the target directory exists
						let tmpDir = libPath.dirname(tmpFullPath);
						if (!libFs.existsSync(tmpDir))
						{
							libFs.mkdirSync(tmpDir, { recursive: true });
						}

						libFs.writeFileSync(tmpFullPath, tmpContent, 'utf8');

						tmpFable.log.info(`Content saved: ${tmpFilePath} (${tmpContent.length} bytes)`);
						pResponse.send({ Success: true, Path: tmpFilePath, Size: tmpContent.length });
					}
					catch (pError)
					{
						tmpFable.log.error(`Content save failed: ${pError.message}`);
						pResponse.send(500, { Success: false, Error: pError.message });
					}
					return fNext();
				});

			// --- POST /api/content/upload-image ---
			// Upload an image file into the content folder the user is browsing.
			// The client sends the target folder via the x-upload-path header.
			tmpServiceServer.post('/api/content/upload-image',
				(pRequest, pResponse, fNext) =>
				{
					try
					{
						let tmpBody = pRequest.body;

						if (!tmpBody)
						{
							pResponse.send(400, { Success: false, Error: 'No image data received.' });
							return fNext();
						}

						let tmpOriginalName = sanitizeFilename(pRequest.headers['x-filename']);
						let tmpContentType = pRequest.headers['content-type'] || 'application/octet-stream';

						// Determine file extension from content-type if needed
						let tmpExt = libPath.extname(tmpOriginalName);
						if (!tmpExt)
						{
							let tmpMimeMap =
							{
								'image/png': '.png',
								'image/jpeg': '.jpg',
								'image/gif': '.gif',
								'image/webp': '.webp',
								'image/svg+xml': '.svg',
								'image/bmp': '.bmp'
							};
							tmpExt = tmpMimeMap[tmpContentType] || '.bin';
							tmpOriginalName += tmpExt;
						}

						// Determine the target folder: use the x-upload-path header
						// (the folder the user is currently browsing), falling back
						// to the content root if none is provided.
						let tmpUploadFolder = tmpContentPath;
						let tmpRelativeFolder = '';
						let tmpRawUploadPath = pRequest.headers['x-upload-path'];
						if (tmpRawUploadPath)
						{
							let tmpSafePath = sanitizePath(tmpRawUploadPath);
							if (tmpSafePath)
							{
								tmpRelativeFolder = tmpSafePath;
								tmpUploadFolder = libPath.join(tmpContentPath, tmpSafePath);

								// Ensure the resolved path is within the content directory
								let tmpRealContent = libFs.realpathSync(tmpContentPath);
								if (!libPath.resolve(tmpUploadFolder).startsWith(tmpRealContent))
								{
									pResponse.send(403, { Success: false, Error: 'Access denied.' });
									return fNext();
								}
							}
						}

						// Ensure the target directory exists
						if (!libFs.existsSync(tmpUploadFolder))
						{
							libFs.mkdirSync(tmpUploadFolder, { recursive: true });
						}

						let tmpUniqueFilename = `${Date.now()}-${tmpOriginalName}`;
						let tmpFilePath = libPath.join(tmpUploadFolder, tmpUniqueFilename);

						let tmpBuffer = Buffer.isBuffer(tmpBody) ? tmpBody : Buffer.from(tmpBody);
						libFs.writeFileSync(tmpFilePath, tmpBuffer);

						// Build the URL: serve through the /content/ static route
						let tmpRelativePath = tmpRelativeFolder
							? (tmpRelativeFolder + '/' + tmpUniqueFilename)
							: tmpUniqueFilename;
						let tmpURL = `/content/${tmpRelativePath}`;
						tmpFable.log.info(`Image uploaded: ${tmpURL} (${tmpBuffer.length} bytes)`);

						pResponse.send(
						{
							Success: true,
							URL: tmpURL,
							RelativePath: tmpRelativePath,
							Filename: tmpUniqueFilename,
							Size: tmpBuffer.length
						});
					}
					catch (pError)
					{
						tmpFable.log.error(`Image upload failed: ${pError.message}`);
						pResponse.send(500, { Success: false, Error: pError.message });
					}
					return fNext();
				});

			// Serve content files (markdown, images, etc.) at /content/
			tmpOrator.addStaticRoute(`${tmpContentPath}/`, 'index.html', '/content/*', '/content/');

			// Serve the built application from dist/ (main static route)
			tmpOrator.addStaticRoute(`${tmpDistFolder}/`, 'index.html');

			// Start the server
			tmpOrator.startService(
				function ()
				{
					return fCallback(null,
					{
						Fable: tmpFable,
						Orator: tmpOrator,
						Port: tmpPort
					});
				});
		});
}

module.exports = setupContentSystemServer;
