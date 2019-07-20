<?php

class FinaliseInputHandler extends Handler
{
	public $i_entityId;

	public function run ()
	{
		$entityId = getHash($this->i_entityId);

		$entity = new Entity($entityId);

		$returnObject = new stdClass();

		$returnObject->entityId		= $entity->id;
		$returnObject->isGhost		= $entity->_isGhost;
		$returnObject->incomplete	= $entity->_incomplete;

		registerClientAction(CONDUIT_FINALISE_INPUT, $this->i_entityId, $returnObject);
	}
}