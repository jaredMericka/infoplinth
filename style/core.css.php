<?php if (false) { ?><style><?php } require './cssHeader.php'; ?>

@font-face { font-family:SourceCodePro;	src:url('fonts/SourceCodePro-Regular.otf'); }
@font-face { font-family:SourceCodePro;	src:url('fonts/SourceCodePro-Semibold.otf'); font-weight:bold; }
/*@font-face { font-family:SourceCodePro;	src:url('fonts/SourceCodePro-Black.otf'); font-weight:bolder; }*/

html,
body
{
	position:fixed;
	background-color:#080808;
	/*background-color:#000;*/
	color:#fff;
	font-family:SourceCodePro;
	font-size:12px;
	padding:0px;
	margin:0px;

	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
}

hr
{
	border:<?=CSS_BORDER?>;
	margin:1em 10%;
}

input
{
	font-family:inherit;
	font-size:inherit;
	color:inherit;
	background-color:inherit;
	border:none;
}

input:focus
{
	border:none;
	box-shadow:none;
}

.pointer
{
	cursor:pointer;
}

#debug
{
	white-space:pre;
}

b { font-weight:normal; }

/*#area_input
{
	position:fixed;
	bottom:0px;
	left:0px;
	right:0px;
	height:200px;

	border:1px solid green;
}*/

.outline
{
	outline-style:solid;
	outline-color:<?=COL_MAIN?>;
	outline-width:2px;
	outline-offset:-1px;
}

.border
{
	border-style:solid;
	border-color:<?=COL_MAIN?>;
	border-width:2px;
}

.layoutContainer
{
	height:100%;
	width:100%;
}

/************************************************\
*
*	MAIN HEADER
*
\************************************************/

#mainHeader
{
	position:absolute;
	top:0px;
	right:0px;
	left:0px;
	height:30px;

	background-color:<?=COL_MAIN?>;
	color:#000;
}

#headerTitle
{
	top:3px;
	left:20px;

	position:absolute;
	font-size:16px;
	font-weight:bold;
}

/********** SEARCH **********/

#search
{
	position:absolute;

	top:6px;
	right:6px;

	background-color:#000;
	color:<?=COL_MAIN?>;
	border-radius:100px;
}

#search .fa
{
	margin-left:5px;
}

#searchInput
{
	color:#fff;
	margin-right:10px;
}

/************************************************\
*
*	MAIN BODY
*
\************************************************/

#mainBody
{
	position:absolute;
	top:30px;
	bottom:0px;
	left:0px;
	right:0px;
}

/************************************************\
*
*	MISC ELEMENTS
*
\************************************************/

.static
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;

	background-color:<?=COL_BG?>;
	background-image:url('images/noise.png');
	background-size:500px;

	border:<?=CSS_BORDER?>;

	animation-name:static;
	animation-duration:1s;
	animation-direction:normal;
	animation-iteration-count:infinite;
	animation-timing-function:linear;

	color:<?=COL_MAIN?>;
	text-align:center;

	overflow:hidden;
	/*font-size:1.5em;*/

	text-shadow:0px 0px 10px <?=COL_MAIN?>;
	padding:10%;
}

.static hr
{
	box-shadow:0px 0px 10px <?=COL_MAIN?>;
}

@keyframes static
{
	0%	{ background-position:0% 0%; }
	20%	{ background-position:1000% 1000%; }
	40%	{ background-position:-382% 221%; }
	60%	{ background-position:616% -490%; }
	80%	{ background-position:-29% 241%; }
	100%{ background-position:987% -952%; }
}

/************************************************\
*
*	SCROLL BAR
*
\************************************************/

*::-webkit-scrollbar
{
	width:4px;
	height:4px;
}

*::-webkit-scrollbar-button
{
	height:0px;
	width:0px;
}

*::-webkit-scrollbar
{
	background-color:#000;
}

*::-webkit-scrollbar-button
{
	background-color:#000;
}

*::-webkit-scrollbar-track
{
	background-color:#000;
}

*::-webkit-scrollbar-track-piece
{
	background-color:<?=COL_BG?>;

}

*::-webkit-scrollbar-thumb
{
	background-color:<?=COL_MAIN?>;
}

*::-webkit-resizer
{
	/*border:<?=CSS_BORDER?>;*/
	/*background-color:<?=COL_MAIN?>;*/
}

/************************************************\
*
*	ERROR HANDLING
*
\************************************************/

.debug_debugOutput,
.debug_errorOutput
{
	/*border:<?=CSS_BORDER?>;*/
	white-space:pre;
	overflow-y:auto;

	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;

	/*padding:3px;*/
}

.debug_debugOutput>div,
.debug_errorOutput>div
{
	margin:3px;
}