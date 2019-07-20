
function parseLayout (xml)
{
	xml = '<layout>' + xml + '</layout>';

	var layoutContainer = getDiv('layoutContainer');

	var parser = new DOMParser();

	var parsedXML = parser.parseFromString(xml, 'text/xml');

	var layoutDOM = parsedXML.firstChild;

	for (var i in layoutDOM.childNodes)
	{
		if (isNaN(i)) continue;
		layoutContainer.appendChild(buildLayoutFromDOM(layoutDOM.childNodes[i]));
	}

	layoutContainer.onresize = function ()
	{
		for (var i in this.childNodes)
		{
			if (isNaN(i)) continue;

			if (this.childNodes[i].onresize)
			{
				this.childNodes[i].onresize();
			}
		}
	};

	layoutContainer.onremove = function ()
	{
		for (var i in this.childNodes)
		{
			if (isNaN(i)) continue;

			if (this.childNodes[i].onremove)
			{
				this.childNodes[i].onremove();
			}
		}
	};

	return layoutContainer;
}

function buildLayoutFromDOM (DOM)
{
	var functionName = 'build_' + DOM.tagName;

	if (typeof window[functionName] === 'function')
	{
		var buildFunction = window[functionName];

		var layout = buildFunction (DOM);
	}
	else
	{
		layout = getDiv('static');
		layout.innerHTML = '<i class="fa fa-warning"></i><br>ERROR<hr>Unkonwn layout component "' + DOM.tagName + '".';
	}

	return layout;
}