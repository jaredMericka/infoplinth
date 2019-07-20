
function build_tabLayout (DOM)
{
	var tabLayout = getDiv('tabLayout_container');

	var tabContainer		= getDiv('tabLayout_tabContainer');
	var tabContentContainer	= getDiv('tabLayout_tabContentContainer');

	tabLayout.appendChild(tabContainer);
	tabLayout.appendChild(tabContentContainer);

	tabLayout.contentDivs = [];
	tabLayout.tabDivs = [];

	tabLayout.selectedTab = null;

	for (var i in DOM.childNodes)
	{
		var tabNode = DOM.childNodes[i];

		if (tabNode.tagName !== 'tab') continue;

		var tabTitle = tabNode.getAttribute('title');

		if (!tabTitle) tabTitle = 'Tab ' + (i + 1);

		var tabDiv			= getDiv('tabLayout_tab border');
		var tabContentDiv	= getDiv('tabLayout_tabContent');
		var tabNotification	= getFaIcon(notificationIcon + ' tabLayout_tabNotification');

		tabDiv.tabLayout = tabLayout;

		// Sort out the tab div

		tabDiv.contentDiv = tabContentDiv;
		tabContentDiv.tabDiv = tabDiv;

		var tabSpacer = getDiv('tabLayout_tabSpacer border');
		tabSpacer.innerHTML = '&nbsp;';
		tabContainer.appendChild(tabSpacer);

		tabDiv.appendChild(document.createTextNode(tabTitle));
		tabDiv.appendChild(tabNotification);
		tabContainer.appendChild(tabDiv);

		tabLayout.contentDivs.push(tabContentDiv);
		tabLayout.tabDivs.push(tabDiv);

		// Sort out the content div

		tabContentContainer.appendChild(tabContentDiv);

		if (tabNode.firstChild)
		{
			tabContentDiv.appendChild(buildLayoutFromDOM(tabNode.firstChild));
		}

		// Tie it all together

		tabDiv.select = function ()
		{
			if (tabLayout.selectedTab)
			{
				tabLayout.selectedTab.classList.remove('currentTab');
				tabLayout.selectedTab.contentDiv.classList.remove('currentTab');
				tabLayout.selectedTab.selected = false;
			}

			tabLayout.selectedTab = this;
			this.selected = true;

			this.classList.add('currentTab');
			this.contentDiv.classList.add('currentTab');

			this.classList.remove('notify');

			if (this.contentDiv.firstChild && this.contentDiv.firstChild.onresize)
			{
				this.contentDiv.firstChild.onresize();
			}
		};

		tabDiv.onclick = function ()
		{
			this.select();
		};

		tabContentDiv.notify = function ()
		{
			if (!this.tabDiv.selected)
			{
				this.tabDiv.classList.add('notify');
			}
		};

		////////////////////////////////////////////////////////////////////////

		if (tabNode.hasAttribute('open'))
		{
			tabDiv.select();
		}
	}

	if (!tabLayout.selectedTab) tabLayout.tabDivs[0].select();

	tabLayout.onresize = function ()
	{
		tabContentContainer.style.top = tabContainer.offsetHeight + 3 + 'px';

		var content = this.selectedTab.contentDiv.firstChild;

		if (content.onresize) content.onresize();
	};

	var finalTabSpacer = getDiv('tabLayout_tabSpacer border final');
	finalTabSpacer.innerHTML = '&nbsp;';
	tabContainer.appendChild(finalTabSpacer);

	return tabLayout;
}