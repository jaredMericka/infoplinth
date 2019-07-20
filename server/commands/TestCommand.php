<?php

class TestCommand extends Command
{
	var $typeWhiteList = ['entity'];
	
	public $accountType;
	public $username;
	public $password;
	public $level1;
	public $level2;
	public $level3;
	public $level4;

	public function getDescription()
	{
		return 'A test command to test various command features. This command will not be available in the final product.';
	}

	public function getInputTypes()
	{
		return [
			new InputType_option(
				'Account Type',
				'Type of account.',
				false, ['user', 'mod', 'admin']),

			new InputType_string(
				'Username',
				'Username to be associated with the account.',
				false, 3, 20, null, false),

			new InputType_string(
				'Password',
				'Password for the account.',
				false, 8, null, null, true),

			new InputType_number(
				'Level',
				'Account level.',
				false, 10, 100)
		];
	}

	public function run ()
	{
		$strings = [];
		foreach (get_object_vars($this) as $var => $val)
		{
			if (!is_scalar($val)) $val = json_encode($val, JSON_PRETTY_PRINT);

			$tag = $val ? 'b' : 'k';

			$strings[] = "{$var}:\t<{$tag}>{$val}</{$tag}>";
		}
		$this->entity->output(implode("\n", $strings));
	}
}