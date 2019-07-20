
DRAWER_TOP		= 'top';
DRAWER_BOTTOM	= 'bottom';
DRAWER_LEFT		= 'left';
DRAWER_RIGHT	= 'right';

DRAWER_MAX_SIZE	= 40;	// Percentage
DRAWER_MIN_SIZE	= 10;	// Pixels

function build_drawer (DOM)
{
	var title		= DOM.getAttribute('title');
	var location	= DOM.getAttribute('location');
	var isOpen		= DOM.getAttribute('open') === 'false' ? false : true;

	if (location)
	{
		location = location.toLowerCase();
		if ([DRAWER_TOP, DRAWER_BOTTOM, DRAWER_LEFT, DRAWER_RIGHT].indexOf(location) === -1)
		{
			location = 'left';
		}
	}

	var drawer = getDiv('drawer ' + location + ' outline');

	drawer.location			= location;
	drawer.resizeBar		= getDiv('drawer_resizeBar');
	drawer.controls			= getDiv('drawer_controls');
	drawer.contentContainer	= getDiv('drawer_contentContainer');

	if (!title) title = ' ';

	drawer.label = getDiv('drawer_label');
	drawer.controls.appendChild(drawer.label);
	drawer.label.appendChild(getText(title));

	drawer.contentContainer	= getDiv('drawer_contentContainer');

	drawer.isShut		= false;

	drawer.appendChild(drawer.resizeBar);
	drawer.appendChild(drawer.controls);
	drawer.appendChild(drawer.contentContainer);

	drawer.resizeBar.drawer			= drawer;
	drawer.resizeBar.onmousedown	= drawer_resize_grab;

	drawer.drawerHeight = 20;
	drawer.drawerWidth = 20;

	drawer.setContent = function (contentDiv)
	{
		if (this.contentContainer.firstChild)
		{
			runDescendantsFunction(this.contentContainer.firstChild, 'onremove');
		}
		this.contentContainer.appendChild(contentDiv);

		contentDiv.host = this;

		this.content = contentDiv;
	};

	drawer.resize = function (pixels)
	{
		switch (this.location)
		{
			case DRAWER_BOTTOM:
				pixels = 0 - pixels;
			case DRAWER_TOP:
				var unit = 100 / this.parentNode.offsetHeight;
				this.drawerHeight += pixels * unit;

				var minSize = unit * DRAWER_MIN_SIZE;

				if (this.drawerHeight > DRAWER_MAX_SIZE) this.drawerHeight = DRAWER_MAX_SIZE;
				if (this.drawerHeight < minSize) this.drawerHeight = minSize;

				this.style.height = this.drawerHeight + '%';

				break;

			case DRAWER_RIGHT:
				pixels = 0 - pixels;
			case DRAWER_LEFT:
				var unit = 100 / this.parentNode.offsetWidth;
				this.drawerWidth += pixels * unit;

				var minSize = unit * DRAWER_MIN_SIZE;

				if (this.drawerWidth > DRAWER_MAX_SIZE) this.drawerWidth = DRAWER_MAX_SIZE;
				if (this.drawerWidth < minSize) this.drawerWidth = minSize;

				this.style.width = this.drawerWidth + '%';

				break;
		}

		if (this.content && this.content.onresize)
		{
			this.content.onresize();
		}
	};

	drawer.toggleShut = function ()
	{
		this.classList.add('animate');

		if (this.isShut)
		{
			switch (this.location)
			{
				case DRAWER_TOP:
				case DRAWER_BOTTOM:
					this.style.height = this.drawerHeight + '%';
					break;

				case DRAWER_LEFT:
				case DRAWER_RIGHT:
					this.style.width = this.drawerWidth + '%';
					break;
			}
			this.setAttribute('shut', 'false');
		}
		else
		{
			switch (this.location)
			{
				case DRAWER_TOP:
				case DRAWER_BOTTOM:
					this.style.height = '0px';
					break;

				case DRAWER_LEFT:
				case DRAWER_RIGHT:
					this.style.width = '0px';
					break;
			}
			this.setAttribute('shut', 'true');
		}

		var that = this;
		setTimeout(function () { that.classList.remove('animate'); }, 300 );

		this.isShut = !this.isShut;
	};

	drawer.onresize = function ()
	{
		if (this.content && this.content.onresize)
		{
			this.content.onresize();
		}
	};

	drawer.onrender = function ()
	{
		switch (this.location)
		{
			case 'top':
			case 'bottom':
				this.controls.style.marginLeft = 0 - this.controls.offsetWidth / 2 + 'px';
				break;

			case 'left':
			case 'right':
				this.controls.style.marginTop = 0 - this.controls.offsetHeight / 2 + 'px';
				break;
		}
	};

	drawer.controls.onclick = function ()
	{
		drawer.toggleShut();
	};

	if (!isOpen) drawer.toggleShut();

	if (DOM.firstChild)
	{
		drawer.setContent(buildLayoutFromDOM(DOM.firstChild));
	}

	return drawer;
}

function drawer_resize_grab (e)
{
	var drawer = this.drawer;

	document.onmousemove = function (event)
	{
		switch(drawer.location)
		{
			case DRAWER_TOP:
			case DRAWER_BOTTOM:
				drawer.resize(event.movementY);
				break;

			case DRAWER_LEFT:
			case DRAWER_RIGHT:
				drawer.resize(event.movementX);
				break;
		}
	};

	document.onmouseup = function (e)
	{
		document.onmousemove = null;
		document.onmouseup = null;
	};

	return cancelEvent(e);
}