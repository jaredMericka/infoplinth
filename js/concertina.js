
function build_concertina (DOM)
{
	var concertina = getDiv('concertina');

	concertina.headerHeight	= null;
	concertina.bodyHeight	= null;

	concertina.sections = new Array();

	concertina.openSectionIndex = null;

	for (var i in DOM.childNodes)
	{
		var sectionNode = DOM.childNodes[i];
		if (sectionNode.tagName !== 'section')
		{
			// Throw error
			continue;
		}

		var section = getConcertinaSection(concertina);

		var title = sectionNode.getAttribute('title');
		if (!title) title = 'Section ' + (i + 1);

		section.setTitle(title);

		concertina.sections.push(section);
		concertina.appendChild(section);

		if (sectionNode.hasAttribute('open'))
		{
			concertina.openSectionIndex = i;
		}

		if (sectionNode.firstChild)
		{
			section.setContent(buildLayoutFromDOM(sectionNode.firstChild));
		}
	}

	concertina.onresize = function ()
	{
		this.setHeights();

		if (this.sections[this.openSectionIndex])
		{
			var openSection = this.sections[this.openSectionIndex];
			openSection.open();
		}
	};

	concertina.setHeights = function ()
	{
		this.headerHeight = this.sections[0].header.offsetHeight;
		this.bodyHeight = this.offsetHeight - (this.sections.length * this.headerHeight);
	};

	return concertina;
}

function getConcertinaSection (concertina)
{
	var section			= getDiv('concertina_section');

	section.header		= getDiv('concertina_header outline');
	section.contentDiv	= getDiv('concertina_contentDiv');
//	section.headerLabel	= getDiv('concertina_headerLabel');

	section.appendChild(section.header);
	section.appendChild(section.contentDiv);
//	section.header.appendChild(section.headerLabel);

	section.setTitle = function (titleText)
	{
		this.header.innerHTML = titleText;
	};

	section.setContent = function (contentDiv)
	{
		if (this.contentDiv.firstChild)
		{
			this.contentDiv.removeChild(this.contentDiv.firstChild);
		}

		this.contentDiv.appendChild(contentDiv);
	};

	section.onremove = function ()
	{
		if (this.contentDiv.firstChild.onremove)
			this.contentDiv.onremove();
	};

	section.open = function ()
	{
		concertina.setHeights();

		for (var i in concertina.sections)
		{
			concertina.sections[i].close();
			if (concertina.sections[i] === this)
			{
				concertina.openSectionIndex = i;
			}
		}
		this.setAttribute('open', 'true');

		this.contentDiv.style.height = concertina.bodyHeight + 'px';
	};

	section.close = function ()
	{
		this.setAttribute('open', 'false');
		this.contentDiv.style.height = '0px';
	};

	section.close();

	section.header.onclick = function ()
	{
		concertina.classList.add('animate');

		if (section.getAttribute('open') === 'true')
		{
			section.close();
			concertina.openSectionIndex = null;
		}
		else
		{
			section.open();
		}

		setTimeout(function () { concertina.classList.remove('animate'); }, 300);
	};

	return section;
}
