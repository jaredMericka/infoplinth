<?php

class DeleteCommand extends Command
{
	const SWITCH_RECURSIVE = 'r';

	public $aliases = ['del'];

	public function getInputTypes()
	{
		return [];
	}

	public function getDescription()
	{
		return 'Deletes the current entity. Child entities will become orphans.';
	}

	public function run ()
	{
		// TODO: handle the recursive switch
		$this->entity->deleted = true;
		$this->entity->dbUpdate();

		registerClientAction(CONDUIT_CLEAR_FOCUS, $this->entity->id);
		registerClientAction(CONDUIT_CONN_LOST, $this->entity->id);
	}

	public function getSwitches($switches = array())
	{
		$switches = [
			self::SWITCH_RECURSIVE => 'Recursively deletes all descendant entities.'
		];

		return parent::getSwitches($switches);
	}
}