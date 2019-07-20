<?php

////////////////////////////////////////////////////////////////////////////////
//
//	DBCONN
//
//	Connect to the database and facilitate interaction with it.
//
////////////////////////////////////////////////////////////////////////////////

class DbConn
{
	static private $connection;

	private static function getConn ()
	{
		if (!self::$connection)
		{
			self::$connection = new PDO('mysql:dbname=' . DBCONN_DB, DBCONN_UNAME, DBCONN_PWORD);
		}

		return self::$connection;
	}

	static function query($query, $params, $countOnly = false)
	{
		$db = self::getConn();

		$stmt = $db->prepare($query);

	//	foreach ($params as $handle => $param)
	//	{
	//		if (is_int($param))
	//		{
	//			notifyDebug($handle . ' ' . $param);
	//			$stmt->bindParam($handle, $param, PDO::PARAM_INT);
	//		}
	//		else
	//		{
	//			notifyDebug($handle . ' ' . $param);
	//			$stmt->bindParam($handle, $param, PDO::PARAM_STR);
	//		}
	//	}
	//	$stmt->execute();

		$stmt->execute($params);

		$errorInfo = $stmt->errorInfo();
		if ($errorInfo[0] !== '00000')
		{
			trigger_error("SQL ERROR {$errorInfo[0]}: {$errorInfo[2]}", E_USER_NOTICE);

			debugOutput($stmt->queryString);
			debugOutput(json_encode($params, JSON_PRETTY_PRINT));

			return false;
		}

//		$results = $stmt->fetch(PDO::FETCH_ASSOC);
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

//		debugOutput($stmt->queryString);

		if ($countOnly)
		{
			return count($results);
		}
		else
		{
			return $results;
		}
	}

	static function exists ($table, $values)
	{
		$query = "SELECT * FROM {$table} WHERE";

		$params = [];

		$addAnd = false;

		foreach ($values as $column => $value)
		{
			if ($addAnd) $query .= ' AND';

			$query .= " {$column} = :{$column}";
			$params[":{$column}"] = $value;
		}

		return self::query($query, $params, true) > 0;
	}
}
