<?php

class GetMetadataHandler extends Handler
{
	public $i_entityId;

	protected function run()
	{
		$entity = new Entity($this->i_entityId);

		registerClientAction(CONDUIT_ADD_METADATA, $entity->id, $entity->getMetadataClientObjects());
	}
}