<?php

class OpenEntityHandler extends Handler
{
	public $i_entityId;
	public $i_originElementId; // For animating the box

	public function run ()
	{
		$entity = new Entity($this->i_entityId);

		registerClientAction(CONDUIT_OPEN_ENTITY, $entity->id, $entity->name, 'cube', $this->i_originElementId);
	}
}