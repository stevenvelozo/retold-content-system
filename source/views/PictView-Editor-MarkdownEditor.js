const libPictSectionMarkdownEditor = require('pict-section-markdowneditor');

const _ViewConfiguration =
{
	ViewIdentifier: "ContentEditor-MarkdownEditor",

	DefaultRenderable: "MarkdownEditor-Wrap",
	DefaultDestinationAddress: "#ContentEditor-Editor-Container",

	TargetElementAddress: "#ContentEditor-Editor-Container",
	ContentDataAddress: "AppData.ContentEditor.Document.Segments",

	ReadOnly: false,
	EnableRichPreview: true,

	AutoRender: false,

	Renderables:
	[
		{
			RenderableHash: "MarkdownEditor-Wrap",
			TemplateHash: "MarkdownEditor-Container",
			DestinationAddress: "#ContentEditor-Editor-Container"
		}
	]
};

/**
 * Content Editor Markdown Editor View
 *
 * Extends pict-section-markdowneditor to integrate with the
 * content system's server-side image upload and auto-save.
 */
class ContentEditorMarkdownEditorView extends libPictSectionMarkdownEditor
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	/**
	 * Handle image uploads — POST to the server instead of using base64.
	 *
	 * @param {File} pFile - The image file
	 * @param {number} pSegmentIndex - The segment index
	 * @param {Function} fCallback - Callback (error, url)
	 * @returns {boolean} true to indicate async handling
	 */
	onImageUpload(pFile, pSegmentIndex, fCallback)
	{
		let tmpProvider = this.pict.providers['ContentEditor-Provider'];

		if (!tmpProvider)
		{
			return false;
		}

		tmpProvider.uploadImage(pFile, (pError, pURL) =>
		{
			if (pError)
			{
				fCallback(pError);
			}
			else
			{
				fCallback(null, pURL);
			}
		});

		return true;
	}

	/**
	 * Hook to add/remove CodeMirror extensions before editor creation.
	 *
	 * Adds EditorView.lineWrapping when the Markdown Word Wrap setting
	 * is enabled.
	 *
	 * @param {Array} pExtensions - The extensions array
	 * @param {number} pSegmentIndex - The segment index
	 * @returns {Array} The modified extensions array
	 */
	customConfigureExtensions(pExtensions, pSegmentIndex)
	{
		if (this.pict.AppData.ContentEditor && this.pict.AppData.ContentEditor.MarkdownWordWrap)
		{
			let tmpCM = this._codeMirrorModules;
			if (tmpCM && tmpCM.EditorView && tmpCM.EditorView.lineWrapping)
			{
				pExtensions.push(tmpCM.EditorView.lineWrapping);
			}
		}

		return pExtensions;
	}

	/**
	 * Handle content changes — mark document as dirty.
	 *
	 * @param {number} pSegmentIndex - The segment index that changed
	 * @param {string} pContent - The new content
	 */
	onContentChange(pSegmentIndex, pContent)
	{
		if (this.pict.PictApplication)
		{
			this.pict.PictApplication.markDirty();
			this.pict.PictApplication.updateStats();
		}
	}
}

module.exports = ContentEditorMarkdownEditorView;

module.exports.default_configuration = _ViewConfiguration;
