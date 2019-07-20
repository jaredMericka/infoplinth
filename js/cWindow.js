var cWindows = [];

function getCWindow (layoutXML, titleText, iconName, fixedSize)
{
	var cWindow = document.createElement('div');
	cWindow.isCWindow = true;
	cWindow.id = getGuiHash();
	cWindow.className = 'cWindow border';
	cWindow.isFocused = false;
	cWindow.iconName = iconName		? iconName	: 'square';
	cWindow.titleText = titleText	? titleText	: '';

	cWindow.setAttribute('focused', 'false');
	cWindow.setAttribute('minimised', 'false');

	// Functions

	cWindow.onmousedown = function (e)
	{
		this.focus();
		e.cancelBubble = true;
	};

	cWindow.focus				= cWindow_focus;
	cWindow.move				= cWindow_move;
	cWindow.setTitle			= cWindow_setTitle;
	cWindow.setIcon				= cWindow_setIcon;
	cWindow.setContent			= cWindow_setContent;
	cWindow.close				= cWindow_close;
	cWindow.minimise			= cWindow_minimise;
	cWindow.maximise			= cWindow_maximise;
	cWindow.restore				= cWindow_restore;
	cWindow.setFocusState		= cWindow_setFocusState;
	cWindow.onremove			= cWindow_onremove;
	cWindow.connLost			= cWindow_connLost;
	cWindow.animateBox			= cWindow_animateBox;
	cWindow.animateBoxByElement	= cWindow_animateBoxByElement;

	// Title bar

	cWindow.titleBar = document.createElement('div');
	cWindow.titleBar.cWindow = cWindow;
	cWindow.titleBar.className = 'cWindow_titleBar';

	cWindow.titleBar.ondblclick = function (e) { cWindow.minimise(); e.cancelBubble = true; };

	cWindow.titleIcon = getFaIcon(cWindow.iconName);
	cWindow.titleBar.appendChild(cWindow.titleIcon);


	cWindow.titleLabel = getDiv('cWindow_titleLabel');
	cWindow.titleBar.appendChild(cWindow.titleLabel);

	if (titleText) cWindow.setTitle(titleText);

	cWindow.titleBar.dragging = false;
	cWindow.titleBar.onmousedown = cWindow_titleBar_onMouseDown;
	cWindow.appendChild(cWindow.titleBar);

	// Title buttons

	var buttonContainer = getDiv('cWindow_buttonContainer');
	cWindow.titleBar.appendChild(buttonContainer);

	cWindow.minimiseButton = getFaIcon('window-minimize cWindow_titleButton');
	cWindow.minimiseButton.onclick = function () { cWindow.minimise(); };
	buttonContainer.appendChild(cWindow.minimiseButton);

	cWindow.maximiseButton = getFaIcon('window-maximize cWindow_titleButton');
	cWindow.maximiseButton.onclick = function () { cWindow.maximise(); };
	buttonContainer.appendChild(cWindow.maximiseButton);

	cWindow.closeButton = getFaIcon('close cWindow_titleButton');
	cWindow.closeButton.onclick = function () { cWindow.close(); };
	buttonContainer.appendChild(cWindow.closeButton);


	// Content

	var content = parseLayout(layoutXML);

	cWindow.contentContainer = getDiv('cWindow_content outline');
	cWindow.appendChild(cWindow.contentContainer);

	cWindow.content = content;


	cWindows.push(cWindow);
	document.body.appendChild(cWindow);

	cWindow.contentContainer.style.top = (cWindow.titleBar.offsetHeight) + 'px';

	if (content)
	{
		cWindow.setContent(content);
		if (content.onresize)
		{
			content.onresize();
		}

		runDescendantsFunction (content, 'onrender');
	}

	if (!fixedSize)
	{
		cWindow.resizeHandle = getDiv('cWindow_resizeHandle');
		cWindow.resizeHandle.onmousedown = cWindow_resizeHandle_onMouseDown;
		cWindow.resizeHandle.cWindow = cWindow;
		cWindow.appendChild(cWindow.resizeHandle);
	}

	// Icon

	cWindow.iconContainer = getDiv('cWindow_iconContainer');
	cWindow.iconContainer.cWindow = cWindow;
	cWindow.icon = getFaIcon(cWindow.iconName + ' fa-3x');
	cWindow.iconLabel = getDiv('cWindow_iconLabel');

	cWindow.iconContainer.onclick = function ()
	{
		var isFocused = this.cWindow.getAttribute('focused') === 'true';
		var isMinimised = this.cWindow.getAttribute('minimised') === 'true';

		if (!isMinimised && isFocused)
		{
			this.cWindow.minimise();
		}
		else
		{
			this.cWindow.focus();
		}
	};

	cWindow.iconLabel.appendChild(getText(titleText));

	cWindow.iconContainer.appendChild(cWindow.icon);
	cWindow.iconContainer.appendChild(cWindow.iconLabel);

	cWindow_iconDiv.appendChild(cWindow.iconContainer);

	var topLimit = window.innerHeight - cWindow.offsetHeight;
	var leftLimit = window.innerWidth - cWindow.offsetWidth;

	cWindow.style.top = Math.floor(Math.random() * topLimit) + 'px';
	cWindow.style.left = Math.floor(Math.random() * leftLimit) + 'px';

	return cWindow;
}

function cWindow_focus ()
{
	this.restore();

	if (!this.isFocused)
	{
		setFocusedWindow(this);
	}
}

function cWindow_move (top, left, height, width)
{
	this.isMaximised = false;

	// Size first
	// 30 to offset the top bar, 2 to offset the window border
	var maxHeight	= window.innerHeight - 32;
	var maxWidth	= window.innerWidth - 2;

	if (!height) height	= this.clientHeight;
	if (!width) width	= this.clientWidth;

	if (height > maxHeight)	height	= maxHeight;
	if (width > maxWidth)	width	= maxWidth;

	this.style.height	= height + 'px';
	this.style.width	= width + 'px';

	// Then position
	var maxTop = window.innerHeight - this.offsetHeight;
	var maxLeft = window.innerWidth - this.offsetWidth;


	if (top === null) top		= this.offsetTop;
	if (left === null) left		= this.offsetLeft;

	if (top < 30) top	= 30;
	if (left < 0) left	= 0;

	if (top > maxTop)	top		= maxTop;
	if (left > maxLeft)	left	= maxLeft;

	this.style.top		= top + 'px';
	this.style.left		= left + 'px';
}

function cWindow_setTitle (text)
{
	this.titleText = text;
	this.titleLabel.innerHTML = '';
	this.titleLabel.appendChild(getText(text));

	if (this.iconLabel !== undefined)
	{
		this.iconLabel.innerHTML = '';
		this.iconLabel.appendChild(getText(text));
	}
}

function cWindow_setIcon (iconName)
{
	var newTitleIcon = getIcon(iconName);
	var titleIconParent = this.titleIcon.parentNode;
	titleIconParent.insertBefore(newTitleIcon, this.titleIcon);
	titleIconParent.removeChild(this.titleIcon);
	this.titleIcon = newTitleIcon;

	var newIcon = getIcon(iconName);
	var iconParent = this.icon.parentNode;
	iconParent.insertBefore(newIcon, this.icon);
	iconParent.removeChild(this.icon);
	this.icon = newIcon;
}

function cWindow_setContent (contentDiv)
{
	var refocus = false;

	if (this.isFocused)
	{
		this.setFocusState(false);
		refocus = true;
	}

	if (this.contentContainer.firstChild)
	{
		do
		{
			if (this.contentContainer.firstChild.onremove)
			{
				this.contentContainer.firstChild.onremove();
			}
			this.contentContainer.removeChild(this.contentContainer.firstChild);
		}
		while (this.contentContainer.firstChild);
	}

	this.contentContainer.appendChild(contentDiv);

	contentDiv.host = this;

	this.content = contentDiv;

	if (refocus) this.setFocusState(true);
}

function cWindow_close ()
{
	runDescendantsFunction(this, 'onremove');

//	this.onremove();
	this.setFocusState(false);
	this.iconContainer.parentNode.removeChild(this.iconContainer);
	cWindows.splice(cWindows.indexOf(this), 1);
	this.parentNode.removeChild(this);
}

function cWindow_onremove ()
{
	if (this.entityId)
	{
		delete openEntityRegistry[this.entityId];
	}
}

function cWindow_minimise ()
{
	if (this.getAttribute('minimised') === 'false')
	{

		var iconOffsets = getAbsoluteOffset(this.iconContainer);

		this.animateBox(
			this.offsetTop, this.offsetLeft,
			this.offsetHeight, this.offsetWidth,
			iconOffsets.offsetTop, iconOffsets.offsetLeft,
			this.iconContainer.offsetHeight, this.iconContainer.offsetWidth);

		this.setAttribute('minimised', 'true');
		this.iconContainer.setAttribute('minimised', 'true');
	}
}

function cWindow_maximise ()
{
	var originTop = this.offsetTop;
	var originLeft = this.offsetLeft;
	var originWidth = this.offsetWidth;
	var originHeight = this.offsetHeight;

	if (this.isMaximised)
	{
		this.move(
			this.restoreTop,
			this.restoreLeft,
			this.restoreHeight,
			this.restoreWidth
		);

		this.isMaximised = false;
	}
	else
	{
		this.restoreTop = this.offsetTop;
		this.restoreLeft = this.offsetLeft;
		this.restoreWidth = this.offsetWidth;
		this.restoreHeight = this.offsetHeight;

		this.move(0, 0, 99999, 99999);

		this.isMaximised = true;
	}

	this.animateBox (
		originTop,
		originLeft,
		originHeight,
		originWidth,
		this.offsetTop,
		this.offsetLeft,
		this.offsetHeight,
		this.offsetWidth
	);
}

function cWindow_restore ()
{
	if (this.getAttribute('minimised') === 'true')
	{
		this.setAttribute('minimised', 'false');
		this.iconContainer.setAttribute('minimised', 'false');

		var iconOffsets = getAbsoluteOffset(this.iconContainer);

		this.animateBox(
			iconOffsets.offsetTop, iconOffsets.offsetLeft,
			this.iconContainer.offsetHeight, this.iconContainer.offsetWidth,
			this.offsetTop, this.offsetLeft,
			this.offsetHeight, this.offsetWidth);
	}
}

function cWindow_setFocusState (focused)
{
	this.isFocused = focused ? true : false;

	if (focused)
	{
		cWindow_getScrollValues(this);

		this.iconContainer.setAttribute('focused', 'true');
		this.setAttribute('focused', 'true');
		this.style.zIndex = 10;
		document.body.appendChild(this);

		cWindow_setScrollValues(this);
	}
	else
	{
		this.iconContainer.setAttribute('focused', 'false');
		this.setAttribute('focused', 'false');
		this.style.zIndex = 9;
		if (this.content.onWindowBlur) this.content.onWindowBlur();
	}
}

function cWindow_titleBar_onMouseDown (e)
{
	var cWindow = this.cWindow;

	document.onmousemove = function (event)
	{
		var newTop = cWindow.offsetTop + event.movementY;
		var newLeft = cWindow.offsetLeft + event.movementX;

		cWindow.move(newTop, newLeft);
	};

	document.onmouseup = function (event)
	{
		document.onmousemove = null;
		document.onmouseup = null;
	};
}

function cWindow_resizeHandle_onMouseDown (e)
{
	cWindow = this.cWindow;

	document.onmousemove = function (e)
	{
		var newHeight = cWindow.clientHeight + e.movementY;
		var newWidth = cWindow.clientWidth + e.movementX;

		cWindow.move(null, null, newHeight, newWidth);

		if (cWindow.content.onresize) cWindow.content.onresize();

		cancelEvent(e);
	};

	document.onmouseup = function (event)
	{
		document.onmousemove = null;
	};

	cancelEvent(e);
	return true;
}

function cWindow_connLost ()
{
	this.onremove();
	if (this.content) this.content.parentNode.removeChild(this.content);
	this.content = getDiv('static');
	this.contentContainer.appendChild(this.content);
}

function setFocusedWindow (cWindow)
{
	for (var i in cWindows)
	{
		cWindows[i].setFocusState(cWindows[i] === cWindow);
	}
}

function openEntity (entityId, originElementId)
{
	if (openEntityRegistry[entityId])
	{
		openEntityRegistry[entityId].focus();
	}
	else
	{
		OpenEntityHandler(entityId, originElementId);
	}
}

function displayInWindow (content, title, iconName)
{
	var contentDiv = getDiv('cWindow_basicContent');
	contentDiv.beforeFocus	= function () { this.contentScollTop = this.scrollTop; };
	contentDiv.afterFocus	= function () { this.scrollTop = this.contentScollTop; };
	contentDiv.innerHTML	= content;

	var window = getCWindow(contentDiv, title, iconName);
	window.focus();
}

function getCWindowByChild (element)
{
	do
	{
		if (element.isCWindow) return element;

		element = element.parentNode;
	}
	while (element && element !== document.body);

	return null;
}

////////////////////////////////////////////////////////////////////////////////
//
//	ANIMATION EFFECTS
//
////////////////////////////////////////////////////////////////////////////////

function cWindow_animateBox (originTop, originLeft, originHeight, originWidth, destTop, destLeft, destHeight, destWidth)
{
	if (animationBox) return;

	var animationBox = getDiv('cWindow_animationBox');

	animationBox.style.top		= originTop		+ 'px';
	animationBox.style.left		= originLeft	+ 'px';
	animationBox.style.height	= originHeight	+ 'px';
	animationBox.style.width	= originWidth	+ 'px';

	document.body.appendChild(animationBox);

	var destString = 'top:' + destTop + 'px;left:' + destLeft + 'px;height:' + destHeight + 'px;width:' + destWidth + 'px;';

	setTimeout(function ()
	{
		animationBox.setAttribute('style', destString);
	}, 10);

	setTimeout(function ()
	{
		animationBox.parentNode.removeChild(animationBox);
		animationBox = null;
	}, 300);
}

function cWindow_animateBoxByElement (element)
{
	var offset = getOffsets(element);

	this.animateBox(
			offset.top,
			offset.left,
			element.offsetHeight,
			element.offsetWidth,
			this.offsetTop,
			this.offsetLeft,
			this.offsetHeight,
			this.offsetWidth
		);
}

function cWindow_getScrollValues (element)
{
	element._scrollTop = element.scrollTop;

	for (var i in element.childNodes)
	{
		if (isNaN(i)) continue;

		cWindow_getScrollValues(element.childNodes[i]);
	}
}

function cWindow_setScrollValues (element)
{
	element.scrollTop = element._scrollTop;

	for (var i in element.childNodes)
	{
		if (isNaN(i)) continue;

		cWindow_setScrollValues(element.childNodes[i]);
	}
}

defaultEntityXML =
	'<drawer location="left" title="Navigator" open="false">' +
		'<treeView id="##" />' +
	'</drawer>' +
	'<partitionLayout split="65">' +
		'<partition>' +
			'<partitionLayout orientation="horizontal" split="70">' +
				'<partition>' +
					'<tabLayout>' +
						'<tab title="Feed">' +
							'<entityFeed id="##"/>' +
						'</tab>' +
//						'<tab title="Output">' +
//							'<entityOutput id="##"/>' +
//						'</tab>' +
						'<tab title="Metadata">' +
							'<entityMetadata id="##"/>' +
						'</tab>' +
					'</tabLayout>' +
				'</partition>' +
				'<partition>' +
					'<entityOutput id="##"/>' +
				'</partition>' +
			'</partitionLayout>' +
		'</partition>' +
		'<partition>' +
			'<entityInput id="##"/>' +
		'</partition>' +
	'</partitionLayout>';

openEntityRegistry = {};

function conduit_openEntity (entityId, title, icon, originElementId)
{
	var cWindowXML = defaultEntityXML.split('##').join(entityId);
	var entityWindow = getCWindow(cWindowXML, title, icon);
	var originElement = document.getElementById(originElementId);

	if (originElement)
	{
		entityWindow.animateBoxByElement(originElement);
	}

	entityWindow.entityId = entityId;
	entityWindow.focus();

	openEntityRegistry[entityId] = entityWindow;
}

function conduit_createCwindow (DOM, title, icon)
{
	getCWindow(DOM, title, icon);
}

function conduit_renderHtmlInCwindow (HTML, title, icon)
{
	var cWindow = getCWindow('<text></text>', title, icon);

	cWindow.content.innerHTML = HTML;
	cWindow.content.classList.add('html');

	cWindow.focus();
}