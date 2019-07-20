<?php

class FinaliseOutputHandler extends Handler
{
	public $i_entityId;

	public function run ()
	{
		$entityId = getHash($this->i_entityId);

		$entity = new Entity($entityId);

		$returnObject = new stdClass();

		$returnObject->entityId		= $entity->id;
		$returnObject->entityName	= $entity->name;
		$returnObject->isGhost		= $entity->_isGhost;
		$returnObject->incomplete	= $entity->_incomplete;

		registerClientAction(CONDUIT_FINALISE_OUTPUT, $this->i_entityId, $returnObject);
	}
}