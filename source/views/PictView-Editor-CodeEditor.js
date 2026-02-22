const libPictSectionCode = require('pict-section-code');

/**
 * Map of file extensions to highlight.js language identifiers.
 *
 * highlight.js supports 190+ languages. This map covers the most common
 * file extensions. For unlisted extensions, highlight.js auto-detection
 * is used as a fallback.
 */
const _ExtensionLanguageMap =
{
	'js': 'javascript',
	'mjs': 'javascript',
	'cjs': 'javascript',
	'jsx': 'javascript',
	'ts': 'typescript',
	'tsx': 'typescript',
	'json': 'json',
	'html': 'xml',
	'htm': 'xml',
	'xml': 'xml',
	'svg': 'xml',
	'css': 'css',
	'scss': 'scss',
	'sass': 'scss',
	'less': 'less',
	'sql': 'sql',
	'py': 'python',
	'rb': 'ruby',
	'java': 'java',
	'kt': 'kotlin',
	'kts': 'kotlin',
	'go': 'go',
	'rs': 'rust',
	'c': 'c',
	'h': 'c',
	'cpp': 'cpp',
	'cc': 'cpp',
	'hpp': 'cpp',
	'cs': 'csharp',
	'swift': 'swift',
	'php': 'php',
	'sh': 'bash',
	'bash': 'bash',
	'zsh': 'bash',
	'fish': 'bash',
	'yml': 'yaml',
	'yaml': 'yaml',
	'toml': 'ini',
	'ini': 'ini',
	'cfg': 'ini',
	'conf': 'ini',
	'dockerfile': 'dockerfile',
	'docker': 'dockerfile',
	'makefile': 'makefile',
	'mk': 'makefile',
	'md': 'markdown',
	'markdown': 'markdown',
	'lua': 'lua',
	'r': 'r',
	'pl': 'perl',
	'pm': 'perl',
	'ex': 'elixir',
	'exs': 'elixir',
	'erl': 'erlang',
	'hrl': 'erlang',
	'hs': 'haskell',
	'clj': 'clojure',
	'scala': 'scala',
	'dart': 'dart',
	'groovy': 'groovy',
	'gradle': 'groovy',
	'tf': 'terraform',
	'vim': 'vim',
	'diff': 'diff',
	'patch': 'diff',
	'log': 'accesslog',
	'txt': 'plaintext'
};

const _ViewConfiguration =
{
	ViewIdentifier: "ContentEditor-CodeEditor",

	DefaultRenderable: "CodeEditor-Wrap",
	DefaultDestinationAddress: "#ContentEditor-Editor-Container",

	TargetElementAddress: "#ContentEditor-Editor-Container",
	CodeDataAddress: "AppData.ContentEditor.CodeContent",

	ReadOnly: false,
	LineNumbers: true,
	Language: "javascript",
	Tab: "\t",

	AutoRender: false,

	Renderables:
	[
		{
			RenderableHash: "CodeEditor-Wrap",
			TemplateHash: "CodeEditor-Container",
			DestinationAddress: "#ContentEditor-Editor-Container"
		}
	]
};

/**
 * Content Editor Code Editor View
 *
 * Extends pict-section-code to integrate with the content system's
 * server-side save and auto-dirty detection. Uses highlight.js for
 * syntax highlighting across 190+ languages.
 */
class ContentEditorCodeEditorView extends libPictSectionCode
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		// When true, the next onCodeChange call will be suppressed
		// (used to prevent the initial marshalToView from marking dirty)
		this._suppressNextDirty = false;
	}

	/**
	 * Override the initial render to connect CodeJar and highlight.js
	 * before the editor is created.
	 */
	onAfterInitialRender()
	{
		// Connect CodeJar from the global bundle
		if (typeof (window) !== 'undefined' && window.CodeJarModules && window.CodeJarModules.CodeJar)
		{
			this.connectCodeJarPrototype(window.CodeJarModules.CodeJar);
		}

		// Set up highlight.js-based highlighting
		if (typeof (window) !== 'undefined' && window.CodeJarModules && window.CodeJarModules.hljs)
		{
			let tmpHljs = window.CodeJarModules.hljs;
			let tmpLanguage = this._language;

			this._highlightFunction = function (pElement)
			{
				// Remove any previous hljs state
				pElement.removeAttribute('data-highlighted');
				delete pElement.dataset.highlighted;

				// Set the language class for hljs
				pElement.className = pElement.className.replace(/\bhljs\b/g, '').replace(/\blanguage-\S+/g, '').trim();
				pElement.classList.add('hljs');
				if (tmpLanguage && tmpLanguage !== 'plaintext')
				{
					pElement.classList.add('language-' + tmpLanguage);
				}

				tmpHljs.highlightElement(pElement);
			};
		}

		// Now call the parent which creates the CodeJar instance
		return super.onAfterInitialRender();
	}

	/**
	 * Set the language for the editor and update highlight.js integration.
	 *
	 * @param {string} pLanguage - The highlight.js language identifier
	 */
	setLanguage(pLanguage)
	{
		this._language = pLanguage;

		// Rebuild the highlight function with the new language
		if (typeof (window) !== 'undefined' && window.CodeJarModules && window.CodeJarModules.hljs)
		{
			let tmpHljs = window.CodeJarModules.hljs;
			let tmpLanguage = pLanguage;

			this._highlightFunction = function (pElement)
			{
				pElement.removeAttribute('data-highlighted');
				delete pElement.dataset.highlighted;

				pElement.className = pElement.className.replace(/\bhljs\b/g, '').replace(/\blanguage-\S+/g, '').trim();
				pElement.classList.add('hljs');
				if (tmpLanguage && tmpLanguage !== 'plaintext')
				{
					pElement.classList.add('language-' + tmpLanguage);
				}

				tmpHljs.highlightElement(pElement);
			};
		}

		if (this._editorElement)
		{
			this._editorElement.className = 'pict-code-editor language-' + pLanguage;
			if (!this.options.LineNumbers)
			{
				this._editorElement.className += ' pict-code-no-line-numbers';
			}
		}

		if (this.codeJar)
		{
			// Re-create the editor with the new highlight function
			let tmpCode = this.codeJar.toString();
			this.codeJar.destroy();
			this.codeJar = this._codeJarPrototype(this._editorElement, this._highlightFunction,
			{
				tab: this.options.Tab,
				catchTab: this.options.CatchTab,
				addClosing: this.options.AddClosing
			});
			this.codeJar.updateCode(tmpCode);
			this.codeJar.onUpdate((pCode) =>
			{
				this._updateLineNumbers();
				this.onCodeChange(pCode);
			});
		}
	}

	/**
	 * Handle content changes — mark document as dirty.
	 *
	 * @param {string} pCode - The new code content
	 */
	onCodeChange(pCode)
	{
		// Write back to data address
		super.onCodeChange(pCode);

		// Suppress the dirty signal from the initial marshalToView call
		if (this._suppressNextDirty)
		{
			this._suppressNextDirty = false;
			return;
		}

		// Mark the document as dirty and update stats
		if (this.pict.PictApplication)
		{
			this.pict.PictApplication.markDirty();
			this.pict.PictApplication.updateStats();
		}
	}

	/**
	 * Get the highlight.js language for a file extension.
	 *
	 * @param {string} pExtension - The file extension (without dot)
	 * @returns {string} The highlight.js language identifier
	 */
	static getLanguageForExtension(pExtension)
	{
		if (!pExtension)
		{
			return 'plaintext';
		}
		let tmpExt = pExtension.toLowerCase();
		return _ExtensionLanguageMap[tmpExt] || 'plaintext';
	}
}

module.exports = ContentEditorCodeEditorView;

module.exports.default_configuration = _ViewConfiguration;
module.exports.ExtensionLanguageMap = _ExtensionLanguageMap;
