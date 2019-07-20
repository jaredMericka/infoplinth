
window.onmouseout = function () { if (window.onmouseup) window.onmouseup(); };

function getDiv (className, id)
{
	var div = document.createElement('div');

	if (className)	div.className	= className;

	if (!id) id = getElementId();
	div.id = id;

	return div;
}

function getText (text)
{
	return document.createTextNode(text);
}

function getHr ()
{
	return document.createElement('hr');
}

function getElm (name, className, id)
{
	var elm = document.createElement(name);

	if (className)	elm.className	= className;

	if (!id) id = getElementId();
	elm.id = id;

	return elm;
}

var idCount = 0;
function getElementId ()
{
	return 'id'+idCount++;
}

function getGuiHash ()
{
	var length = 10;

	var chars = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890').split('');

	var id = '_';

	for (var i = 0; i < length; i++)
	{
		id = id + array_rand(chars);
	}

	return id;
}

function array_rand (array)
{
	return array[Math.floor(Math.random()*array.length)];
}

function unixToTimestamp(UNIX_timestamp)
{
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();

	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

	return time;
}

function myEncodeURIComponent (subject)
{
	return subject;

	if (!subject) return;

	if (subject.constructor === Array)
	{
		for (var index in subject)
		{
			subject[index] = encodeURIComponent(subject[index]);
			return subject;
		}
	}
	else
	{
		return encodeURIComponent(subject);
	}
}

////////////////////////////////////////////////////////////////////////////////
//
//	AUTO SCROLL
//
////////////////////////////////////////////////////////////////////////////////

var as_register = {};
var as_timer = null;

function autoScrollByElement (elm)
{
	if (!elm.id)
	{
		elm.id = getGuiHash();
	}

	autoScrollById(elm.id);
}

function autoScrollById (id)
{
	if (as_register[id] !== undefined) return;

	var elm = document.getElementById(id);
	if (!elm) return;

//	if (elm.scrollTop < elm.scrollHeight - elm.offsetHeight - 10) return;

	if (elm.onscroll)
	{
		elm._onscroll = elm.onscroll;
	}

	elm.onscroll = autoScroller__onscroll;
	as_register[id] = 1;

	if (as_timer === null)
	{
		as_timer = setTimeout(autoScroll, 20);
	}
}

function autoScroll ()
{
	for (var id in as_register)
	{
		var elm = document.getElementById(id);
		elm.isAuto = true;
		elm.scrollTop = elm.scrollTop + as_register[id];


//		elm.onscroll = function () { if (as_register[id] !== undefined) delete as_register[id]; };

		if (elm.scrollHeight <= elm.scrollTop + elm.offsetHeight)
		{
			if (this._onscroll)
			{
				this.onscroll = this._onscroll;
			}
			delete as_register[id];
		}
		else
		{
			as_register[id] += 1 + (as_register[id] * 0.1);
//			as_register[id] += <?=CHAR_HEIGHT?>;
		}
	}

	if (Object.keys(as_register).length > 0)
	{
		as_timer = setTimeout(autoScroll, 20);
	}
	else
	{
		as_timer = null;
	}
}

function autoScroller__onscroll ()
{
	if (this.isAuto)
	{
		this.isAuto = false;
		if (this._onscroll)
		{
			this.onscroll = this._onscroll;
		}
		return;
	}

	delete as_register[this.id];
}

////////////////////////////////////////////////////////////////////////////////
//
//	NOTIFICATION
//
////////////////////////////////////////////////////////////////////////////////

var notificationIcon = 'asterisk';

function notify (element)
{
	do
	{
		if (element.notify)
		{
			element.notify();
		}
		element = element.parentNode;
	}
	while (element && element !== document.body);
}

////////////////////////////////////////////////////////////////////////////////
//
//	DEBUGGING
//
////////////////////////////////////////////////////////////////////////////////

var errorOutputDiv;

function build_errorOutput (DOM)
{
	if (errorOutputDiv) return errorOutputDiv;

	errorOutputDiv = getDiv('debug_errorOutput');
	errorOutputDiv.onremove = function ()
	{
		errorOutputDiv = null;
	};

	return errorOutputDiv;
}

function errorOutput (message)
{
	if (!errorOutputDiv)
	{
		getCWindow('<errorOutput />', 'Error output', 'warning').move(200, 300, 400, 600);
	}

	var appendDiv = getDiv();
	appendDiv.innerHTML = message;

	errorOutputDiv.appendChild(appendDiv);
	errorOutputDiv.appendChild(getHr());

	autoScrollByElement(errorOutputDiv);

	if (errorWindow = getCWindowByChild(errorOutputDiv)) errorWindow.focus();
}

function conduit_errorOutput (message) { errorOutput(message); }

////////////////////////////////////////////////////////////////////////////////

var debugOutputDiv;

function build_debugOutput (DOM)
{
	if (debugOutputDiv) return debugOutputDiv;

	debugOutputDiv = getDiv('debug_debugOutput');
	debugOutputDiv.onremove = function ()
	{
		debugOutputDiv = null;
	};

	return debugOutputDiv;
}

function debugOutput (message, tag)
{
	if (tag)
	{
		message = '<' + tag + '>' + message + '</' + tag + '>';
	}

	if (!debugOutputDiv)
	{
		getCWindow('<debugOutput />', 'Debug output', 'bug').move(100, 500, 400, 600);
	}

	var appendDiv = getDiv();
	appendDiv.innerHTML = message;

	debugOutputDiv.appendChild(appendDiv);
	debugOutputDiv.appendChild(getHr());

	autoScrollByElement(debugOutputDiv);

	if (debugWindow = getCWindowByChild(debugOutputDiv)) debugWindow.focus();
}

function conduit_debugOutput (message) { debugOutput(message); };

////////////////////////////////////////////////////////////////////////////////

function build_searchResults (DOM)
{
	var content = getDiv('content');

	var table = getElm('table');

	var header		= getElm('tr');
	var nameHeader	= getElm('th');
	var idHeader	= getElm('th');

	header.appendChild(nameHeader);
	header.appendChild(idHeader);

	nameHeader.appendChild(getText('Name'));
	idHeader.appendChild(getText('Id'));

	table.appendChild(header);

	for (var i in DOM.childNodes)
	{
		if (isNaN(i)) continue;

		var entityId = DOM.childNodes[i].getAttribute('entityId');

		var row = getElm('tr');

		var nameCell = getElm('td', 'pointer');
		nameCell.row = row;
		nameCell.appendChild(getText(DOM.childNodes[i].getAttribute('name')));

		var idCell = getElm('td', 'pointer');
		idCell.row = row;
		idCell.appendChild(getText(entityId));

		row.appendChild(nameCell);
		row.appendChild(idCell);

		table.appendChild(row);

		row.entityId = entityId;

		nameCell.onclick = function ()
		{
			openEntity(this.row.entityId, this.id);
//			openEntity(this.row.entityId);
		};

		idCell.onclick = function ()
		{
			// Copy the id;
		};
	}

	content.appendChild(table);

	return content;
}

////////////////////////////////////////////////////////////////////////////////

function getAbsoluteOffset (elm)
{
	var result = {
		'offsetTop' : 0,
		'offsetLeft' : 0
	};

	do
	{
		result.offsetTop += elm.offsetTop;
		result.offsetLeft += elm.offsetLeft;

		elm = elm.parentNode;
	} while (elm && elm !== document.body);

	return result;
}

function cancelEvent (e)
{
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

function getOffsets (element)
{
	var offsets = {
		'top' : element.offsetTop,
		'left' : element.offsetLeft
	};

	if (!element.offsetParent) return offsets;

	do
	{
		element = element.offsetParent;
		offsets.top += (element.offsetTop - element.scrollTop + element.clientTop);
		offsets.left += (element.offsetLeft - element.scrollLeft + element.clientLeft);
	}
	while (element.offsetParent && element.offsetParent !== document);

	return offsets;
}

function getTable ()
{
	var table = document.createElement('table');

	table.addRow = function ()
	{
		var row = document.createElement('tr');

		for (var i in arguments)
		{
			var cell = document.createElement('td');
			cell.innerHTML = arguments[i];
			row.appendChild(cell);
		}

		this.appendChild(row);
	};

	return table;
}

function getFaIcon (iconName, title)
{
	var icon = document.createElement('i');
	icon.className = 'fa fa-' + iconName;
	if (title) icon.title = title;
	return icon;
}

function isHash (string)
{
	if (!string) return false;

	var regex = new RegExp('^[a-f0-9]{32}$', 'i');
	var result = string.match(regex);

	return result ? true : false;
}

function getMetadataString(message)
{
	var stringParts = [];

	for (var i in message)
	{
		switch (i)
		{
			case 'seqNo':
				stringParts.push('#' + message[i]);
				break;
			case 'creatorName':
				stringParts.push('by ' + message[i]);
				break;
			case 'createdDate':
				var momentDate = moment(message[i] * 1000);
				stringParts.push('@ ' + momentDate.format('DD/MM/YYYY'));
				break;
		}
	}

	return stringParts.join(' ');
}

function runDescendantsFunction (rootNode, functionName, args)
{
	if (rootNode[functionName])
	{
		rootNode[functionName].apply(rootNode, args);
	}

	for (var i in rootNode.childNodes)
	{
		if (isNaN(i)) continue;

		runDescendantsFunction(rootNode.childNodes[i], functionName, args);
	}
}

function arrayRemove (array, element)
{
	var index = array.indexOf(element);

	if (index === 1) return false;

	array.splice(index, 1);

	return true;
}

////////////////////////////////////////////////////////////////////////////////
//
//	CONDUIT FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function conduit_finaliseEntityElement (currentId, attributeObject)
{
	var elements = document.getElementsByClassName(currentId);

	for (var i in elements)
	{
		if (isNaN(i)) continue;

		var element = elements[i];

		if (!element.classPrefix) continue;

		for (var j in attributeObject)
		{
			element[j] = attributeObject[j];

			switch(j)
			{
				case 'entityId':
					element.setAttribute(j, attributeObject[j]);
					element.classList.remove(element.classPrefix + currentId);
					element.classList.add(element.classPrefix + attributeObject[j]);
					break;
			}
		}

		if (element.onfinalise)
		{
			element.onfinalise();
		}
	}
}

function conduit_renderSearchResults (searchTerm, results)
{
	var DOM = '<searchResults>';

	for (var i in results)
	{
		DOM = DOM + '<result name="' + results[i].name + '" entityId="' + results[i].id + '" />';
	}

	DOM = DOM + '</searchResults>';

	var resultWindow = getCWindow(DOM, '"' + searchTerm + '" search results', 'search');
	resultWindow.animateBoxByElement(document.getElementById('search'));

	resultWindow.focus();
}