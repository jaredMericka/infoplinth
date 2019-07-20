<?php const ROOT_PATH = '../';

require ROOT_PATH . 'server/system/include.php';

$handlersDir = ROOT_PATH . 'server/handlers/';
$files = scandir($handlersDir);

foreach ($files as $file)
{
	if ($file[0] === '.') continue;

	include $handlersDir . $file;

	$className = explode('.', $file)[0];

	$class = new $className;

	$class->getJS();
}