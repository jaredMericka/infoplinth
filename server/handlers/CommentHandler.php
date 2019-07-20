<?php

class CommentHandler extends Handler
{
	public $i_entityId;
	public $i_input;
	public $i_contextInfo;

	public $entity;

	protected function run ()
	{
		$this->entity = new Entity($this->i_entityId);

		switch ($this->i_contextInfo->context)
		{
			case null:
				$this->comment($this->i_input);
				break;

			case CC_RE:
				$this->comment($this->i_input, $this->i_contextInfo->data);
				break;

			case CC_TEXT_METADATA:
				$mdName = $this->i_contextInfo->data;
				$mdValue = $this->i_input;

				if ($this->entity->setMetadata($mdName, $mdValue, Metadatum::METADATUM_TYPE_TEXT))
				{
					$this->entity->outputSuccess("Metadatum \"<w>{$mdName}</w>\" set to \"<w>{$mdValue}</w>\"." );
					registerClientAction(CONDUIT_CLEAR_FOCUS, $this->entity->id);
					registerClientAction(CONDUIT_ADD_METADATA, $this->entity->id, $this->entity->getMetadataClientObjects());
				}
				else
				{
					$this->entity->outputWarning("Setting of metadatum \"<w>{$mdName}</w>\" to \"<w>{$mdValue}</w>\" failed!");
				}

				break;

			default:
				trigger_error("Unrecognised comment context \"{$this->i_contextInfo->context}\".");
				break;
		}

		registerClientAction(CONDUIT_CLEAR_FOCUS, $this->i_entityId);
	}

	private function comment ($body, $re = null)
	{
		if (!$body)
		{
			$this->entity->output('<r>Empty comment!</r>');
			return;
		}

		$this->entity->comment($body, $re);
	}
}