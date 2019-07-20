<?php if (false) { ?><style><?php } require './cssHeader.php'; ?>


/************************************************\
*
*	COLOUR TAGS
*
\************************************************/


<?php

	foreach ($COLs as $key => $COL)
	{
		echo "{$key}h, .{$key}h { background-color:{$COL}; color:#000; font-weight:bold; }\n";
		echo "{$key}u, .{$key}u { border-bottom-width:2px; border-bottom-style:solid; border-bottom-color:{$COL}; }\n";
		echo "{$key}, .{$key} { color:{$COL}; }\n";
	}

?>

/************************************************\
*
*	SPECIAL TAGS
*
\************************************************/

/************************************************\
*	RAINBOW
\************************************************/

rb, .rb
{
	color:#f88;
	animation-name:rb;
	animation-duration:3s;
	/*animation-direction:normal;*/
	animation-iteration-count:infinite;
}

@keyframes rb
{
	0%	{ color:<?=COL_R?>; }
	17%	{ color:<?=COL_Y?>; }
	33%	{ color:<?=COL_G?>; }
	50%	{ color:<?=COL_C?>; }
	67%	{ color:<?=COL_B?>; }
	83%	{ color:<?=COL_M?>; }
	100%{ color:<?=COL_R?>; }
}

rbh, .rbh
{
	color:#000;
	font-weight:bold;
	background-color:#f88;
	animation-name:rbh;
	animation-duration:3s;
	animation-iteration-count:infinite;
}

@keyframes rbh
{
	0%	{ background-color:<?=COL_R?>; }
	17%	{ background-color:<?=COL_Y?>; }
	33%	{ background-color:<?=COL_G?>; }
	50%	{ background-color:<?=COL_C?>; }
	67%	{ background-color:<?=COL_B?>; }
	83%	{ background-color:<?=COL_M?>; }
	100%{ background-color:<?=COL_R?>; }
}

rbu, .rbu
{
	border-bottom-color:#f88;
	border-bottom-width:2px;
	border-bottom-style:solid;
	animation-name:rbu;
	animation-duration:3s;
	animation-iteration-count:infinite;
}

@keyframes rbu
{
	0%	{ border-bottom-color:<?=COL_R?>; }
	17%	{ border-bottom-color:<?=COL_Y?>; }
	33%	{ border-bottom-color:<?=COL_G?>; }
	50%	{ border-bottom-color:<?=COL_C?>; }
	67%	{ border-bottom-color:<?=COL_B?>; }
	83%	{ border-bottom-color:<?=COL_M?>; }
	100%{ border-bottom-color:<?=COL_R?>; }
}

/************************************************\
*	SHIVER
\************************************************/

sv, .sv
{
	position:relative;
	animation-name:sv;
	animation-duration:0.5s;
	animation-direction:alternate;
	animation-iteration-count:infinite;
}

.sv .sv,
sv sv,
.sv sv,
sv .sv
{
	animation:none;
}

@keyframes sv
{
	0%	{ top:-2px; left:1px ; }
	10%	{ top:1px; }
	20%	{ top:-2px; }
	30%	{ top:2px; left:-1px;}
	40%	{ top:-1px; }
	50%	{ top:1px; }
	60%	{ top:-2px; left:1px;}
	70%	{ top:2px; }
	80%	{ top:-1px; }
	90%	{ top:2px;  left:-1px; }
	100%{ top:-1px; }
}

