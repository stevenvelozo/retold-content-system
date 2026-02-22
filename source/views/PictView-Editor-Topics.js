const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ContentEditor-Topics",

	DefaultRenderable: "Topics-Wrap",
	DefaultDestinationAddress: "#ContentEditor-SidebarTopics-Container",

	AutoRender: false,

	CSS: /*css*/`
		.topics-container
		{
			display: flex;
			flex-direction: column;
			height: 100%;
			font-size: 0.82rem;
			color: #3D3229;
		}
		.topics-header
		{
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 8px 10px;
			border-bottom: 1px solid #EDE9E3;
			background: #FAF8F4;
			flex-shrink: 0;
		}
		.topics-header-title
		{
			flex: 1;
			font-weight: 600;
			font-size: 0.78rem;
			color: #5E5549;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.topics-header-btn
		{
			background: transparent;
			border: none;
			cursor: pointer;
			font-size: 0.82rem;
			color: #8A7F72;
			padding: 2px 6px;
			border-radius: 3px;
			line-height: 1;
		}
		.topics-header-btn:hover
		{
			color: #3D3229;
			background: #EDE9E3;
		}
		.topics-list
		{
			flex: 1;
			overflow-y: auto;
			overflow-x: hidden;
		}
		.topics-row
		{
			display: flex;
			align-items: flex-start;
			gap: 6px;
			padding: 8px 10px;
			border-bottom: 1px solid #F0EDE8;
			cursor: pointer;
			transition: background 0.1s;
		}
		.topics-row:hover
		{
			background: #F5F0EA;
		}
		.topics-row-info
		{
			flex: 1;
			min-width: 0;
		}
		.topics-row-code
		{
			font-weight: 600;
			font-size: 0.78rem;
			color: #2E7D74;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.topics-row-title
		{
			font-size: 0.72rem;
			color: #5E5549;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 1px;
		}
		.topics-row-path
		{
			font-size: 0.68rem;
			color: #8A7F72;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 1px;
		}
		.topics-row-actions
		{
			flex-shrink: 0;
			display: flex;
			gap: 2px;
			padding-top: 1px;
		}
		.topics-row-btn
		{
			background: transparent;
			border: none;
			cursor: pointer;
			font-size: 0.72rem;
			color: #8A7F72;
			padding: 2px 4px;
			border-radius: 3px;
			line-height: 1;
		}
		.topics-row-btn:hover
		{
			color: #3D3229;
			background: #EDE9E3;
		}
		.topics-row-btn-delete:hover
		{
			color: #D9534F;
			background: #FDF0EF;
		}
		/* Inline edit form */
		.topics-edit
		{
			padding: 8px 10px;
			border-bottom: 1px solid #DDD6CA;
			background: #FFF9F0;
		}
		.topics-edit-field
		{
			margin-bottom: 6px;
		}
		.topics-edit-label
		{
			display: block;
			font-size: 0.68rem;
			font-weight: 600;
			color: #8A7F72;
			margin-bottom: 2px;
		}
		.topics-edit-input
		{
			display: block;
			width: 100%;
			box-sizing: border-box;
			padding: 4px 6px;
			font-size: 0.78rem;
			border: 1px solid #DDD6CA;
			border-radius: 3px;
			background: #FFF;
			color: #3D3229;
			font-family: inherit;
		}
		.topics-edit-input:focus
		{
			outline: none;
			border-color: #2E7D74;
		}
		.topics-edit-actions
		{
			display: flex;
			gap: 6px;
			margin-top: 8px;
		}
		.topics-edit-save
		{
			background: #2E7D74;
			color: #FFF;
			border: none;
			border-radius: 3px;
			padding: 4px 12px;
			font-size: 0.72rem;
			font-weight: 600;
			cursor: pointer;
		}
		.topics-edit-save:hover
		{
			background: #3A9E92;
		}
		.topics-edit-cancel
		{
			background: transparent;
			color: #5E5549;
			border: 1px solid #DDD6CA;
			border-radius: 3px;
			padding: 4px 12px;
			font-size: 0.72rem;
			font-weight: 600;
			cursor: pointer;
		}
		.topics-edit-cancel:hover
		{
			background: #F0EDE8;
		}
		/* Footer add button */
		.topics-footer
		{
			flex-shrink: 0;
			padding: 8px 10px;
			border-top: 1px solid #EDE9E3;
			background: #FAF8F4;
		}
		.topics-add-btn
		{
			display: block;
			width: 100%;
			padding: 6px 0;
			background: #2E7D74;
			color: #FFF;
			border: none;
			border-radius: 4px;
			font-size: 0.78rem;
			font-weight: 600;
			cursor: pointer;
			text-align: center;
		}
		.topics-add-btn:hover
		{
			background: #3A9E92;
		}
		/* Empty state */
		.topics-empty
		{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 12px;
			padding: 32px 16px;
			text-align: center;
			color: #8A7F72;
			font-size: 0.82rem;
		}
		.topics-empty-icon
		{
			font-size: 2rem;
			color: #C4BDB3;
		}
		.topics-empty-btn
		{
			display: inline-block;
			padding: 6px 14px;
			background: #2E7D74;
			color: #FFF;
			border: none;
			border-radius: 4px;
			font-size: 0.78rem;
			font-weight: 600;
			cursor: pointer;
		}
		.topics-empty-btn:hover
		{
			background: #3A9E92;
		}
		.topics-empty-btn-secondary
		{
			background: transparent;
			color: #5E5549;
			border: 1px solid #DDD6CA;
		}
		.topics-empty-btn-secondary:hover
		{
			background: #F0EDE8;
			border-color: #8A7F72;
		}
	`,

	Templates:
	[
		{
			Hash: "Topics-Container-Template",
			Template: /*html*/`
<div class="topics-container" id="ContentEditor-Topics-Container">
	<div class="topics-header">
		<span class="topics-header-title" id="ContentEditor-Topics-HeaderTitle">Topics</span>
		<button class="topics-header-btn" title="Close topics file"
			onclick="pict.views['ContentEditor-Topics'].closeTopicsFile()">&times;</button>
	</div>
	<div class="topics-list" id="ContentEditor-Topics-List"></div>
	<div class="topics-footer" id="ContentEditor-Topics-Footer">
		<button class="topics-add-btn"
			onclick="pict.views['ContentEditor-Topics'].addTopic()">+ Add Topic</button>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "Topics-Wrap",
			TemplateHash: "Topics-Container-Template",
			DestinationAddress: "#ContentEditor-SidebarTopics-Container"
		}
	]
};

/**
 * Content Editor Topics View
 *
 * Manages .pict_documentation_topics.json files — JSON manifests that
 * map topic codes to help file paths and titles for built-in
 * application documentation.
 *
 * Supports full CRUD on topic entries with inline editing.
 */
class ContentEditorTopicsView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		// The parsed topics object (keyed by TopicCode)
		this._topics = {};

		// The file path of the currently loaded topics file
		this._topicsFilePath = '';

		// Whether the view has been rendered
		this._hasRendered = false;

		// The TopicCode currently being edited (null if none)
		this._editingTopicCode = null;
	}

	onAfterRender()
	{
		this._hasRendered = true;
		this.pict.CSSMap.injectCSS();

		// Check if we should show the empty state or the topic list
		if (!this._topicsFilePath)
		{
			this._showEmptyState();
		}
		else
		{
			this._updateHeaderTitle();
			this.renderTopicList();
		}
	}

	/**
	 * Load a topics JSON file from the server.
	 *
	 * @param {string} pPath - Relative path to the topics JSON file
	 * @param {Function} [fCallback] - Optional callback (error)
	 */
	loadTopicsFile(pPath, fCallback)
	{
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => {};
		let tmpSelf = this;

		if (!pPath)
		{
			return tmpCallback('No path specified');
		}

		let tmpProvider = this.pict.providers['ContentEditor-Provider'];
		if (!tmpProvider)
		{
			return tmpCallback('Provider not available');
		}

		tmpProvider.loadFile(pPath, (pError, pContent) =>
		{
			if (pError)
			{
				// If the default file doesn't exist, that's OK — show empty state
				tmpSelf._topics = {};
				tmpSelf._topicsFilePath = '';
				if (tmpSelf._hasRendered)
				{
					tmpSelf._showEmptyState();
				}
				return tmpCallback(pError);
			}

			try
			{
				let tmpParsed = JSON.parse(pContent);
				if (typeof (tmpParsed) === 'object' && tmpParsed !== null && !Array.isArray(tmpParsed))
				{
					tmpSelf._topics = tmpParsed;
				}
				else
				{
					tmpSelf._topics = {};
				}
			}
			catch (pParseError)
			{
				tmpSelf._topics = {};
				tmpSelf.log.warn('ContentEditor-Topics: Failed to parse topics JSON: ' + pParseError.message);
			}

			tmpSelf._topicsFilePath = pPath;

			// Persist the path in settings
			tmpSelf.pict.AppData.ContentEditor.TopicsFilePath = pPath;
			tmpSelf.pict.PictApplication.saveSettings();

			if (tmpSelf._hasRendered)
			{
				tmpSelf._updateHeaderTitle();
				tmpSelf.renderTopicList();
				tmpSelf._showFooter(true);
			}

			return tmpCallback(null);
		});
	}

	/**
	 * Save the current topics object back to the server.
	 *
	 * @param {Function} [fCallback] - Optional callback (error)
	 */
	saveTopicsFile(fCallback)
	{
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => {};

		if (!this._topicsFilePath)
		{
			return tmpCallback('No topics file loaded');
		}

		let tmpProvider = this.pict.providers['ContentEditor-Provider'];
		if (!tmpProvider)
		{
			return tmpCallback('Provider not available');
		}

		let tmpContent = JSON.stringify(this._topics, null, '\t');
		tmpProvider.saveFile(this._topicsFilePath, tmpContent, tmpCallback);
	}

	/**
	 * Close the currently loaded topics file.
	 */
	closeTopicsFile()
	{
		this._topics = {};
		this._topicsFilePath = '';
		this._editingTopicCode = null;

		this.pict.AppData.ContentEditor.TopicsFilePath = '';
		this.pict.PictApplication.saveSettings();

		if (this._hasRendered)
		{
			this._showEmptyState();
		}
	}

	/**
	 * Add a new topic entry.
	 *
	 * @param {Object} [pTopicData] - Optional pre-filled topic data
	 */
	addTopic(pTopicData)
	{
		if (!this._topicsFilePath)
		{
			// If no file loaded, create the default one
			this._createDefaultTopicsFile(() =>
			{
				this.addTopic(pTopicData);
			});
			return;
		}

		let tmpData = pTopicData || {};
		let tmpCode = tmpData.TopicCode || this._generateUniqueCode('New-Topic');

		let tmpTopic =
		{
			TopicCode: tmpCode,
			TopicHelpFilePath: tmpData.TopicHelpFilePath || '',
			TopicTitle: tmpData.TopicTitle || ''
		};

		if (typeof (tmpData.RelevantMarkdownLine) === 'number')
		{
			tmpTopic.RelevantMarkdownLine = tmpData.RelevantMarkdownLine;
		}

		this._topics[tmpCode] = tmpTopic;

		let tmpSelf = this;
		this.saveTopicsFile(() =>
		{
			tmpSelf.renderTopicList();
			tmpSelf.startEditTopic(tmpCode);
		});
	}

	/**
	 * Remove a topic entry after confirmation.
	 *
	 * @param {string} pTopicCode - The TopicCode to remove
	 */
	removeTopic(pTopicCode)
	{
		if (!pTopicCode || !this._topics[pTopicCode])
		{
			return;
		}

		if (!confirm('Remove topic "' + pTopicCode + '"?'))
		{
			return;
		}

		delete this._topics[pTopicCode];
		this._editingTopicCode = null;

		let tmpSelf = this;
		this.saveTopicsFile(() =>
		{
			tmpSelf.renderTopicList();
		});
	}

	/**
	 * Switch a topic row into inline edit mode.
	 *
	 * @param {string} pTopicCode - The TopicCode to edit
	 */
	startEditTopic(pTopicCode)
	{
		if (!pTopicCode || !this._topics[pTopicCode])
		{
			return;
		}

		this._editingTopicCode = pTopicCode;
		this.renderTopicList();

		// Focus the first input field
		let tmpInput = document.getElementById('topics-edit-code');
		if (tmpInput)
		{
			tmpInput.focus();
			tmpInput.select();
		}
	}

	/**
	 * Save the inline edit form values back into the topics object.
	 *
	 * @param {string} pOriginalCode - The original TopicCode being edited
	 */
	saveEditTopic(pOriginalCode)
	{
		if (!pOriginalCode || !this._topics[pOriginalCode])
		{
			return;
		}

		let tmpCodeInput = document.getElementById('topics-edit-code');
		let tmpTitleInput = document.getElementById('topics-edit-title');
		let tmpPathInput = document.getElementById('topics-edit-path');
		let tmpLineInput = document.getElementById('topics-edit-line');

		if (!tmpCodeInput)
		{
			return;
		}

		let tmpNewCode = tmpCodeInput.value.trim();
		let tmpNewTitle = tmpTitleInput ? tmpTitleInput.value.trim() : '';
		let tmpNewPath = tmpPathInput ? tmpPathInput.value.trim() : '';
		let tmpNewLine = tmpLineInput ? parseInt(tmpLineInput.value, 10) : NaN;

		// Validate: TopicCode must not be empty
		if (!tmpNewCode)
		{
			tmpCodeInput.style.borderColor = '#D9534F';
			return;
		}

		// Validate: if code changed, it must be unique
		if (tmpNewCode !== pOriginalCode && this._topics[tmpNewCode])
		{
			tmpCodeInput.style.borderColor = '#D9534F';
			alert('A topic with code "' + tmpNewCode + '" already exists.');
			return;
		}

		// Remove the old entry if the code changed
		if (tmpNewCode !== pOriginalCode)
		{
			delete this._topics[pOriginalCode];
		}

		let tmpTopic =
		{
			TopicCode: tmpNewCode,
			TopicHelpFilePath: tmpNewPath,
			TopicTitle: tmpNewTitle
		};

		if (!isNaN(tmpNewLine) && tmpNewLine > 0)
		{
			tmpTopic.RelevantMarkdownLine = tmpNewLine;
		}

		this._topics[tmpNewCode] = tmpTopic;
		this._editingTopicCode = null;

		let tmpSelf = this;
		this.saveTopicsFile(() =>
		{
			tmpSelf.renderTopicList();
		});
	}

	/**
	 * Cancel inline editing and re-render the list.
	 */
	cancelEditTopic()
	{
		this._editingTopicCode = null;
		this.renderTopicList();
	}

	/**
	 * Navigate to a topic's file in the editor, scrolling to
	 * RelevantMarkdownLine if present.
	 *
	 * @param {string} pTopicCode - The TopicCode to navigate to
	 */
	navigateToTopic(pTopicCode)
	{
		if (!pTopicCode || !this._topics[pTopicCode])
		{
			return;
		}

		let tmpTopic = this._topics[pTopicCode];
		let tmpFilePath = tmpTopic.TopicHelpFilePath;

		if (!tmpFilePath)
		{
			return;
		}

		this.pict.PictApplication.navigateToFile(tmpFilePath);

		// If there's a RelevantMarkdownLine, scroll to it after a brief delay
		// to allow the editor to render
		if (typeof (tmpTopic.RelevantMarkdownLine) === 'number' && tmpTopic.RelevantMarkdownLine > 0)
		{
			let tmpLine = tmpTopic.RelevantMarkdownLine;
			setTimeout(() =>
			{
				let tmpEditorView = this.pict.views['ContentEditor-MarkdownEditor'];
				if (tmpEditorView && tmpEditorView._segmentEditors)
				{
					// Find the segment and line to scroll to
					let tmpRunningLines = 0;
					for (let tmpKey in tmpEditorView._segmentEditors)
					{
						let tmpEditor = tmpEditorView._segmentEditors[tmpKey];
						if (tmpEditor && tmpEditor.state && tmpEditor.state.doc)
						{
							let tmpSegmentLines = tmpEditor.state.doc.lines;
							if (tmpRunningLines + tmpSegmentLines >= tmpLine)
							{
								// This segment contains the target line
								let tmpLocalLine = tmpLine - tmpRunningLines;
								if (tmpLocalLine < 1) tmpLocalLine = 1;
								if (tmpLocalLine > tmpSegmentLines) tmpLocalLine = tmpSegmentLines;
								let tmpLineInfo = tmpEditor.state.doc.line(tmpLocalLine);
								tmpEditor.dispatch({
									selection: { anchor: tmpLineInfo.from },
									scrollIntoView: true
								});
								tmpEditor.focus();
								break;
							}
							tmpRunningLines += tmpSegmentLines;
						}
					}
				}
			}, 500);
		}
	}

	/**
	 * Rebuild the topic list innerHTML from this._topics.
	 */
	renderTopicList()
	{
		let tmpListEl = document.getElementById('ContentEditor-Topics-List');
		if (!tmpListEl)
		{
			return;
		}

		let tmpKeys = Object.keys(this._topics);

		if (tmpKeys.length === 0)
		{
			tmpListEl.innerHTML = '<div style="padding:16px;text-align:center;color:#8A7F72;font-size:0.78rem;">No topics yet. Click "+ Add Topic" to create one.</div>';
			return;
		}

		let tmpHTML = '';

		for (let i = 0; i < tmpKeys.length; i++)
		{
			let tmpCode = tmpKeys[i];
			let tmpTopic = this._topics[tmpCode];

			if (this._editingTopicCode === tmpCode)
			{
				// Render inline edit form
				tmpHTML += this._buildEditFormHTML(tmpTopic);
			}
			else
			{
				// Render topic row
				tmpHTML += this._buildTopicRowHTML(tmpTopic);
			}
		}

		tmpListEl.innerHTML = tmpHTML;
	}

	/**
	 * Build the HTML for a topic row.
	 *
	 * @param {Object} pTopic - The topic object
	 * @returns {string} HTML string
	 */
	_buildTopicRowHTML(pTopic)
	{
		let tmpCode = this._escapeHTML(pTopic.TopicCode || '');
		let tmpTitle = this._escapeHTML(pTopic.TopicTitle || '');
		let tmpPath = this._escapeHTML(pTopic.TopicHelpFilePath || '');
		let tmpLine = (typeof (pTopic.RelevantMarkdownLine) === 'number') ? ' :' + pTopic.RelevantMarkdownLine : '';
		let tmpCodeEscaped = this._escapeAttr(pTopic.TopicCode || '');

		let tmpHTML = '<div class="topics-row" ondblclick="pict.views[\'ContentEditor-Topics\'].startEditTopic(\'' + tmpCodeEscaped + '\')">';
		tmpHTML += '<div class="topics-row-info">';
		tmpHTML += '<div class="topics-row-code">' + tmpCode + '</div>';
		if (tmpTitle)
		{
			tmpHTML += '<div class="topics-row-title">' + tmpTitle + '</div>';
		}
		if (tmpPath)
		{
			tmpHTML += '<div class="topics-row-path">' + tmpPath + tmpLine + '</div>';
		}
		tmpHTML += '</div>';
		tmpHTML += '<div class="topics-row-actions">';
		tmpHTML += '<button class="topics-row-btn" title="Edit" onclick="event.stopPropagation();pict.views[\'ContentEditor-Topics\'].startEditTopic(\'' + tmpCodeEscaped + '\')">\u270E</button>';
		tmpHTML += '<button class="topics-row-btn topics-row-btn-delete" title="Delete" onclick="event.stopPropagation();pict.views[\'ContentEditor-Topics\'].removeTopic(\'' + tmpCodeEscaped + '\')">\u2716</button>';
		if (tmpPath)
		{
			tmpHTML += '<button class="topics-row-btn" title="Go to file" onclick="event.stopPropagation();pict.views[\'ContentEditor-Topics\'].navigateToTopic(\'' + tmpCodeEscaped + '\')">\u2192</button>';
		}
		tmpHTML += '</div>';
		tmpHTML += '</div>';

		return tmpHTML;
	}

	/**
	 * Build the HTML for an inline edit form.
	 *
	 * @param {Object} pTopic - The topic object being edited
	 * @returns {string} HTML string
	 */
	_buildEditFormHTML(pTopic)
	{
		let tmpCode = this._escapeAttr(pTopic.TopicCode || '');
		let tmpTitle = this._escapeAttr(pTopic.TopicTitle || '');
		let tmpPath = this._escapeAttr(pTopic.TopicHelpFilePath || '');
		let tmpLine = (typeof (pTopic.RelevantMarkdownLine) === 'number') ? pTopic.RelevantMarkdownLine : '';
		let tmpOriginalCode = this._escapeAttr(pTopic.TopicCode || '');

		let tmpHTML = '<div class="topics-edit">';
		tmpHTML += '<div class="topics-edit-field">';
		tmpHTML += '<label class="topics-edit-label">Topic Code</label>';
		tmpHTML += '<input class="topics-edit-input" id="topics-edit-code" type="text" value="' + tmpCode + '" placeholder="My-Topic-Code">';
		tmpHTML += '</div>';
		tmpHTML += '<div class="topics-edit-field">';
		tmpHTML += '<label class="topics-edit-label">Title</label>';
		tmpHTML += '<input class="topics-edit-input" id="topics-edit-title" type="text" value="' + tmpTitle + '" placeholder="Topic title">';
		tmpHTML += '</div>';
		tmpHTML += '<div class="topics-edit-field">';
		tmpHTML += '<label class="topics-edit-label">Help File Path</label>';
		tmpHTML += '<input class="topics-edit-input" id="topics-edit-path" type="text" value="' + tmpPath + '" placeholder="path/to/file.md">';
		tmpHTML += '</div>';
		tmpHTML += '<div class="topics-edit-field">';
		tmpHTML += '<label class="topics-edit-label">Line Number (optional)</label>';
		tmpHTML += '<input class="topics-edit-input" id="topics-edit-line" type="number" value="' + tmpLine + '" placeholder="e.g. 23" min="1">';
		tmpHTML += '</div>';
		tmpHTML += '<div class="topics-edit-actions">';
		tmpHTML += '<button class="topics-edit-save" onclick="pict.views[\'ContentEditor-Topics\'].saveEditTopic(\'' + tmpOriginalCode + '\')">Save</button>';
		tmpHTML += '<button class="topics-edit-cancel" onclick="pict.views[\'ContentEditor-Topics\'].cancelEditTopic()">Cancel</button>';
		tmpHTML += '</div>';
		tmpHTML += '</div>';

		return tmpHTML;
	}

	/**
	 * Show the empty state (no topics file loaded).
	 */
	_showEmptyState()
	{
		let tmpContainer = document.getElementById('ContentEditor-Topics-Container');
		if (!tmpContainer)
		{
			// If the container doesn't exist yet, just render the whole view
			let tmpDestination = document.getElementById('ContentEditor-SidebarTopics-Container');
			if (tmpDestination)
			{
				tmpDestination.innerHTML = this._buildEmptyStateHTML();
			}
			return;
		}

		tmpContainer.innerHTML = this._buildEmptyStateHTML();
	}

	/**
	 * Build the empty state HTML.
	 *
	 * @returns {string} HTML string
	 */
	_buildEmptyStateHTML()
	{
		let tmpHTML = '<div class="topics-empty">';
		tmpHTML += '<div class="topics-empty-icon">&#x1F4D1;</div>';
		tmpHTML += '<div>No topics file loaded</div>';
		tmpHTML += '<button class="topics-empty-btn" onclick="pict.views[\'ContentEditor-Topics\'].loadDefaultTopicsFile()">Load .pict_documentation_topics.json</button>';
		tmpHTML += '<button class="topics-empty-btn topics-empty-btn-secondary" onclick="pict.views[\'ContentEditor-Topics\'].promptSelectTopicsFile()">Select file...</button>';
		tmpHTML += '</div>';
		return tmpHTML;
	}

	/**
	 * Attempt to load the default topics file (.pict_documentation_topics.json).
	 * If it doesn't exist, create it.
	 */
	loadDefaultTopicsFile()
	{
		let tmpSelf = this;
		let tmpDefaultPath = '.pict_documentation_topics.json';

		this.loadTopicsFile(tmpDefaultPath, (pError) =>
		{
			if (pError)
			{
				// File doesn't exist — create it
				tmpSelf._createDefaultTopicsFile();
			}
		});
	}

	/**
	 * Prompt the user for a custom topics file path.
	 */
	promptSelectTopicsFile()
	{
		let tmpPath = prompt('Enter the path to a topics JSON file:', '.pict_documentation_topics.json');
		if (tmpPath && tmpPath.trim())
		{
			let tmpSelf = this;
			this.loadTopicsFile(tmpPath.trim(), (pError) =>
			{
				if (pError)
				{
					// File doesn't exist — offer to create it
					if (confirm('File not found. Create "' + tmpPath.trim() + '"?'))
					{
						tmpSelf._topicsFilePath = tmpPath.trim();
						tmpSelf._topics = {};
						tmpSelf.pict.AppData.ContentEditor.TopicsFilePath = tmpPath.trim();
						tmpSelf.pict.PictApplication.saveSettings();
						tmpSelf.saveTopicsFile(() =>
						{
							if (tmpSelf._hasRendered)
							{
								tmpSelf.render();
							}
						});
					}
				}
			});
		}
	}

	/**
	 * Create the default topics file with empty contents.
	 *
	 * @param {Function} [fCallback] - Optional callback when done
	 */
	_createDefaultTopicsFile(fCallback)
	{
		let tmpCallback = (typeof (fCallback) === 'function') ? fCallback : () => {};
		let tmpSelf = this;
		let tmpDefaultPath = '.pict_documentation_topics.json';

		this._topicsFilePath = tmpDefaultPath;
		this._topics = {};

		this.pict.AppData.ContentEditor.TopicsFilePath = tmpDefaultPath;
		this.pict.PictApplication.saveSettings();

		this.saveTopicsFile(() =>
		{
			if (tmpSelf._hasRendered)
			{
				tmpSelf.render();
			}
			tmpCallback();
		});
	}

	/**
	 * Update the header title bar with the current file name.
	 */
	_updateHeaderTitle()
	{
		let tmpTitle = document.getElementById('ContentEditor-Topics-HeaderTitle');
		if (tmpTitle)
		{
			let tmpFileName = this._topicsFilePath.replace(/^.*\//, '');
			tmpTitle.textContent = tmpFileName || 'Topics';
			tmpTitle.title = this._topicsFilePath;
		}
	}

	/**
	 * Show or hide the footer (add button area).
	 *
	 * @param {boolean} pShow
	 */
	_showFooter(pShow)
	{
		let tmpFooter = document.getElementById('ContentEditor-Topics-Footer');
		if (tmpFooter)
		{
			tmpFooter.style.display = pShow ? '' : 'none';
		}
	}

	/**
	 * Generate a unique topic code by appending a suffix if needed.
	 *
	 * @param {string} pBase - The base code
	 * @returns {string} A unique code
	 */
	_generateUniqueCode(pBase)
	{
		if (!this._topics[pBase])
		{
			return pBase;
		}

		let tmpCounter = 2;
		while (this._topics[pBase + '-' + tmpCounter])
		{
			tmpCounter++;
		}
		return pBase + '-' + tmpCounter;
	}

	/**
	 * HTML-escape a string for safe insertion.
	 *
	 * @param {string} pStr
	 * @returns {string}
	 */
	_escapeHTML(pStr)
	{
		return String(pStr)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	/**
	 * Escape a string for use in an HTML attribute value.
	 *
	 * @param {string} pStr
	 * @returns {string}
	 */
	_escapeAttr(pStr)
	{
		return String(pStr)
			.replace(/&/g, '&amp;')
			.replace(/'/g, '&#39;')
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
}

module.exports = ContentEditorTopicsView;

module.exports.default_configuration = _ViewConfiguration;
