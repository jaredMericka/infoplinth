<?php

session_start();

//if (isset($_SESSION[SESSION_USER]) && ($_SESSION[SESSION_USER] instanceof UserEntity))
if (isset($_SESSION[SESSION_USER]))
{
	$user = $_SESSION[SESSION_USER];
}
else
{
	$user = new stdClass();

	$user->name = 'UserName';
	$user->displayName = 'DisplayName';
	$user->id	= '00000000000000000000000000000000';

	$_SESSION[SESSION_USER] = $user;
}