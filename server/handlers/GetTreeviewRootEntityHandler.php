<?php

class GetTreeViewRootEntityHandler extends Handler
{
	public $i_sourceTreeViewId;
	public $i_entityId;

	protected function run ()
	{
		$entity = new Entity($this->i_entityId);

		$entity = $entity->getClientObject();


		registerClientAction(CONDUIT_ALLOCATE_TREE_VIEW_ROOT_ENTITY, $this->i_sourceTreeViewId, $entity);
	}
}