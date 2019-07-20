<?php if (false) { ?><style><?php } require './cssHeader.php';

const ROTATE_BUTTON_SIZE = 15;

?>

/************************************************\
*	PARTITIONS
\************************************************/

div.partition_typeDiv
{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
}

div.partition_container
{
	position:absolute;
	height:100%;
	width:100%;
}

div.partition_1,
div.partition_2
{
	position:absolute;
	overflow:hidden;
}

div.partition_container[orientation='v']>div.partition_1,
div.partition_container[orientation='v']>div.partition_2
{
	height:50%;
	left:0px;
	right:0px;
}

div.partition_container[orientation='v']>div.partition_1 { top:0px; }
div.partition_container[orientation='v']>div.partition_2 { bottom:0px; }

div.partition_container[orientation='h']>div.partition_1,
div.partition_container[orientation='h']>div.partition_2
{
	width:50%;
	top:0px;
	bottom:0px;
}

div.partition_container[orientation='h']>div.partition_1 { left:0px; }
div.partition_container[orientation='h']>div.partition_2 { right:0px; }

/****************************\
*	CONTROLS
\****************************/

div.partition_resizeBar
{
	position:absolute;
}

div.partition_container[orientation='v']>div.partition_resizeBar
{
	top:50%;

	width:100%;
	height:<?=RESIZE_BAR_WIDTH?>px;
	left:0px;
	right:0px;
	margin-top:-<?=RESIZE_BAR_WIDTH/2?>px;

	cursor:ns-resize;
	/*cursor:row-resize;*/
}

div.partition_container[orientation='h']>div.partition_resizeBar
{
	left:50%;

	height:100%;
	width:<?=RESIZE_BAR_WIDTH?>px;
	top:0px;
	bottom:0px;
	margin-left:-<?=RESIZE_BAR_WIDTH/2?>px;

	cursor:ew-resize;
	/*cursor:col-resize;*/
}

div.partition_resizeBar>div.partition_rotateButton
{
	position:absolute;
	background-color:<?=COL_MAIN?>;
	color:#000;
	border-radius:100px;
	top:50%;
	left:50%;

	height:0px;
	width:0px;
	font-size:0px;

	margin-left:0px;
	margin-top:0px;

	transition-property:height,width,margin-top,margin-left,font-size;
	transition-duration:0.2s;
	text-align:center;
}

div.partition_resizeBar>div.partition_rotateButton>.fa
{
	margin-top:2px;
	cursor:pointer;
}

div.partition_resizeBar:hover>div.partition_rotateButton
{
	height:<?=ROTATE_BUTTON_SIZE?>px;
	width:<?=ROTATE_BUTTON_SIZE?>px;
	margin-left:-<?=ROTATE_BUTTON_SIZE/2?>px;
	margin-top:-<?=ROTATE_BUTTON_SIZE/2?>px;
	font-size:12px;
}