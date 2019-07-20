<?php

class NewCommand extends Command
{
	public $type;
	public $name;

	public $aliases = ['n'];

	const SWITCH_ORPHAN = 'o';

	public function getDescription()
	{
		return 'Create a new entity as a child of the current entity.';
	}

	public function getInputTypes()
	{
		return
		[
			new InputType_string(
				'Name',
				'Name of the entity.',
				true, MIN_LENGTH_ENTITY_NAME, MAX_LENGTH_ENTITY_NAME, null, false),
		];
	}

	public function run()
	{
		$entity = new Entity();
		$entity->parentId = $this->on(self::SWITCH_ORPHAN) ? null : $this->entity->id;

		if ($this->name)
		{
			$entity->name = $this->name;
		}

		if ($entity->dbCreate())
		{
			$this->entity->outputSuccess("Entity \"<w>{$entity->name}</w>\" created successfully!");
			registerClientAction(CONDUIT_ALLOCATE_TREE_VIEW_ENTITIES, [$entity->getClientObject()]);
			registerClientAction(CONDUIT_CLEAR_FOCUS, $this->entity->id);
		}
		else
		{
			$this->entity->outputError("Creation of entity \"<w>{$entity->name}</w>\" failed!");
		}
	}

	public function getSwitches($switches = array())
	{
		$switches = [
			self::SWITCH_ORPHAN => 'Create Entity as orphan entity',
		];

		return parent::getSwitches($switches);
	}
}