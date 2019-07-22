<?php

//debugOutput('constants.php laoded!');

define('REQUEST_TIME', $_SERVER['REQUEST_TIME']);
define('REMOTE_ADDR', $_SERVER['REMOTE_ADDR']);

////////////////////////////////////////////////////////////////////////////////
//
//	GET VAR KEYS
//
////////////////////////////////////////////////////////////////////////////////

const GET_ROOT_ENTITY	= 'r';

////////////////////////////////////////////////////////////////////////////////
//
//	SESSION VAR KEYS
//
////////////////////////////////////////////////////////////////////////////////

const SESSION_USER	= 'u';

////////////////////////////////////////////////////////////////////////////////
//
//	DATABSE VARS
//
////////////////////////////////////////////////////////////////////////////////

const DBCONN_DB		= 'infoPlinth';
const DBCONN_UNAME	= 'root';
const DBCONN_PWORD	= 'root';

////////////////////////////////////////////////////////////////////////////////
//
//	ROOT ENTITY
//
////////////////////////////////////////////////////////////////////////////////

const ROOT_ENTITY_ID = 'befc2d9fce7a47f9f5cf7ee6ca1ecbc0';

////////////////////////////////////////////////////////////////////////////////
//
//	SYSTEM USER
//
////////////////////////////////////////////////////////////////////////////////

const TEST_USER_NAME = 'SYSTEM';
const TEST_USER_ID = '00000000000000000000000000000000';

////////////////////////////////////////////////////////////////////////////////
//
//	INPUT TYPE CONSTRAINTS
//
////////////////////////////////////////////////////////////////////////////////

// Entity
const MIN_LENGTH_ENTITY_NAME = 1;
const MAX_LENGTH_ENTITY_NAME = 100;

// UserEntity
const MIN_LENGTH_USER_DISPLAYNAME = 2;
const MAX_LENGTH_USER_DISPLAYNAME = 50;
const MIN_LENGTH_USER_PASSWORD = 8;
const MAX_LENGTH_USER_PASSWORD = 255;
const MIN_LENGTH_USER_EMAIL = 5;
const MAX_LENGTH_USER_EMAIL = 255;

////////////////////////////////////////////////////////////////////////////////
//
//	COMMENT CONTEXTS
//
////////////////////////////////////////////////////////////////////////////////

const CC_RE				= 're';
const CC_EDIT			= 'edit';
const CC_TEXT_METADATA	= 'mdt';

////////////////////////////////////////////////////////////////////////////////
//
//	MISCELLANEOUS
//
////////////////////////////////////////////////////////////////////////////////

// Time
const TIME_SECOND	= 1;
const TIME_MINUTE	= 60;
const TIME_HOUR		= 3600;
const TIME_DAY		= 86400;
const TIME_WEEK		= 604800;

////////////////////////////////////////////////////////////////////////////////
//
//	HASH FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function getHash($string = null)
{
	if (!$string)
	{
		return getRandomHash();
	}

	if (isHash($string))
	{
		return $string;
	}
	elseif (is_string($string))
	{
		return md5($string);
	}
	else
	{
		return md5(json_encode($string));
	}
}

function isHash ($string)
{
	if (!is_string($string)) return false;

	return preg_match('/^[a-f0-9]{32}$/', $string) ? true : false;
}

function getRandomHash()
{
	$chars = str_split('0123456789abcdef');

	$hash = '';

	for ($i = 0; $i < 32; $i ++)
	{
		$hash .= $chars[array_rand($chars)];
	}

	return $hash;
}