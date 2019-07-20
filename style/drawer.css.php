<?php if (false) { ?><style><?php } require './cssHeader.php';

const DRAWER_CONTROLS_LENGTH = 60;
const DRAWER_CONTROLS_WIDTH = 15;

?>

/************************************************\
*	DRAWERS
\************************************************/

div.drawer
{
	position:absolute;

	background-color:#000;

	top:0px;
	bottom:0px;
	left:0px;
	right:0px;

	opacity:0.6;

	transition-property:opacity;
	transition-duration:0.1s;

	z-index:10;
}

div.drawer:hover
{
	opacity:0.95;
	box-shadow:<?=CSS_SHADOW?>;
}

div.drawer.top		{ bottom:auto; }
div.drawer.bottom	{ top:auto; }
div.drawer.left		{ right:auto; }
div.drawer.right	{ left:auto; }

div.drawer.top,
div.drawer.bottom
{
	height:20%;
}

div.drawer.left,
div.drawer.right
{
	width:20%;
}

/************************************************\
*	CONTENT CONTAINER
\************************************************/

div.drawer_contentContainer
{
	position:absolute;
	width:100%;
	height:100%;
	min-width:100px;
	min-height:100px;
	overflow:hidden;
}

div.drawer.top>		div.drawer_contentContainer { bottom:0px; }
div.drawer.bottom>	div.drawer_contentContainer { top:0px; }
div.drawer.left>	div.drawer_contentContainer { right:0px; }
div.drawer.right>	div.drawer_contentContainer { left:0px; }

/************************************************\
*	RESIZE BAR
\************************************************/

div.drawer>div.drawer_resizeBar
{
	position:absolute;
	z-index:10;
}

div.drawer[shut='true']>div.drawer_resizeBar
{
	display:none;
}

div.drawer.top>div.drawer_resizeBar,
div.drawer.bottom>div.drawer_resizeBar
{
	width:100%;
	height:<?=RESIZE_BAR_WIDTH?>px;
	left:0px;
	right:0px;
	margin-top:-<?=RESIZE_BAR_WIDTH/2?>px;

	cursor:ns-resize;
}

div.drawer.left>div.drawer_resizeBar,
div.drawer.right>div.drawer_resizeBar
{
	height:100%;
	width:<?=RESIZE_BAR_WIDTH?>px;
	top:0px;
	bottom:0px;

	cursor:ew-resize;
	/*cursor:col-resize;*/
}

div.drawer.top>div.drawer_resizeBar
{
	bottom:0px;
	margin-bottom:-<?=RESIZE_BAR_WIDTH/2?>px;
}

div.drawer.bottom>div.drawer_resizeBar
{
	top:0px;
	margin-top:-<?=RESIZE_BAR_WIDTH/2?>px;
}

div.drawer.left>div.drawer_resizeBar
{
	right:0px;
	margin-right:-<?=RESIZE_BAR_WIDTH/2?>px;
}

div.drawer.right>div.drawer_resizeBar
{
	left:0px;
	margin-left:-<?=RESIZE_BAR_WIDTH/2?>px;
}

/************************************************\
*	CONTROLS
\************************************************/

div.drawer_controls
{
	color:#000;
	font-weight:bold;

	position:absolute;
	background-color:<?=COL_MAIN?>;

	/*height:<?=DRAWER_CONTROLS_LENGTH?>px;*/
	/*width:<?=DRAWER_CONTROLS_WIDTH?>px;*/

	transition-property:height, width;
	transition-duration:0.2s;

	overflow:hidden;
	cursor:pointer;
}

div.drawer.top>div.drawer_controls,
div.drawer.bottom>div.drawer_controls
{
}

div.drawer.top[shut='true']>div.drawer_controls,
div.drawer.bottom[shut='true']>div.drawer_controls,
div.drawer.top:hover>div.drawer_controls,
div.drawer.bottom:hover>div.drawer_controls
{
	/*height:<?=DRAWER_CONTROLS_WIDTH?>px;*/
}

div.drawer.left>div.drawer_controls,
div.drawer.right>div.drawer_controls
{
	/*height:<?=DRAWER_CONTROLS_LENGTH?>px;*/
	/*width:0px;*/

	writing-mode:vertical-rl;
}

div.drawer.left[shut='true']>div.drawer_controls,
div.drawer.right[shut='true']>div.drawer_controls,
div.drawer.left:hover>div.drawer_controls,
div.drawer.right:hover>div.drawer_controls
{
	/*width:<?=DRAWER_CONTROLS_WIDTH?>px;*/
}

div.drawer.left>div.drawer_controls
{
	left:100%;
	border-radius:0px <?=DRAWER_CONTROLS_WIDTH/2?>px <?=DRAWER_CONTROLS_WIDTH/2?>px 0px;
}

div.drawer.right>div.drawer_controls
{
	right:100%;
	border-radius:<?=DRAWER_CONTROLS_WIDTH/2?>px 0px 0px <?=DRAWER_CONTROLS_WIDTH/2?>px;
}

div.drawer.top>div.drawer_controls
{
	top:100%;
	border-radius:0px 0px <?=DRAWER_CONTROLS_WIDTH/2?>px <?=DRAWER_CONTROLS_WIDTH/2?>px;
}

div.drawer.bottom>div.drawer_controls
{
	bottom:100%;
	border-radius:<?=DRAWER_CONTROLS_WIDTH/2?>px <?=DRAWER_CONTROLS_WIDTH/2?>px 0px 0px;
}

div.drawer.right>div.drawer_controls,
div.drawer.left>div.drawer_controls
{
	top:50%;
}

div.drawer.top>div.drawer_controls,
div.drawer.bottom>div.drawer_controls
{
	left:50%;
}

div.drawer.left>div.drawer_controls>div.drawer_label,
div.drawer.right>div.drawer_controls>div.drawer_label
{
	margin:10px 1px;
}

div.drawer.top>div.drawer_controls>div.drawer_label,
div.drawer.bottom>div.drawer_controls>div.drawer_label
{
	margin:1px 10px;
}

div.drawer.animate
{
	transition-property:height, width;
	transition-duration:0.3s;
}