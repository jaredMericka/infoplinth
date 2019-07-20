<?php if (false) { ?><style><?php } require './cssHeader.php'; ?>

div.treeView
{
	height:100%;
	width:100%;
	overflow:auto;
}

div.treeView_scrollDiv
{
	display:inline-block;
	min-width:100%;
}

div.treeView_div
{

}

div.treeView_rowDiv
{
	position:relative;

	transition-property:background-color;
	transition-duration:0.1s;
}

div.treeView_rowDiv:hover
{
	background-color:<?=COL_BG?>;
}

div.treeView_rowContentDiv
{
	display:inline-block;
	position:relative;
	padding-right:30px;
}

.treeView_rowContentDiv .treeView_entityIcon
{
	position:absolute;

	font-size:20px;

	top:3px;
	left:23px;
}

.treeView_rowDiv[focused='true']
{
	background-color:<?=COL_MAIN?>;
	color:#000;
	font-weight:bold;
}

.treeView_rowDiv[focused='true']:hover
{
	background-color:#fff;
}

.treeView_rowDiv[focused='true'] .treeView_expander
{
	border-color:#000;
}


div.treeView_label
{
	line-height:26px;
	height:26px;
	margin-left:53px;
	cursor:pointer;
	white-space:pre;
}

div.treeView_label:hover
{
	text-decoration:underline;
}

div.treeView_childContainer
{
	display:none;
	/*margin-left:20px;*/
}

i.treeView_expander
{
	position:absolute;

	height:10px;
	width:10px;

	top:8px;
	left:5px;

	color:#000;

	cursor:pointer;
}

div.treeView .fa
{
	color:<?=COL_MAIN?>;
}