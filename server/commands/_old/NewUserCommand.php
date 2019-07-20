<?php

class NewUserCommand extends Command
{
	public $aliases = ['nu', 'nuser'];

	const SWITCH_ORPHAN = 'o';

//	public $name;
	public $displayName;
	public $password;
	public $confirmPassword;
	public $emailAddress;

	public function getDescription()
	{
		return 'Creates a new User Entity as a child of the current Entity.';
	}

	public function getSwitches($switches = array())
	{
		$switches = [
			self::SWITCH_ORPHAN => 'Create User Entity as orphan entity',
		];

		return parent::getSwitches($switches);
	}

	public function getInputTypes()
	{
		return
		[
//			new InputType_string(
//				'Name',
//				'Unique name for the Entity, used when logging in (cannot be changed).',
//				false, MIN_LENGTH_ENTITY_NAME, MAX_LENGTH_ENTITY_NAME),

			new InputType_string(
				'Display Name',
				'Unique display name (can be changed).',
				false, MIN_LENGTH_USER_DISPLAYNAME, MAX_LENGTH_USER_DISPLAYNAME),

			new InputType_string(
				'Password',
				'Password for the user account.',
				false, MIN_LENGTH_USER_PASSWORD, MAX_LENGTH_USER_PASSWORD, null, true),

			new InputType_string(
				'Confirm Password',
				'Confirm the password for the user account.',
				false, MIN_LENGTH_USER_PASSWORD, MAX_LENGTH_USER_PASSWORD, null, true),

			new InputType_string(
				'Email Address',
				'Email address to associate with the user.',
				true, MIN_LENGTH_USER_EMAIL, MAX_LENGTH_USER_EMAIL, null), // Attach regex pattern here
		];
	}

	public function run ()
	{
		$parentId = $this->on(self::SWITCH_ORPHAN) ? null : $this->entity->id;

		$userEntity = UserEntity::create
		(
			$parentId,
			$this->displayName,
			$this->password,
			0,
			$this->emailAddress
		);

		if ($userEntity === false)
		{
			$this->entity->output('User entity could not be created.');
		}
		else
		{
			$this->entity->output("User entity \"{$userEntity->name}\" created successfully!");
			registerClientAction(CONDUIT_CLEAR_FOCUS, $this->entity->id);
		}
	}
}