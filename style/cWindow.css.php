<?php if (false) { ?><style><?php } require './cssHeader.php'; ?>

.cWindow
{
	position:absolute;
	/*resize:both;*/

	/*max-width:95%;*/
	/*max-height:95%;*/

	min-height:200px;
	min-width:300px;

	height:50%;
	width:50%;

	top:100px;
	left:100px;

	border:<?=CSS_BORDER?>;

	background-color:#000;
	overflow:hidden;

	transition-property:opacity, background-color;
	transition-duration:0.1s;
}

.cWindow[focused='true']
{
	opacity:0.95;
	box-shadow:<?=CSS_SHADOW?>;
}

.cWindow[focused='false']
{
	opacity:0.6;
}

.cWindow[focused='false']:hover
{
	opacity:0.8;
}

.cWindow[minimised='false']
{
	display:block;
}

.cWindow[minimised='true']
{
	display:none;
}

/************************************************\
*
*	TITLE BAR
*
\************************************************/

.cWindow .cWindow_titleBar
{
	position:absolute;
	top:0px;
	left:0px;
	right:0px;

	border:<?=CSS_BORDER?>;

	height:1em;

	background-color:<?=COL_BG?>;

	padding:0.2em 1em 0.4em 0.2em;
}

.cWindow[focused='true'] .cWindow_titleBar
{
	background-color:<?=COL_MAIN?>;
	color:#000;
	font-weight:bold;
}

.cWindow[focused='false'] .cWindow_titleBar
{
	/*background-color:<?=COL_BG?>;*/
	background-color:#000;
}

.cWindow .cWindow_titleLabel
{
	position:absolute;
	top:2px;
	bottom:0px;
	left:2em;
	right:50px;
	overflow:hidden;
}

.cWindow .cWindow_titleBar .icon
{
	height:1.2em;
	width:1.2em;
}

/************************************************\
*	BUTTONS
\************************************************/

.cWindow_buttonContainer
{
	font-size:12px;
	position:absolute;
	top:3px;
	bottom:0px;
	right:0px;
	width:50%;
	text-align:right;
	/*vertical-align:top;*/
}

.cWindow_titleButton
{
	display:inline-block;

	padding-right:3px;
	padding-left:5px;

	cursor:pointer;
	vertical-align:top;
}

/************************************************\
*
*	CONTENT
*
\************************************************/

.cWindow .cWindow_content
{
	position:absolute;
	left:0px;
	right:0px;
	bottom:0px;
	overflow:hidden;
}

.cWindow .cWindow_content .html
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
	white-space:pre-wrap;
	overflow:auto;
	padding:3px;
	height:auto;
	width:auto;
}


/************************************************\
*
*	FOOTER
*
\************************************************/

.cWindow .cWindow_resizeHandle
{
	position:absolute;
	bottom:-12px;
	right:-12px;

	background-color:<?=COL_MAIN?>;
	border:<?=CSS_BORDER?>;
	border-width:2px;

	height:20px;
	width:20px;

	cursor:se-resize;

	transform:rotate(45deg);

	z-index:100;
}

.cWindow .cWindow_resizeHandle:hover
{
	background-color:#fff;
}

/************************************************\
*
*	ICON
*
\************************************************/

.cWindow_iconContainer
{
	display:inline-block;
	text-align:center;
	/*height:50px;*/
	/*width:60px;*/
	padding:10px;

	cursor:pointer;

	transition-property:background-color;
	transition-duration:0.1s;

}

.cWindow_iconContainer:hover
{
	background-color:<?=COL_BG?>;
}

.cWindow_iconContainer[focused='true']
{
	background-color:<?=COL_MAIN?>;
	color:#000;
	font-weight:bold;
}

.cWindow_iconContainer[focused='true']:hover
{
	background-color:#fff;
}


.cWindow_iconContainer .icon
{
	display:inline-block;
	height:30px;
	width:30px;
}

.cWindow_iconContainer .cWindow_iconLabel
{
	white-space:pre;
	overflow:hidden;
	width:70px;
}

.cWindow_iconContainer:hover .cWindow_iconLabel
{
	text-decoration:underline;
}

.cWindow_animationBox
{
	position:fixed;
	background-color:transparent;
	border:<?=CSS_BORDER_2;?>;

	z-index:999999;

	transition-property:top, left, height, width;
	transition-duration: 0.3s;
	transition-timing-function:linear;
	mouse-events:none;
}

/************************************************\
*
*	BASIC CONTENT
*
\************************************************/

.basicContent,
.cWindow_basicContent
{
	border:<?=CSS_BORDER?>;
	white-space:pre-wrap;
	overflow:auto;

	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;

	padding:5px;
}