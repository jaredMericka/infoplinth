
PARTITION_MIN_SIZE = 10;

function build_partitionLayout (DOM)
{
	var container = getDiv('partition_container');

	container.isHorizontal	= DOM.getAttribute('orientation') === 'horizontal' ? true : false;

	container.contentDiv1	= getDiv('partition_1 outline');
	container.contentDiv2	= getDiv('partition_2 outline');
	container.resizeBar		= getDiv('partition_resizeBar');

	container.setAttribute('orientation', container.isHorizontal ? 'h' : 'v');

	container.resizeBar.container = container;

	var initialSplit = DOM.getAttribute('split');
	if (initialSplit)
	{
		initialSplit = parseInt(initialSplit);
	}

	if (Number.isInteger(initialSplit) && initialSplit > 0 && initialSplit < 100)
	{
		container.splitV = initialSplit;
		container.splitH = initialSplit;
	}
	else
	{
		container.splitV = 50;
		container.splitH = 50;
	}

	var canRotate = DOM.getAttribute('canRotate') === 'false' ? false : true;
	if (canRotate)
	{
		container.rotateButton	= getDiv('partition_rotateButton');
		container.rotateButton.title = 'Click to change orientation';
		container.resizeBar.appendChild(container.rotateButton);
		container.rotateButton.appendChild(getFaIcon('rotate-right'));
		container.rotateButton.onclick = function ()
		{
			container.rotate();
		};
	}


	container.resizeBar.title = 'Drag to resize';
	container.resizeBar.onmousedown = partition_resize_grab;

	container.setContent1 = function (div)
	{
		if (this.contentDiv1.firstChild)
		{
			if (this.contentDiv1.firstChild.onremove)
			{
				this.contentDiv1.firstChild.onremove();
			}

			this.contentDiv1.removeChild(this.contentDiv1.firstChild);
		}

		this.contentDiv1.appendChild(div);
	};

	container.setContent2 = function (div)
	{
		if (this.contentDiv2.firstChild)
		{
			if (this.contentDiv2.firstChild.onremove)
			{
				this.contentDiv2.firstChild.onremove();
			}

			this.contentDiv2.removeChild(this.contentDiv2.firstChild);
		}

		this.contentDiv2.appendChild(div);
	};

	container.onremove = function ()
	{
		if (this.contentDiv1.firstChild.onremove)
		{
			this.contentDiv1.firstChild.onremove();
		}

		if (this.contentDiv2.firstChild.onremove)
		{
			this.contentDiv2.firstChild.onremove();
		}
	};

	container.onresize = function ()
	{
		this.changeSplit(0);
	};

	container.rotate = function ()
	{
		if (this.getAttribute('orientation') === 'v')
		{
			this.setAttribute('orientation', 'h');
			this.isHorizontal = true;
			container.contentDiv1.style.width = 100 - container.splitH + '%';
			container.contentDiv1.style.height = '';

			container.contentDiv2.style.width = container.splitH + '%';
			container.contentDiv2.style.height = '';

			container.resizeBar.style.left = container.splitH + '%';
			container.resizeBar.style.top = null;
		}
		else
		{
			this.setAttribute('orientation', 'v');
			this.isHorizontal = false;
			container.contentDiv1.style.height = 100 - container.splitV + '%';
			container.contentDiv1.style.width = '';

			container.contentDiv2.style.height = container.splitV + '%';
			container.contentDiv2.style.width= '';

			container.resizeBar.style.top = container.splitV + '%';
			container.resizeBar.style.left = null;
		}

		this.changeSplit(0);
	};

	container.changeSplit = function (pixels)
	{
		if (this.isHorizontal)
		{
			var unit = 100 / this.offsetWidth;
			var limit = PARTITION_MIN_SIZE * unit;

			this.splitH += pixels * unit;

			if		(this.splitH < limit)		this.splitH = limit;
			else if	(this.splitH > 100 - limit)	this.splitH = 100 - limit;

			this.contentDiv1.style.width = this.splitH + '%';
			this.contentDiv2.style.width = 100 - this.splitH + '%';

			this.resizeBar.style.left = this.splitH + '%';

			this.rotateButton.style.left = '50%';
			this.rotateButton.style.top = container.splitV + '%';
		}
		else
		{
			var unit = 100 / this.offsetHeight;
			var limit = PARTITION_MIN_SIZE * unit;

			this.splitV += pixels * unit;

			if		(this.splitV < limit)		this.splitV = limit;
			else if	(this.splitV > 100 - limit)	this.splitV = 100 - limit;

			this.contentDiv1.style.height = this.splitV + '%';
			this.contentDiv2.style.height = 100 - this.splitV + '%';

			this.resizeBar.style.top = this.splitV + '%';

			this.rotateButton.style.top = '50%';
			this.rotateButton.style.left = container.splitH + '%';
		}


		if (this.contentDiv1.firstChild && this.contentDiv1.firstChild.onresize)
		{
			!this.contentDiv1.firstChild.onresize();
		}

		if (this.contentDiv2.firstChild && this.contentDiv2.firstChild.onresize)
		{
			!this.contentDiv2.firstChild.onresize();
		}
	};

	container.appendChild(container.contentDiv1);
	container.appendChild(container.contentDiv2);
	container.appendChild(container.resizeBar);

	var partition1found = false;

	for (var i in DOM.childNodes)
	{
		var partitionDOM = DOM.childNodes[i];
		if (partitionDOM.tagName !== 'partition')
		{
			// Throw error
			continue;
		}

		var content;

		if (partitionDOM.firstChild)
		{
			content = buildLayoutFromDOM(partitionDOM.firstChild);
		}

		if (content)
		{
			if (!partition1found)
			{
				container.setContent1(content);
			}
			else
			{
				container.setContent2(content);
			}
		}

		if (partition1found)
		{
			break;
		}
		else
		{
			partition1found = true;
		}
	}

	return container;
}

function partition_resize_grab (e)
{
	var container = this.container;
	var isVertical = container.getAttribute('orientation') === 'v';

	document.onmousemove = function (event)
	{
		if (isVertical)
		{
			container.changeSplit(event.movementY);
		}
		else
		{
			container.changeSplit(event.movementX);
		}
	};

	document.onmouseup = function (e)
	{
		document.onmousemove = null;
		document.onmouseup = null;
	};

	return cancelEvent(e);
}