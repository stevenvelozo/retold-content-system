/**
 * Combined browser bundle for Retold Content System.
 *
 * Exports both the reader and editor applications as window globals
 * so each HTML page can bootstrap the appropriate one.
 *
 * In index.html: Pict.safeLoadPictApplication(PictContentReader, 2)
 * In edit.html:  Pict.safeLoadPictApplication(PictContentEditor, 2)
 */
module.exports =
{
	PictContentReader: require('./Pict-Application-ContentReader.js'),
	PictContentEditor: require('./Pict-Application-ContentEditor.js')
};

// Also expose on window for direct access
if (typeof (window) !== 'undefined')
{
	window.PictContentReader = module.exports.PictContentReader;
	window.PictContentEditor = module.exports.PictContentEditor;
}
