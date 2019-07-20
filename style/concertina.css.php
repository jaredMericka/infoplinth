<?php if (false) { ?><style><?php } require './cssHeader.php';


?>

div.concertina
{
	position:absolute;
	height:100%;
	width:100%;
}

/************************************************\
*	HEADER
\************************************************/

div.concertina_header
{
	position:relative;
	/*height:30px;*/
	color:#fff;

	text-align:center;
	padding:0.2em 0em 0.4em 0em;

	white-space:nowrap;
	overflow:hidden;
}

div.concertina_section[open='false']>div.concertina_header:hover
{
	background-color:<?=COL_BG;?>;
}

div.concertina_section[open='true']>div.concertina_header
{
	background-color:<?=COL_MAIN;?>;
	font-weight:bold;
	color:#000;
}

div.concertina_section[open='true']>div.concertina_header:hover
{
	background-color:#fff;
}


/************************************************\
*	BODY
\************************************************/

div.concertina div.concertina_contentDiv
{
	position:relative;
	overflow:hidden;
}

div.concertina.animate div.concertina_contentDiv
{
	transition-property:height;
	transition-duration:0.2s;
}

div.concertina_section[open='true']>div.concertina_contentDiv
{
	/*height:0px;*/
}

div.concertina_section[open='false']>div.concertina_contentDiv
{
	/*display:none;*/
}
