<?php

class FinaliseEntityElementHandler extends Handler
{
	public $i_elementClassName;
//	public $i_prefix;	// This is the prefix that is applied to the element's id.

	public function run ()
	{
		$entityId = explode('_', $this->i_elementClassName, 2)[1]; // Get that prefix off.
		$entityId = getHash($entityId);

		$entity = new Entity($entityId);

		$returnObject = new stdClass();

		$returnObject->entityId		= $entity->id;
		$returnObject->entityName	= $entity->name;
		$returnObject->entityType	= $entity->_type;
		$returnObject->isGhost		= $entity->_isGhost;
		$returnObject->incomplete	= $entity->_incomplete;

		registerClientAction(CONDUIT_FINALISE_ENTITY_ELEMENT, $this->i_elementClassName, $returnObject);
	}
}