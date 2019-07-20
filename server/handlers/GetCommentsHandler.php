<?php

class GetCommentsHandler extends Handler
{
	public $i_entityId;
	public $i_last;

	protected function run ()
	{
		$entity = new Entity($this->i_entityId);

		$comments = $entity->getComments($this->i_last);

		registerClientAction(CONDUIT_APPEND_COMMENTS, $this->i_entityId, $comments);
	}
}