<?php if (false) { ?><style><?php }

require './cssHeader.php';

const IO_PADDING = 3;

?>

/******************************************************************************\
*
*	INPUT
*
\******************************************************************************/

/************************************************\
*	LAYOUT
\************************************************/

div.entityInput_inputControls
{
	position:absolute;
	bottom:0px;
	left:0px;
	right:0px;

	height:50%;

	transition-property:height;
	transition-duration:0.2s;
}

div.entityInput_commandHelpContainer
{
	position:absolute;
	top:0px;
	left:0px;
	right:0px;

	height:50%;

	transition-property:height;
	transition-duration:0.2s;

	overflow:auto;
}

/************************************************\
*	INPUT
\************************************************/

div.entityInput div.entityInput_display,
div.entityInput textarea
{
	white-space:pre-wrap;
	word-break:break-all;
	line-break:strict;
	font-family:inherit;
	font-size:inherit;

	border:none;
	padding:0px;
	margin:0px;

	overflow-y:scroll;
	overflow-x:hidden;
}


div.entityInput div.entityInput_display
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
	/*padding:5px;*/
	padding:<?=IO_PADDING?>px;
}

div.entityInput_taContainer
{
	position:absolute;
	top:<?=IO_PADDING?>px;
	bottom:<?=IO_PADDING?>px;
	left:<?=IO_PADDING?>px;
	right:<?=IO_PADDING?>px;
/*	top:5px;
	bottom:5px;
	left:5px;
	right:5px;*/
}

div.showContext div.entityInput_taContainer
{
	top:<?=IO_PADDING + 19?>px;
}

div.showContext div.entityInput_display
{
	padding-top:<?=IO_PADDING + 19?>px;
}

div.entityInput textarea
{
	opacity:0;
	height:100%;
	width:100%;
}

div.entityInput[focused='true'] div.entityInput_display
{
	box-shadow: 0px 0px 30px -5px <?=COL_MAIN?> inset;
}

div.entityInput div.entityInput_context
{
	position:absolute;

	background-color:<?=COL_MAIN;?>;
	color:#000;
	font-weight:bold;

	height:15px;
	padding:2px 10px 2px 2px;

	z-index:5;

	transition-property:height, padding, top;
	transition-duration:0.2s;

	overflow:visible;

	border-bottom-right-radius:3px;
}

div.entityInput div.entityInput_contextClear
{
	font-size:18px;
	position:absolute;
	color:<?=COL_MAIN;?>;
	top:-4px;
	right:-14px;
	cursor:pointer;
}

div.entityInput div.entityInput_contextClear:hover
{
	color:#fff;
}

/************************************************\
*	SUBMIT
\************************************************/

div.entityInput_submit
{
	font-weight:bold;

	position:absolute;
	width:30px;
	height:25px;
	bottom:10px;
	right:10px;
	background-color:<?=COL_MAIN?>;
	color:#000;
	text-align:center;

	cursor:pointer;

	transition-property:background-color;
	transition-duration:0.1s;

	border-radius:5px;
	font-size:17px;
	padding-top:5px;
}

div.entityInput_submit:hover
{
	background-color:#fff;
}

span.entityInput_submitLabel
{
	display:block;
	position:absolute;
	top:30%;
	text-align:center;
	width:100%;
}

/************************************************\
*	TOOLTIP
\************************************************/

div.entityInput_commandHelp
{
	white-space:pre-wrap;
	padding:8px;
}

span.entityInput_commandListItem
{
	display:inline-block;
	width:10em;
}

/************************************************\
*	CARET
\************************************************/

div.entityInput[focused='true'] .caret
{
	background-color:#fff;
	color:#000;

	outline-style:solid;

	animation-name:caret;
	animation-duration:0.5s;
	animation-direction:alternate;
	animation-iteration-count:infinite;
}

@keyframes caret
{
	0%, 40%
	{
		background-color:#fff;
		color:#000;
		outline-width:0px;
	}

	60%, 100%
	{
		background-color:#000;
		color:#fff;
		outline-width:1px;
		outline-color:#fff;
	}
}

/************************************************\
*	SELECTION
\************************************************/

div.entityInput[focused='true'] .sel { background-color:#444;}
div.entityInput[focused='false'] .sel { background-color:#222; }

/******************************************************************************\
*
*	OUTPUT
*
\******************************************************************************/

.content,
.entityFeed,
.entityOutput,
.entityMetadata
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
	padding:<?=IO_PADDING?>px;

	overflow:auto;
}

/************************************************\
*	MESSAGES
\************************************************/

.entityFeed_comment,
.entityOutput_outputMessage
{
	white-space:pre-wrap;
	margin-bottom:1em;
}

.entityFeed_commentBody,
.entityOutput_outputBody
{

}

.entityFeed_commentMetadata,
.entityOutput_outputMetadata
{
	text-align:right;
}

.entityFeed_commentName
{
	display:inline-block;
}

/******************************************************************************\
*
*	METADATA
*
\******************************************************************************/

table,
.entityMetadata_table
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
	width:100%;

	border:none;
	border-collapse:collapse;
}

th,
.entityMetadata_table th
{
	color:#000;
	background-color:<?=COL_MAIN?>;
	font-weight:bold;

}

th:hover,
.entityMetadata_table th:hover
{
	background-color:#fff;
}

td,
.entityMetadata_table td
{
	padding:0px 10px 0px 3px;
}

.entityMetadata_table td.entityMetadata_badgeCell
{
	padding:0px;
	text-align:right;
}

tr:hover td,
.entityMetadata_table tr:hover td
{
	background-color:<?=COL_BG?>;
}