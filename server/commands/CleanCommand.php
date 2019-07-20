<?php

class CleanCommand extends Command
{
	public $aliases = ['cln'];

	public function getDescription()
	{
		return 'Cleans up the database.';
	}

	public function getInputTypes()
	{
		return [];
	}

	public function run()
	{
		$deletedRecords = 0;

		$query = 'SELECT id, type FROM entity WHERE NOT type = \'\'';
		$params = [];

		$results = dbConn::query($query, $params);

		foreach ($results as $result)
		{
			$tableName = $result['type'] . 'entity';

			$query = "SELECT id FROM {$tableName} WHERE id = :id";
			$params = [':id' => $result['id']];

			if (!DbConn::query($query, $params, true))
			{
				$query = "DELETE FROM entity WHERE id = :id";
				$params = [':id' => $result['id']];

				DbConn::query($query, $params, true);

				$deletedRecords++;
			}
		}

		$this->entity->output("<ru>Database cleanup complete!</ru>\n<g>{$deletedRecords}</g> record removed.");
	}
}