<?php

////////////////////////////////////////////////////////////////////////////////
//
//	ERROR HANDLER AND DEBUG
//
////////////////////////////////////////////////////////////////////////////////

function errorHandler ($errno, $errstr, $errfile, $errline)
{
    $errfile = basename($errfile);

	$errmess = "<rh> SYSTEM ERROR {$errno} </rh>\n";
    $errmess .= "<r>{$errfile}</r> - [<r>{$errline}</r>]:\n{$errstr}\n\n";

    foreach(debug_backtrace(null, 10) as $level => $trace)
    {
		if (!$level) continue;

		$function	= isset($trace['function'])	? $trace['function']			: '';
		$line		= isset($trace['line'])		? "[<w>{$trace['line']}</w>]"	: '';
		$file		= '';
		$class		= isset($trace['class'])	? $trace['class']				: '';
		$object		= isset($trace['object'])	? get_class($trace['object'])	: '';
		$type		= isset($trace['type'])		? "<r>{$trace['type']}</r>"		: '';
		$args		= '';

		if (isset($trace['args']))
		{
				foreach ($trace['args'] as $arg)
				{
						if (is_object($arg)) $args .= get_class($arg) . ', ';
						elseif (is_array($arg)) $args .= 'array, ';
						else $args .= $arg . ', ';
				}
				$args = "({$args})";
		}

		if (isset($trace['file']))
		{
				$file = $trace['file'];
//				$file = explode('infoPlinth', $trace['file'])[1];
				$file = trim($file, '\\/');
				$file = "<r>{$file}</r>";
		}

		$errmess .= "[{$level}]\t{$file}\t{$line}:\t{$object} {$class}{$type}{$function}{$args};\n";
    }

//	$errmess = htmlspecialchars($errmess);

	if (is_callable('registerClientAction'))
	{
		registerClientAction(CONDUIT_ERROR_OUTPUT, $errmess);
	}

    return true;
}

set_error_handler('errorHandler', E_ALL);

function debugOutput ($message, $tag = null)
{
	if (is_object($message) || is_array($message))
	{
		ob_start();
		var_dump($message);
		$message = ob_get_clean();
	}

	if ($tag) $message = "<{$tag}>{$message}</{$tag}>";

	if (is_callable('registerClientAction'))
	{
		registerClientAction(CONDUIT_DEBUG_OUTPUT, $message);
	}
}

////////////////////////////////////////////////////////////////////////////////
//
//	AUTOLOADER
//
////////////////////////////////////////////////////////////////////////////////

function autoloader ($name)
{
	switch ($name)
	{
		case 'Entity':
		case 'Metadatum':
		case 'Comment':
			$path = ROOT_PATH . "server/dataObjects/Entity.php";
			break;

		default:
			if (substr($name, -6) === 'Entity')
			{
				$path = ROOT_PATH . "server/dataObjects/entities/{$name}.php";
			}
			elseif (substr($name, -7) === 'Command')
			{
				$path = ROOT_PATH . "server/commands/{$name}.php";
			}
			else
			{
				$path = ROOT_PATH . "server/dataObjects/{$name}.php";
			}
			break;
	}


	if (isset($path) && is_file($path)) require $path;
}

spl_autoload_register('autoloader');

////////////////////////////////////////////////////////////////////////////////
//
//	NAME GENERATOR
//
////////////////////////////////////////////////////////////////////////////////

function getRandomName ()
{
	$sylables = mt_rand(2, 4);

	$word = '';

	for ($s = 1; $s <= $sylables; $s++)
	{
		$word = appendSylable($word);
	}

	return ucwords($word);
}

function appendSylable (& $word)
{
	$consts_start	= str_split('bcdfghjklmnprstvwz');
	$consts	= str_split('bcdfghjklmnprstvwxyz');
	$vowels	= str_split('aeiou');

	$first = $word === '';

	// [Add this letter] => [if this letter is last]
	$nextLetterKey = [
		'r' => str_split('bcdfgkpt'),
		'h' => str_split('scg'),
		'l' => str_split('bcfgks'),
		'y' => str_split('eo')
	];

	$lastLetter = substr($word, -1, 1);

	if (mt_rand(0,3) || in_array($lastLetter, $vowels))	$word .= ar($first ? $consts_start : $consts);

	if (mt_rand(0,2))
	{
		$lastLetter = substr($word, -1, 1);
		$nextLetters = [];

		foreach ($nextLetterKey as $nextLetter => $lastLetters)
		{
			if (in_array($lastLetter, $lastLetters))
			{
				$nextLetters[] = $nextLetter;
			}
		}

		if ($nextLetters) $word .= ar($nextLetters);
	}

	$word .= ar($vowels);

	return $word;
}

////////////////////////////////////////////////////////////////////////////////
//
//	ARRAY HELPER FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function ar ($array) { return $array[array_rand($array)]; }

function array_align ($array, $separator = '')
{
	$longestKey = 0;
	$newArray = [];

	foreach ($array as $key => $val)
	{
		$keyLength = strlen("{$key}");

		if ($keyLength > $longestKey)
		{
			$longestKey = $keyLength;
		}
	}

	$longestKey ++;

	foreach ($array as $key => $val)
	{
		$newArray[str_pad($key, $longestKey, ' ') . $separator] = $val;
	}

	return $newArray;
}

////////////////////////////////////////////////////////////////////////////////
//
//	PASSWORD / CRYPTO
//
////////////////////////////////////////////////////////////////////////////////

function hashPassword ($password, $salt = null)
{
	$salt = $salt ? $salt : getHash();

	return crypt($password, $salt);
}

function matchPassword ($password, $hash)
{
	return crypt($password, $hash) === $hash;
}

////////////////////////////////////////////////////////////////////////////////
//
//	GLOBAL FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function setCurrentUser (UserEntity $userEntity)
{
	global $user;

	$user = $userEntity;

	$_SESSION[SESSION_USER] = $userEntity;

	registerClientAction(CONDUIT_SET_USER_DETAILS, $user->getClientUser());
}