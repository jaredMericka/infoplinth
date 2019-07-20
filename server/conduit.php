<?php const ROOT_PATH = '../';

////////////////////////////////////////////////////////////////////////////////
//
//	REQUIREMENTS
//
////////////////////////////////////////////////////////////////////////////////

require ROOT_PATH . 'server/system/include.php';

////////////////////////////////////////////////////////////////////////////////
//
//	REGISTER SYSTEM FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

spl_autoload_register('conduitAutoloader');
register_shutdown_function('encodeResponse');

////////////////////////////////////////////////////////////////////////////////
//
//	PROCESS CONDUIT PAYLOAD
//
////////////////////////////////////////////////////////////////////////////////

if (!isset($_POST['p'])) DIE('Conduit payload missing.');

$clientActions = [];
$payload = json_decode($_POST['p']);

if (!$payload)
{
	DIE('Payload structure invalid.');
}

foreach ($payload as $component)
{
	if (!isset($component->h, $component->i))
	{
		var_dump($component);
		/* Some kind of error handling code */ continue;
	}

	$handlerName = ucfirst(strtolower($component->h));

	$handler = new $handlerName($component->i);
}

////////////////////////////////////////////////////////////////////////////////
//
//	CORE FUNCTIONALITY
//
////////////////////////////////////////////////////////////////////////////////

function conduitAutoloader ($className)
{
	$classPaths = [
		'handlers',
		'dataObjects',
	];

	foreach ($classPaths as $classPath)
	{
		$path = "{$classPath}/{$className}.php";

		if (is_file($path))
		{
			require $path;
		}
		else
		{
			// Handler missing error
		}
	}
}

function registerClientAction ($CONDUIT /* $arg1, $arg2, $arg3... */)
{
	$args = func_get_args();

	$CONDUIT = array_shift($args);
	global $clientActions;

	$clientAction = new clientAction ($CONDUIT, $args);
	$clientActions[] = $clientAction;
}

class clientAction
{
	public $method;
	public $params;

	public function __construct($method, $params)
	{
		if (!is_array($params)) $params = [$params];

		$this->method = $method;
		$this->params = $params;
	}
}

function encodeResponse ()
{
	global $clientActions;

	echo json_encode($clientActions, JSON_NUMERIC_CHECK);
}

