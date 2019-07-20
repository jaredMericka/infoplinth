<?php if (false) { ?><style><?php } require './cssHeader.php';


?>

div.tabLayout
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
}

div.tabLayout_tabContainer
{
	position:absolute;
	top:0px;
	left:0px;
	right:0px;

	white-space:nowrap;
	overflow:hidden;
}

div.tabLayout_tabContentContainer
{
	position:absolute;
	bottom:0px;
	left:0px;
	right:0px;
}

/************************************************\
*	TAB
\************************************************/

div.tabLayout_tab
{
	color:<?=COL_MAIN;?>;

	display:inline-block;
	position:relative;
	padding:2px 10px 2px 10px;

	margin-top:3px;
	border-radius:8px 8px 0px 0px;
}

div.tabLayout_tab:hover
{
	background-color:<?=COL_BG;?>;
}

div.tabLayout_tab.currentTab
{
	color:#fff;

	border-bottom-style:none;
	bottom:-2px;
}

div.tabLayout_tab.currentTab
{
	background-color:inherit;
}

div.tabLayout_tabSpacer
{
	display:inline-block;
	position:relative;
	height:100%;
	width:5px;
	padding:2px 0px 2px 0px;

	border-style:none none solid none;

	/*bottom:2px;*/
}

div.tabLayout_tabSpacer.final
{
	width:100%;
}

/************************************************\
*	TAB CONTENT
\************************************************/

div.tabLayout_tab .tabLayout_tabNotification
{
	display:inline-block;
	padding-left:10px;
	opacity:0;
}

div.tabLayout_tab.notify .tabLayout_tabNotification
{
	opacity:1;
}


/************************************************\
*	TAB CONTENT
\************************************************/

div.tabLayout_tabContent
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
	display:none;
}

div.tabLayout_tabContent.currentTab
{
	display:block;
}