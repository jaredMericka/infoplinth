<?php

class EditCommand extends Command
{
	public $aliases = ['e', 'edt'];

	public $typeWhiteList =
	[
		'text'
	];

	public function getDescription()
	{

		return 'Enters Edit Mode.';
	}

	public function getInputTypes()
	{
		return [];
	}

	public function run()
	{
		switch ($this->entity->type)
		{
			case TYPE_TEXT:
				registerClientAction(CONDUIT_TEXT_ENTITY_EDIT, $this->entity->id);
				registerClientAction(CONDUIT_CLEAR_FOCUS, $this->entity->id);
				break;
		}
	}
}
