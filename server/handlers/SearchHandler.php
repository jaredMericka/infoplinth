<?php

class SearchHandler extends Handler
{
	public $i_searchTerm;

	protected function run()
	{
		if (!$this->i_searchTerm)
		{
			return;
		}

		$query	= 'SELECT id, name'
				. ' FROM entity'
				. ' WHERE id LIKE concat("%", :term, "%")'
				. ' OR name LIKE concat("%", :term, "%")'
				;

		$params = [
			':term' => $this->i_searchTerm
		];

		$results = DbConn::query($query, $params);

		registerClientAction(CONDUIT_RENDER_SEARCH_RESULTS, $this->i_searchTerm, $results);
	}
}