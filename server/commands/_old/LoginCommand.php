<?php

class LoginCommand extends Command
{
	public $aliases = ['l', 'lgn', 'in'];

	const SWITCH_EMAIL = 'e';

	public $login;
	public $password;

	public function getDescription()
	{
		return 'Log into infoPlinth using an existing User Entity.';
	}

	public function getInputTypes()
	{
		return
		[
			new InputType_string(
				'Login',
				'Login criteria (defaults to entity ID).',
				false, 1, 255),

			new InputType_string(
				'Password',
				'Password for the user account.',
				false, MIN_LENGTH_USER_PASSWORD, MAX_LENGTH_USER_PASSWORD, null, true),
		];
	}

	public function run()
	{
		if ($this->on(self::SWITCH_EMAIL))
		{
			$displayName	= null;
			$email			= $this->login;
		}
		else
		{
			$displayName	= $this->login;
			$email			= null;
		}

		$result = UserEntity::login($this->password, $displayName, $email);

		if ($result instanceof UserEntity)
		{
			$this->entity->output("Welcome back, <y>{$result->displayname}</y>!");
		}
		if (is_string($result))
		{
			$result = "<rh> Login failed: </rh> {$result}";
			$this->entity->output($result, 'r');
		}
	}

	public function getSwitches($switches = array())
	{
		$switches = [
			self::SWITCH_EMAIL => 'Log in using an email address.',
		];

		return parent::getSwitches($switches);
	}
}