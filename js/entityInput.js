
//////////////////////////////////////////////////////////////////////////////////
//
//	HLINPUT ELEMENT CREATION FUNCTION
//
////////////////////////////////////////////////////////////////////////////////

function build_entityInput (DOM)
{
	entityId = DOM.getAttribute('id');

	var entityInput			= getDiv('entityInput');
	entityInput.entityType	= null;
	entityInput.isGhost		= null;
	entityInput.incomplete	= null;

	entityInput.classPrefix	= 'i_';
	entityInput.entityId	= entityId;
	var className			= entityInput.classPrefix + entityId;
	entityInput.classList.add(className);

	entityInput.setAttribute('entityId', entityId);

	entityInput.commandRegex		= /(?:([^\s"]+)|"([^"]*)"|"([^"]*$))+/g;

	// OBJECT FUNCITONS
	entityInput.onremove			= entityInput_onremove;
	entityInput.onresize			= entityInput_onresize;
	entityInput.beforeWindowFocus	= entityInput_beforeWindowFocus;
	entityInput.afterWindowFocus	= entityInput_afterWindowFocus;
	entityInput.onWindowBlur		= entityInput_onWindowBlur;
	entityInput.submit				= entityInput_submit;
	entityInput.clear				= entityInput_clear;
	entityInput.onInteract			= entityInput_onInteract;

	entityInput.formatString		= entityInput_formatString;

	// RENDERING FUNCTIONS
	entityInput.renderText			= entityInput_renderText;
	entityInput.renderCommand		= entityInput_renderCommand;

	// INJECTION AND FORMATTING
	entityInput.inject				= entityInput_inject;
	entityInput.resolveInjections	= entityInput_resolveInections;
	entityInput.indexesOf			= entityInput_indexesOf;
	entityInput.replaceChars		= entityInput_replaceChars;
	entityInput.tagString			= entityInput_tagString;
	entityInput.removeString		= entityInput_removeString;
	entityInput.injectBefore		= entityInput_injectBefore;
	entityInput.injectAfter			= entityInput_injectAfter;
	entityInput.formatTag			= entityInput_formatTag;
	entityInput.appendText			= entityInput_appendText;

	// COMMAND SECTION PARSING
	entityInput.parseStringSection	= entityInput_parseStringSection;
	entityInput.parseNumberSection	= entityInput_parseNumberSection;
	entityInput.parseOptionSection	= entityInput_parseOptionSection;

	entityInput.getCommandSections	= entityInput_getCommandSections;
	entityInput.addCommandIssue		= entityInput_addCommandIssue;

	// TOOLTIPS
	entityInput.showTooltip			= entityInput_showTooltip;
	entityInput.hideTooltip			= entityInput_hideTooltip;
	entityInput.setTooltip			= entityInput_setTooltip;
	entityInput.addToTooltip		= entityInput_addToTooltip;
//	entityInput.resizeTooltip		= entityInput_resizeTooltip;

	// CONTEXT
	entityInput.showContext			= entityInput_showContext;
	entityInput.hideContext			= entityInput_hideContext;
	entityInput.setContext			= entityInput_setContext;
	entityInput.clearContext		= entityInput_clearContext;
	entityInput.contextInfo;

	// OUTPUT
	entityInput.appendToOutput		= entityInput_appendToOutput;

	// INPUT ELEMETNS
	entityInput.input				= document.createElement('textarea');
	entityInput.input.entityInput	= entityInput;	// (<_<')
	entityInput.input.onscroll		= function (e)	{ this.entityInput.display.scrollTop = this.scrollTop; };

	entityInput.input.onclick		= function (e)	{ this.entityInput.onInteract(); };
	entityInput.input.onkeyup		= function (e)	{ this.entityInput.onInteract(); };
	entityInput.input.onkeydown		= function (e)
	{
		if (!e.shiftKey && e.keyCode === 13)
		{
			entityInput.submit();
			e.cancelBubble = true;
			return false;
		}
		this.entityInput.onInteract();
	};
	entityInput.input.onkeypress	= function (e)	{ this.entityInput.onInteract(); };

	entityInput.onfocus		= entityInput_onfocus;
	entityInput.onblur		= entityInput_onblur;

	entityInput.input.onfocus		= function () { entityInput.onfocus();	};
	entityInput.input.onblur		= function () { entityInput.onblur();	};

	// CONTEXT FLAG
	entityInput.contextFlag			= getDiv('entityInput_context');
	entityInput.contextLabel		= document.createElement('span');
	var clearFlag				= getDiv('entityInput_contextClear');
	clearFlag.innerHTML			= "&times;";
	clearFlag.onclick			= function () { entityInput.clearContext(); };
	entityInput.contextFlag.appendChild(entityInput.contextLabel);
	entityInput.contextFlag.appendChild(clearFlag);


//	entityInput.commentary			= getDiv('entityInput_commentary');
//	entityInput.output				= getDiv('entityInput_output');

	// TEXTAREA CONTAINER
	var taContainer		= getDiv('entityInput_taContainer');
	taContainer.appendChild(entityInput.input);

	entityInput.focus		= function () { this.input.focus(); };

	entityInput.display		= getDiv('entityInput_display');


	entityInput.submitButton = getDiv('entityInput_submit');
	entityInput.submitButton.onclick = function () { entityInput.submit(); };

	var submitLabel = document.createElement('span');
	submitLabel.className = 'entityInput_submitLabel';
	submitLabel.appendChild(document.createTextNode('Submit'));

//	entityInput.submitButton.appendChild(submitLabel);
	entityInput.submitButton.appendChild(getFaIcon('send'));
	entityInput.submitButton.title = 'Submit';

	// HLINPUT ASSEMBLE
	var inputControls = getDiv('entityInput_inputControls outline');

	inputControls.appendChild(entityInput.display);
	inputControls.appendChild(taContainer);
	inputControls.appendChild(entityInput.submitButton);
	inputControls.appendChild(entityInput.contextFlag);

	entityInput.inputControls = inputControls;

	entityInput.appendChild(inputControls);


	entityInput.commandHelp	= getDiv('entityInput_commandHelp');

	var commandHelpContainer = getDiv('entityInput_commandHelpContainer outline');

	commandHelpContainer.appendChild(entityInput.commandHelp);

	entityInput.commandHelpContainer = commandHelpContainer;

	entityInput.appendChild(commandHelpContainer);

	entityInput.hideTooltip();
	entityInput.clearContext(); // So we have a clean, reset contextInfo object.
	entityInput.hideContext();


	// REGISTRATION AND FINISHING

//	FinaliseInputHandler(entityInput.entityId);
	FinaliseEntityElementHandler(className);

	entityInput.commandIssues = [];

	return entityInput;
}

////////////////////////////////////////////////////////////////////////////////
//
//	OBJECT FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function entityInput_onremove ()
{

}

function entityInput_onresize ()
{
//	this.resizeTooltip();
}

// This is for WINDOW focus
function entityInput_beforeWindowFocus ()
{

}

// This is for WINDOW focus
function entityInput_afterWindowFocus ()
{
	this.focus();
}

function entityInput_onWindowBlur ()
{
//	var treeViewEntity = mainTreeView.entities['_' + this.entityId];
//
//	if (treeViewEntity)
//	{
//		treeViewEntity.div.rowDiv.setAttribute('focused', 'false');
//	}
}

// This is for INPUT focus
function entityInput_onfocus ()
{
	this.setAttribute('focused', 'true');
}

// This is for INPUT focus
function entityInput_onblur ()
{
	this.setAttribute('focused', 'false');
}

function entityInput_submit ()
{
	if (this.input.value[0] === undefined)
	{
		// Empty post
//		this.appendToOutput('<r>Empty post</r>');
		return;
	}

	if (this.input.value[0] === '>')
	{
		var params		= this.getCommandSections();
		var switches	= params.shift().substr(1).split('-');
		var inputtedCommand = switches.shift().toLowerCase();
		if (commandAliases[inputtedCommand]) inputtedCommand = commandAliases[inputtedCommand];
		var commandName	= commandNames[inputtedCommand];

		if (!commandName) return;

		var commandObject = commandObjects[commandName.toLowerCase()];

		if (window['validate_' + commandName])
		{
			window['validate_' + commandName].call(this, params);
		}

		var skipClientValidation = false;
		if (switches.indexOf('h') !== -1) skipClientValidation = true;

		if (!skipClientValidation && this.commandIssues.length > 0)
		{
			this.appendToOutput('<r>Command <b>' + commandName + '</b> contains error(s) and could not be submitted:</r>');

			for (var i in this.commandIssues)
			{
				this.appendToOutput('<r>&bull;</r> ' + this.commandIssues[i]);
			}

			this.appendToOutput('\nPlease resolve these errors before resubmitting.');
			this.appendToOutput('<hr/>');

			this.focus();

			return;
		}

		if (commandObject.isClientCommand)
		{
			var functionName = 'clientCommand_' + commandName;

			var callback = window[functionName];

			if (!callback) errorOutput('Missing client command callback for ' + functionName + '.');

			params.shift(switches);

			callback.apply(this, params);
		}
		else
		{
			// Command mode
			CommandHandler(this.entityId, commandName, switches, params);
		}
	}
	else
	{
		CommentHandler(this.entityId, this.input.value, this.contextInfo);
		updateFeeds([this.entityId]);
		this.clearContext();
	}
}

function entityInput_clear ()
{
	this.input.value = '';
	this.onInteract();
}

function entityInput_onInteract ()
{
	this.hideTooltip();

	var displayString = this.formatString(this.input.value);

	this.display.innerHTML = displayString;

	this.display.scrollTop = this.input.scrollTop;
}

function entityInput_formatString (string, stripTags)
{
	this.string = string;
	this.stripTags = stripTags ? true : false;

	this.chars = this.string.split('');
	this.iPoints = new Array(this.chars.length);

//	this.chars.push('&nbsp;');
	this.chars.push(' ');

	var selectionStart = this.input.selectionStart;
	var selectionEnd = this.input.selectionEnd;

	// Remove potential html tag or entity characters
	this.replaceChars('<', '&lt;');
	this.replaceChars('>', '&gt;');
	this.replaceChars('&', '&amp;');

	// This makes it possible to see the caret and selection across new lines
	this.replaceChars('\n', '&nbsp;\n');

	var isCommand = this.string[0] === '>';

	if (isCommand)
	{
		this.hideContext();
		this.renderCommand();
	}
	else
	{
		this.showContext();
		this.renderText();
	}

	if (!this.stripTags)
	{
		this.inject(new Tag('sel'), selectionStart);
		this.inject(new Tag('/sel'), selectionEnd);

		this.inject(new Tag('caret'), selectionEnd);
		this.inject(new Tag('/caret'), selectionEnd + 1);
	}

	this.resolveInjections();

	var displayString = this.chars.join('');

	return displayString;
}

function entityInput_getCommandSections ()
{
	var regex = this.commandRegex;
	var matches;
	var val;
	var sections = [];

	while (matches = regex.exec(this.string))
	{
		do
		{
			if (!matches.length || (val = matches.pop())) break;
		}
		while (true);

		sections.push(val);
	}

	return sections;
}

function entityInput_addCommandIssue (issue)
{
	this.commandIssues.push(issue);
}

////////////////////////////////////////////////////////////////////////////////
//
//	SELECTIVE RENDER FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function entityInput_renderText ()
{
	this.formatTag('r');
	this.formatTag('g');
	this.formatTag('b');
	this.formatTag('c');
	this.formatTag('y');
	this.formatTag('m');
	this.formatTag('rh');
	this.formatTag('gh');
	this.formatTag('bh');
	this.formatTag('ch');
	this.formatTag('yh');
	this.formatTag('mh');
	this.formatTag('ru');
	this.formatTag('gu');
	this.formatTag('bu');
	this.formatTag('cu');
	this.formatTag('yu');
	this.formatTag('mu');

	this.formatTag('rb');
	this.formatTag('rbh');
	this.formatTag('rbu');
	this.formatTag('sv');
}

////////////////////////////////////////////////////////////////////////////////

function entityInput_renderCommand ()
{
	var sections = this.getCommandSections();
	var commandString = sections[0].substr(1);
	var switches = commandString.split('-');
	var inputtedCommandName = switches.shift();

	var sectionObjects = [];
	var cumLength = 0;

	this.commandIssues = [];

	this.inject(new Tag('k'), 0);

	for (var i in sections)
	{
		var section = {
			'value' : sections[i],
			'startIndex' : this.string.indexOf(sections[i], cumLength)
		};

		section.endIndex = section.startIndex + sections[i].length;

		cumLength = section.endIndex;

		sectionObjects.push(section);
	}

	var commandSection = sectionObjects.shift();

	/*
		At this point we have an array of "section" obejects with properties for:
			- value
			- startIndex
			- endIndex
	*/

	var commandName_lc = inputtedCommandName.toLowerCase();
	var entityType_lc = this.entityType.toLowerCase();
	var commandObject = null;

	if (commandAliases[commandName_lc])
	{
		commandName_lc = commandAliases[commandName_lc];
	}

	if (commandObjects[commandName_lc] !== undefined)
//	if (commandObjects[commandName_lc] !== undefined && (sections.length > 1 || this.string.substr(-1) === ' '))
	{
		var commandName = commandNames[commandName_lc];
		commandObject = commandObjects[commandName_lc];

		var typeAllowed = true;

		if (commandObject.blackList && commandObject.blackList.indexOf(entityType_lc) !== -1) typeAllowed = false;
		if (commandObject.whiteList && commandObject.whiteList.indexOf(entityType_lc) === -1) typeAllowed = false;

		if (!typeAllowed) this.addCommandIssue('Command <b>' + commandName + '</b> cannot be run on an entity of type "' + this.entityType + '".');

		this.setTooltip('\t<k>' + commandObject.desc + '</k>\n');

		////////////////////////////////////////////////////////////////////////
		//
		//	SWITCHES
		//
		////////////////////////////////////////////////////////////////////////

		if (switches.length)
		{
//			this.addToTooltip('\n\tswitches:');
			var switchSectionObjects = [];
			var cumLength = this.string.indexOf('-');

			for (var i in switches)
			{
				if (switches[i] === '') continue;

				cumLength ++; // Added for the hyphen

				var switchSection = {
					'value' : switches[i],
					'startIndex' : cumLength
				};

				cumLength += switches[i].length;

				switchSection.endIndex = cumLength;

				switchSectionObjects.push(switchSection);
			}

			for (var i in switchSectionObjects)
			{
				var switchSectionObject = switchSectionObjects[i];
				var switchColour;

				if (commandObject.switches[switchSectionObject.value] === undefined)
				{
					switchColour = 'r';
					this.addCommandIssue('Unrecognised switch "' + switchSectionObject.value + '".');
				}
				else
				{
					switchColour = 'b';
				}

				this.inject(new Tag(switchColour), switchSectionObject.startIndex);
				this.inject(new Tag('/' + switchColour), switchSectionObject.endIndex);

				this.addToTooltip('\n\t');

				var switchFunction;
				if (switchFunction = commandObject.switches[switchSectionObject.value]) // No, this is fine.
				{
					this.addToTooltip('<g>' + switchSectionObject.value + '</g> : ' + switchFunction);
				}
				else
				{
					this.addToTooltip('<r>' + switchSectionObject.value + '</r> : <rh> Invalid switch </rh>');
				}
			}
			this.addToTooltip('\n');
		}

		////////////////////////////////////////////////////////////////////////
		//
		//	COMMAND VARS
		//
		////////////////////////////////////////////////////////////////////////

		var underCaretFound = false;

		for (var parseIndex in commandObject.vars)
		{
			parseIndex = parseInt(parseIndex);
			var sectionParseObject = commandObject.vars[parseIndex];
			sectionParseObject.underCaret = false;

			var sectionObject = (sectionObjects[parseIndex] !== undefined) ? sectionObjects[parseIndex] : null;

			if (!underCaretFound && sectionObject)
			{
//				if (this.input.selectionEnd >= sectionObject.startIndex && this.input.selectionEnd <= sectionObject.endIndex)
				if  (this.input.selectionEnd <= sectionObject.endIndex)
				{
					sectionParseObject.underCaret	= true;
					underCaretFound = true;
				}
			}
			else if (!underCaretFound && this.input.selectionEnd > commandSection.endIndex)
			{
				sectionParseObject.underCaret	= true;
				underCaretFound = true;
			}

			switch (sectionParseObject.type)
			{
				case 'string':
					this.parseStringSection(sectionParseObject, sectionObject);
					break;

				case 'number':
					this.parseNumberSection(sectionParseObject, sectionObject);
					break;

				case 'option':
					this.parseOptionSection(sectionParseObject, sectionObject);
					break;

				default:
					alert('Case missing for type "' + sectionParseObject.type + '".');
					break;
			}
		}
	}
	else
	{
		this.setTooltip('<c>Available commands:</c>\n');
		var availableCommandNames = [];

		for (var lcCommandName in commandNames)
		{
			var availableCommandObject = commandObjects[lcCommandName];
//			var lcEntityType = this.entityType.toLowerCase();

			if (availableCommandObject.whiteList && availableCommandObject.whiteList.indexOf(entityType_lc) === -1) continue;
			if (availableCommandObject.blackList && availableCommandObject.blackList.indexOf(entityType_lc) !== -1) continue;

			var lcInput = inputtedCommandName.toLowerCase();

			if (lcCommandName.search(lcInput) >= 0)
			{
				var regex = new RegExp('(' + lcInput + ')', 'gi');
				var listItem = commandNames[lcCommandName].replace(regex, "<b>$1</b>");
				listItem = '<span class="entityInput_commandListItem">' + listItem + '</span>';
				availableCommandNames.push(listItem);
			}
		}

		if (availableCommandNames.length)
		{
			this.addToTooltip(availableCommandNames.join(''));
		}
		else
		{
			this.addToTooltip('<rh> No matching commands available </rh>');
		}

		this.showTooltip();
	}

	if (sectionObject)
	{
		this.inject(new Tag('k'), sectionObject.endIndex);
	}

	var commandTag = commandObject !== null ? 'bh' : 'yh';

	if (!commandObject)
	{
		this.addCommandIssue('Unrecognised command "' + commandName + '".');
	}
	else
	{
		var commandTitle = commandNames[commandName.toLowerCase()];
		if (this.commandIssues.length)
		{
			commandTitle = commandTitle + ' <rh> Incomplete </rh>';
		}
		else
		{
			commandTitle = commandTitle + ' <gh> Ready </gh>';
		}

		this.addToTooltip(commandTitle + '\n', true);

	}

	this.inject(new Tag(commandTag), 0);
	this.inject(new Tag('/' + commandTag), inputtedCommandName.length + 1);


	this.showTooltip();
}

////////////////////////////////////////////////////////////////////////////////
//
//	PARSING & PRESENTATION FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function entityInput_inject (tag, index)
{
	if (this.iPoints[index])
	{
		var otherTag = tag.opposite();
		for (var i in this.iPoints[index])
		{
			if (otherTag.equals(this.iPoints[index][i]))
			{
				this.iPoints[index][i] = undefined;
				return;
			}
		}
	}
	else
	{
		this.iPoints[index] = [];
	}

	if (tag.isOpenTag)
	{
		this.iPoints[index].push(tag);
	}
	else
	{
		this.iPoints[index].unshift(tag);
	}

}

function entityInput_resolveInections ()
{
	var currentState = {
		'order': []
	};
	var reps		= this.iPoints.length;
	var openTags	= 0;

	for (var stringIndex = 0; stringIndex <= reps; stringIndex++)
	{
		if (this.iPoints[stringIndex])
		{
			var currentTags = this.iPoints[stringIndex];

			for (var currentTagIndex in currentTags)
			{
				var tag = currentTags[currentTagIndex];

				if (!tag) continue;

				if (tag.isOpenTag)
				{
					// We're opening a new tag.

					if (currentState[tag.type] === undefined) currentState[tag.type] = 0;

//					var beforeState = Boolean(currentState[tag.type]);
					currentState[tag.type]++;

					currentState.order.push(tag.type);
				}
				else
				{

					// We're attempting to close a tag.

					if (currentState[tag.type] === undefined || currentState[tag.type] < 1)
					{
//						alert('Attempting to close tag that was never opened.');
						continue;
					}

					currentState[tag.type]--;

					var lastIndex = currentState.order.lastIndexOf(tag.type);

					currentState.order.splice(lastIndex, 1);
				}

				// End of current tags
			}

			var tagString = ('</span>').repeat(openTags);

			for (var i in currentState.order)
			{
				tagString = tagString + '<span class="' + currentState.order[i] + '">';
			}
			openTags = currentState.order.length;


//			this.iPoints[stringIndex] = '</span><span class = "' + currentState.order.join(' ') + '">';
			this.iPoints[stringIndex] = tagString;

		}
	}

	for (var stringIndex = reps; stringIndex >= 0; stringIndex--)
	{
		if (this.iPoints[stringIndex])
		{
			Array.prototype.splice.call(this.chars, stringIndex, 0, this.iPoints[stringIndex]);
		}
	}
}

function entityInput_indexesOf (string)
{
	var index = undefined;
	var indexes = [];

	do
	{
		index = this.string.indexOf(string, index +1);
		if (index !== -1) indexes.push(index);
	}
	while (index !== -1)

	return indexes;
}

function entityInput_replaceChars (char, replacement)
{
	var indexes = this.indexesOf(char);

	for (var i in indexes)
	{
		this.chars[indexes[i]] = replacement;
	}
}

function entityInput_tagString (string, tag)
{
	var indexes = this.indexesOf(string);
	var offset = string.length;

	var open = new Tag(tag);
	var close = new Tag('/' + tag);

	for (var i in indexes)
	{
		this.inject(open, indexes[i]);
		this.inject(close, indexes[i] + offset);
	}
}

function entityInput_removeString (string)
{
	var indexes = this.indexesOf(string);
	var offset = string.length;

	for (var i in indexes)
	{
		for (var j = 0; j < offset; j++)
		{
			this.chars[indexes[i] + j] = '';
		}
	}
}

function entityInput_injectBefore (string, tag)
{
	var indexes = this.indexesOf(string);

	var iTag = new Tag(tag);

	for (var i in indexes)
	{
		this.inject(iTag, indexes[i]);
	}
}

function entityInput_injectAfter (string, tag)
{
	var indexes = this.indexesOf(string);
	var offset = string.length;
	var iTag = new Tag(tag);

	for (var i in indexes)
	{
		this.inject(iTag, indexes[i] + offset);
	}
}

function entityInput_formatTag (tag)
{
	this.injectAfter('[' + tag + ']', tag);
	this.injectBefore('[/' + tag + ']', '/' + tag);

	if (this.stripTags)
	{
		this.removeString('[' + tag + ']');
		this.removeString('[/' + tag + ']');
	}
	else
	{
		this.tagString('[' + tag + ']', 'k');
		this.tagString('[/' + tag + ']', 'k');
	}
}

function entityInput_appendText (text)
{
	this.chars.push(text);
}

////////////////////////////////////////////////////////////////////////////////
//
//	SECTION PARSING FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function entityInput_parseStringSection (parseObject, sectionObject)
{
	var varNameTag = parseObject.underCaret ? 'wh' : 'w';
	var tooltip = '\n\t<' + varNameTag + '>' + parseObject.name + ':</' + varNameTag + '> ';

	if (sectionObject)
	{
		var isValid = true;

		var ttString = sectionObject.value;
		var ttWarning;

		var sectionLength = sectionObject.value.length;

		if (isValid && parseObject.maxLength && sectionLength > parseObject.maxLength)
		{
			this.addCommandIssue(parseObject.name + ' is ' + (sectionLength - parseObject.maxLength) + ' characters too long.');
			ttWarning = 'Too long';
			isValid = false;
		}

		if (isValid && parseObject.minLength && sectionLength < parseObject.minLength)
		{
			this.addCommandIssue(parseObject.name + ' is ' + (parseObject.minLength - sectionLength) + ' characters too short.');
			ttWarning = 'Too short';
			isValid = false;
		}

		if (isValid && parseObject.regexPattern)
		{
			// Test the regex
		}

		var tagType = isValid ? 'g' : 'r';

		this.inject(new Tag(tagType), sectionObject.startIndex);
		this.inject(new Tag('/' + tagType), sectionObject.endIndex);


		if (parseObject.obfuscated)
		{
			var ttString = '';

			for (var i = sectionObject.startIndex; i < sectionObject.endIndex; i++)
			{
				this.chars[i] = '&bull;';
				ttString = ttString + '&bull;';
			}
		}

		// TOOLTIP STUFF

		if (ttString.length > 50)
		{
			var overflow = ttString.length - 50;
			ttString = ttString.substr(0, 50) + '<k>...[+' + overflow + ']</k>';
		}

		tooltip = tooltip + '<' + tagType + '>' + ttString + '</' + tagType + '>';
		if (ttWarning) tooltip = tooltip + ' <rh> ' + ttWarning + ' </rh>';

	}
	else
	{
		tooltip = tooltip + '<k>' + parseObject.type;

		if (parseObject.minLength !== null && parseObject.maxLength !== null)
		{
			tooltip = tooltip + ' (' + parseObject.minLength + '-' + parseObject.maxLength + ' chars)';
		}
		else if (parseObject.minLength !== null)
		{
			tooltip = tooltip + ' (>' + parseObject.minLength + ' chars)';
		}
		else if (parseObject.maxLength !== null)
		{
			tooltip = tooltip + ' (<' + parseObject.maxLength + ' chars)';
		}

		if (parseObject.optional)
		{
			tooltip = tooltip + ' [optional]';
		}
		else
		{
			this.addCommandIssue(parseObject.name + ' is required');
		}
		tooltip = tooltip + '</k>';
	}

	this.addToTooltip(tooltip);
}

function entityInput_parseNumberSection (parseObject, sectionObject)
{
	var varNameTag = parseObject.underCaret ? 'wh' : 'w';
	var tooltip = '\n\t<' + varNameTag + '>' + parseObject.name + ':</' + varNameTag + '> ';

	if (sectionObject)
	{
		var number = parseInt(this.string.substr(sectionObject.startIndex, sectionObject.endIndex - sectionObject.startIndex));

		var isValid= true;

		var ttWarning;

		if (!number && number !== 0)
		{
			this.addCommandIssue(parseObject.name + ' is not a number.');
			ttWarning = 'Not a number';
			isValid = false;
		}
		else if (parseObject.max !== null && number > parseObject.max)
		{
			this.addCommandIssue(parseObject.name + ' is too high (max: ' + parseObject.max + ').');
			ttWarning = 'Too high';
			isValid = false;
		}
		else if (parseObject.min !== null && number < parseObject.min)
		{
			this.addCommandIssue(parseObject.name + ' is too low (min: ' + parseObject.max + ').');
			ttWarning = 'Too low';
			isValid = false;
		}

		var tagType = isValid ? 'g' : 'r';

		this.inject(new Tag(tagType), sectionObject.startIndex);
		this.inject(new Tag('/' + tagType), sectionObject.endIndex);

		// TOOLTIP BITS

		var tooltip = tooltip + '<' + tagType + '>' + sectionObject.value + '</' + tagType + '>';
		if (ttWarning) tooltip = tooltip + ' <rh> ' + ttWarning + ' </rh>';
	}
	else
	{
		tooltip = tooltip + '<k>' + parseObject.type;

		if (parseObject.min !== null && parseObject.max !== null)
		{
			tooltip = tooltip + ' (' + parseObject.min + '-' + parseObject.max + ')';
		}
		else if (parseObject.min !== null)
		{
			tooltip = tooltip + ' (>' + parseObject.min + ')';
		}
		else if (parseObject.max !== null)
		{
			tooltip = tooltip + ' (<' + parseObject.max + ')';
		}

		if (parseObject.optional)
		{
			tooltip = tooltip + ' [optional]';
		}
		else
		{
			this.addCommandIssue(parseObject.name + ' is required');
		}
		tooltip = tooltip + '</k>';
	}

	this.addToTooltip(tooltip);
}

function entityInput_parseOptionSection (parseObject, sectionObject)
{
	var varNameTag = parseObject.underCaret ? 'wh' : 'w';
	var tooltip = '\n\t<' + varNameTag + '>' + parseObject.name + ':</' + varNameTag + '> ';

	if (sectionObject)
	{
		var isValid = true;

		sectionObject.value = sectionObject.value.toLowerCase();

		var ttWarning;

		if (parseObject.options[parseInt(sectionObject.value)] !== undefined)
		{
			sectionObject.value = parseObject.options[parseInt(sectionObject.value)];
		}
		else if (parseObject.options.indexOf(sectionObject.value) === -1)
		{
			isValid = false;
			ttWarning = 'Invalid option';
			this.addCommandIssue('"' + sectionObject.value + '" is not a valid value for ' + parseObject.name + '.');
		}

		var tagType = isValid ? 'g' : 'r';

		this.inject(new Tag(tagType), sectionObject.startIndex);
		this.inject(new Tag('/' + tagType), sectionObject.endIndex);

		// TOOLTIP BUSINESS

		var tooltip = tooltip + '<' + tagType + '>' + sectionObject.value + '</' + tagType + '>';
		if (ttWarning) tooltip = tooltip + ' <rh> ' + ttWarning + ' </rh>';
	}
	else
	{
//		tooltip = tooltip + '<k>' + parseObject.type + ' ["' + parseObject.options.join('", "') + '"]';
		tooltip = tooltip + '<k>' + parseObject.type + ' (' + parseObject.options.join(' / ') + ')';

		if (parseObject.optional)
		{
			tooltip = tooltip + ' [optional]';
		}
		else
		{
			this.addCommandIssue(parseObject.name + ' is required');
		}
		tooltip = tooltip + '</k>';
	}

	this.addToTooltip(tooltip);
}

////////////////////////////////////////////////////////////////////////////////
//
//	CONTEXT FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function entityInput_showContext ()
{
	if (!this.contextInfo.label || !this.contextInfo.context)
	{
		return;
	}

	this.contextLabel.innerHTML = '';
	this.contextLabel.appendChild(getText(this.contextInfo.label));

	this.contextFlag.style.padding	= '';
	this.contextFlag.style.height	= '';
	this.contextFlag.style.top		= '';
	this.contextFlag.style.overflow	= '';

	this.classList.add('showContext');
}

function entityInput_hideContext ()
{
	this.contextFlag.style.padding	= '0px 10px 0px 2px';
	this.contextFlag.style.height	= '0px';
	this.contextFlag.style.top		= '0px';
	this.contextFlag.style.overflow	= 'hidden';

	this.classList.remove('showContext');
}

function entityInput_setContext (label, context, data)
{
	this.contextInfo.label		= label;
	this.contextInfo.context	= context;
	this.contextInfo.data		= data;

	this.showContext();
}

function entityInput_clearContext ()
{
	this.contextInfo =
	{
		'label'		: null,
		'context'	: null,
		'data'		: null
	};

	this.hideContext();
}

////////////////////////////////////////////////////////////////////////////////
//
//	TOOLTIP FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function entityInput_showTooltip ()
{
	if (!this.commandHelpContainer.innerHTML.length) return;

	this.inputControls.style.height	= '50%';
	this.commandHelpContainer.style.height	= '50%';
}

function entityInput_hideTooltip ()
{
//	this.commandHelp.innerHTML = '';

	this.inputControls.style.height	= '100%';
	this.commandHelpContainer.style.height	= '0%';
}

function entityInput_setTooltip (content)
{
	this.commandHelp.innerHTML = content;
}

function entityInput_addToTooltip (content, prepend)
{
	if (prepend)
	{
		this.commandHelp.innerHTML = content + this.commandHelp.innerHTML;
	}
	else
	{
		this.commandHelp.innerHTML = this.commandHelp.innerHTML + content;
	}
}

function entityInput_appendToOutput (output)
{
	conduit_appendOutput (this.entityId, [{'body':output}]);
}

////////////////////////////////////////////////////////////////////////////////
//
//	TAG OBJECT
//
////////////////////////////////////////////////////////////////////////////////

function Tag (type)
{
	if (type[0] === '/')
	{
		this.isOpenTag	= false;
		this.type		= type.substr(1);
	}
	else
	{
		this.isOpenTag	= true;
		this.type		= type;
	}

	this.equals = function (tag)
	{
		if (!(tag instanceof Tag)) return false;
		return this.type === tag.type && this.isOpenTag === tag.isOpenTag;
	};

	this.opposite = function ()
	{
		return new Tag((this.isOpenTag ? '/' : '') + this.type);
	};
}

////////////////////////////////////////////////////////////////////////////////
//
//	HLINPUT REGISTER
//
////////////////////////////////////////////////////////////////////////////////

function setHlInputReplyContext (entityId, seqNo)
{
	targetHlInput.setContext('re: ' + seqNo, 're', seqNo);
}

////////////////////////////////////////////////////////////////////////////////
//
//	CONDUIT FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function conduit_clearFocus (entityId)
{
	var inputs = document.getElementsByClassName('i_' + entityId);

	for (var i in inputs)
	{
		if (isNaN(i)) continue;

		var input = inputs[i];

		input.clear();
		input.focus();
	}


}

function conduit_setContext (entityId, label, context, data)
{
	var inputs = document.getElementsByClassName('i_' + entityId);

	for (var i in inputs)
	{
		if (isNaN(i)) continue;

		var input = inputs[i];

		input.setContext(label, context, data);
		input.clear();
		input.focus();
	}

}

function conduit_finaliseInput (currentId, attributeObject)
{
	var inputs = document.getElementsByClassName('i_' + currentId);

	for (var i in inputs)
	{
		if (isNaN(i)) continue;

		var input = inputs[i];

		for (var j in attributeObject)
		{
			input[j] = attributeObject[j];

			switch(j)
			{
				case 'entityId':
					input.setAttribute(j, attributeObject[j]);
					input.classList.remove('i_' + currentId);
					input.classList.add('i_' + attributeObject[j]);
					break;
			}
		}
	}
}