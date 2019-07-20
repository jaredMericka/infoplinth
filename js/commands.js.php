<?php if (false) { ?><script><?php } const ROOT_PATH = '../';

require ROOT_PATH . 'server/system/include.php';

$commandsDir = ROOT_PATH . 'server/commands/';

$commandFiles = scandir($commandsDir);

$commandObjects = new stdClass();
$commandNames = [];

$clientCommandJs = '';

$aliases = [];

foreach ($commandFiles as $fileName)
{
	if ($fileName[0] === '.') continue;
	if ($fileName[0] === '_') continue;

	require $commandsDir . $fileName;

	$className = explode('.', $fileName)[0];

	$commandName = str_replace('Command', '', $className);
	$commandName_lc = strtolower($commandName);
	$commandNames[$commandName_lc] = $commandName;

	$command = new $className;

	$commandObjects->$commandName_lc = $command->getJsObject();

	if ($command instanceof ClientCommand)
	{
		$clientCommandJs .= $command->getClientJs();
	}

	foreach ($command->aliases as $alias)
	{
		$aliases[$alias] = $commandName_lc;
	}
}

echo "var commandObjects =\n" . json_encode($commandObjects, JSON_PRETTY_PRINT) . ";\n\n";
echo "var commandNames =\n" . json_encode($commandNames, JSON_PRETTY_PRINT) . ";\n\n";
echo "var commandAliases =\n" . json_encode($aliases, JSON_PRETTY_PRINT) . ";\n\n";
echo $clientCommandJs;