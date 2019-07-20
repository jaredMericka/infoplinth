<?php

class MetadataCommand extends Command
{
	public $name;
	public $value;
	public $type;

	public $aliases = ['md'];

	const SWITCH_DELETE = 'd';
	const SWITCH_TEXT = 't';

	public function getDescription()
	{
		return 'Set a metadata field value (or create if non-existant).';
	}

	public function getInputTypes()
	{
		return
		[
			new InputType_string('Name', 'Name of the metadata field.', false, 1, 50),
			new InputType_string('Value', 'Value of the metadata field.', true, 1, 1000),
			new InputType_option('Type', 'Type of metadata field.', true, Metadatum::METADATA_TYPES)
		];
	}

	public function run()
	{
		if ($this->on(self::SWITCH_DELETE))
		{
			$this->entity->deleteMetadata($this->name);
		}
		else if ($this->on(self::SWITCH_TEXT))
		{
			registerClientAction(CONDUIT_SET_CONTEXT, $this->entity->id, "Set metadata: {$this->name}", CC_TEXT_METADATA, $this->name);

		}
		else
		{
			if ($this->entity->setMetadata($this->name, $this->value, $this->type))
			{
				$this->entity->outputSuccess("Metadatum \"<w>{$this->name}</w>\" set to \"<w>{$this->value}</w>\"." );
				registerClientAction(CONDUIT_CLEAR_FOCUS, $this->entity->id);
				registerClientAction(CONDUIT_ADD_METADATA, $this->entity->id, $this->entity->getMetadataClientObjects());
			}
			else
			{
				$this->entity->outputWarning("Setting of metadatum \"<w>{$this->name}</w>\" to \"<w>{$this->value}</w>\" failed!");
			}
		}

	}

	public function getSwitches($switches = array())
	{
		$switches = [
			self::SWITCH_DELETE => 'Delete metadata field',
			self::SWITCH_TEXT => 'Edit text value in the input'
		];

		return parent::getSwitches($switches);
	}
}