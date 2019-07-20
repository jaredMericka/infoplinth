<?php

class GetTreeViewEntitiesHandler extends Handler
{
	public $i_parentId;

	protected function run ()
	{
		$parentEntity = new Entity($this->i_parentId);

		$parentEntity->populateChildren();
		$entities = $parentEntity->_children;

		foreach ($entities as &$entity)
		{
			$entity = $entity->getClientObject();
		}

		registerClientAction(CONDUIT_ALLOCATE_TREE_VIEW_ENTITIES, $entities);
	}
}