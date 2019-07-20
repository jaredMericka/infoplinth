<?php

header('Content-type: text/css');
header('Cache-Control: must-revalidate');
$offset = 72000 ;
$ExpStr = "Expires: " . gmdate('D, d M Y H:i:s', time() + $offset) . ' GMT';
header($ExpStr);

$colour = '#ffcc00';
//$colour = '#88aa55';
//$colour = '#906090';
//$colour = '#888888';
//$colour = '#66aaff';
//$colour = '#44cc22';
//$colour = '#ff2222';

$colour = trim($colour, '#');

$r = hexdec($colour[0] . $colour[1]);
$g = hexdec($colour[2] . $colour[3]);
$b = hexdec($colour[4] . $colour[5]);

define('COL_MAIN_R', $r);
define('COL_MAIN_G', $g);
define('COL_MAIN_B', $b);

define('COL_MAIN', getCol());
define('COL_BG', getCol(0.3));

define('CSS_BORDER', '1px solid ' . COL_MAIN);
define('CSS_BORDER_2', '2px solid ' . COL_MAIN);

define('CSS_SHADOW', '0px 0px 30px -5px ' . COL_MAIN);

function getCol($brightness = null, $opacity = null)
{
	$brightness = $brightness ? $brightness : 1;
	$opacity = $opacity ? $opacity : 1;

	$opacity = $brightness;
	$brightness = 1;

	$r = ceil(max([min([COL_MAIN_R * $brightness, 255]), 0]));
	$g = ceil(max([min([COL_MAIN_G * $brightness, 255]), 0]));
	$b = ceil(max([min([COL_MAIN_B * $brightness, 255]), 0]));

	$a = max([min([$opacity, 255]), 0]);

	return "rgba({$r},{$g},{$b},{$a})";
}

const COL_R		= '#f77';
const COL_G		= '#7f7';
const COL_B		= '#77f';
const COL_C		= '#7ff';
const COL_Y		= '#ff7';
const COL_M		= '#f7f';

const COL_K		= '#666';
const COL_W		= '#fff';

$COLs = [
	'r' => COL_R,
	'g' => COL_G,
	'b' => COL_B,
	'c' => COL_C,
	'y' => COL_Y,
	'm' => COL_M,
	'k' => COL_K,
	'w' => COL_W,
];

const RESIZE_BAR_WIDTH = 6;