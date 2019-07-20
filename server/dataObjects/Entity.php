<?php

class Entity
{
	use DbObject;

	public $id;
	public $name;
	public $parentId;
	public $typeId;

	public $creatorId;
	public $creatorIp;
	public $creatorName;
	public $createdDate;

	public $modifiedDate;

	public $deleted;
	public $deletedDate;

	public $_type;
	public $_typeVars;
	public $_metadata = [];
	public $_isGhost;
	public $_children = [];
	public $_childCount;
	public $_incomplete;

	public static $_systemMetadataNames = [
		'layout' => Metadatum::METADATUM_TYPE_TEXT
	];

	public function __construct	($entityId = null)
	{
		$this->id = getHash($entityId);

		$query = "SELECT * FROM entity WHERE id = :id";
		$params = [':id' => $this->id];

		$results = DbConn::query($query, $params);

		if ($results)
		{
			$this->dbConstruct($results[0]);
			$this->_type = 'entity';
			$this->_isGhost = false;
		}
		else
		{
			$this->constructGhost();
		}

		$this->populateMetadata();
	}

	public function afterCreate()
	{
		if (!$this->_isGhost)
		{
			$this->getChildCount();
		}
	}

	public function __get ($name) { if (isset($this->_metadata[$name])) return $this->_metadata[$name]->value; }

	function getPKs() { return ['id']; }

	public function constructGhost ()
	{
		global $user;

		$this->name			= $this->id;
		$this->parentId		= null;
		$this->type			= null;

		$this->creatorId	= $user->id;
		$this->creatorIp	= REMOTE_ADDR;
		$this->creatorName	= $user->name;

		$this->createdDate	= REQUEST_TIME;

		$this->deleted		= 0;

		$this->_type		= 'entity';
		$this->_isGhost		= true;
	}

	public function populateMetadata ()
	{
		if (!$this->id) return;

		$query = 'SELECT * FROM Metadatum WHERE entityId = :entityId';
		$params = [':entityId' => $this->id];

		$results = DbConn::query($query, $params);

		foreach ($results as $result)
		{
			$metadatum = new Metadatum();

			$metadatum->dbConstruct($result);

			$metadatum->_entity = $this;

			$this->_metadata[$metadatum->name] = $metadatum;
		}
	}

	public function populateChildren ()
	{
		if (!$this->id || $this->_children) return;

		$query = 'SELECT * FROM Entity WHERE parentId = :entityId';
		$params = [':entityId' => $this->id];

		$results = DbConn::query($query, $params);

		foreach ($results as $result)
		{
			$child = new Entity();

			$child->dbConstruct($result);

			$this->_children[] = $child;
		}
	}

	function getChildCount ()
	{
		if (!isset($this->_childCount))
		{
			$query = 'SELECT id FROM entity WHERE parentId = :entityId';
			$params = [':entityId' => $this->id];
			$this->_childCount = DbConn::query($query, $params, true);
		}
	}

	function getClientObject ()
	{
		// This has been designed for use by a treeview.

		$clientObject = new stdClass();

		$this->getChildCount();

		$clientObject->id			= $this->id;
		$clientObject->parentId		= $this->parentId;
		$clientObject->name			= $this->name;
		$clientObject->registered	= false;

		$clientObject->_checksum	= md5(json_encode($clientObject));
		$clientObject->_childCount	= $this->_childCount;

		return $clientObject;
	}

	function getMetadataClientObjects ($includeDeleted = false)
	{
		$clientObjects = [];

		foreach ($this->_metadata as $metadatum)
		{
			if (!$includeDeleted && $metadatum->deleted) continue;

			$clientObjects[] = $metadatum->getClientObject();
		}

		usort($clientObjects, function ($a, $b)
		{
			if ($a->systemDefined && !$b->systemDefined) return -1;
			if ($b->systemDefined && !$a->systemDefined) return 1;

			if ($a->typeDefined && !$b->typeDefined) return -1;
			if ($b->typeDefined && !$a->typeDefined) return 1;

			return strcmp($a->name, $b->name);
		});

		return $clientObjects;
	}

	function output ($body, $tag = null)
	{
		if ($tag) $body = "<{$tag}>{$body}</{$tag}>";

		$output = new stdClass();
		$output->body = $body;
		$output->creatorName = 'System';
		$output->createdDate = REQUEST_TIME;

		registerClientAction(CONDUIT_APPEND_OUTPUT, $this->id, [$output]);
	}

	function outputError	($body) { $this->output("<rh> <i class=\"fa fa-times-circle\"></i> ERROR: </rh><r> {$body}</r>"); }
	function outputWarning	($body) { $this->output("<yh> <i class=\"fa fa-warning\"></i> WARNING: </yh><y> {$body}</y>"); }
	function outputSuccess	($body) { $this->output("<gh> <i class=\"fa fa-check-circle\"></i> SUCCESS: </gh><g> {$body}</g>"); }

	function comment ($body, $re = null)
	{
		global $user;

		$comment = new Comment();

		$comment->parentId		= $this->id;
		$comment->re			= $re;
		$comment->body			= $body;
		$comment->creatorId		= $user->id;
		$comment->creatorName	= $user->displayName;
//		$comment->creatorIp		= REMOTE_ADDR;
		$comment->creatorIp		= $_SERVER['REMOTE_ADDR'];
		$comment->createdDate	= REQUEST_TIME;
		$comment->modifiedDate	= REQUEST_TIME;
		$comment->deleted		= 0;

		$comment->dbCreate();
	}

	function getComments ($last)
	{
		$query =
			'SELECT ' .
				'seqNo, ' .
				're, ' .
				'body, ' .
//				'creatorId, ' .
				'creatorName, ' .
				'createdDate ' .
			'FROM comment ' .
			'WHERE parentId = :id ' .
			'AND seqNo > :last ';

		$params = [
			':id'	=> $this->id,
			':last'	=> $last ? $last : 0
		];

		$comments = DbConn::query($query, $params);

		foreach ($comments as &$comment)
		{
			foreach ($comment as $var => $val)
			{
				if (is_numeric($var))
				{
					unset($comment->$var);
					continue;
				}
			}
		}

		// Restructuring of data may take place here in the future.
		return $comments;
	}

	function setMetadata ($name, $value, $METADATUM_TYPE)
	{
		if (!$name)
		{
			$this->outputError('Attempt to create nameless metadatum!');
			return false;
		}

//		if (!$value)
//		{
//			$this->outputWarning("Metadatum \"<w>{$name}</w>\" requires a value!");
//			return false;
//		}

		if (isset($this->_metadata[$name]))
		{
			$metadatum = $this->_metadata[$name];
		}
		else
		{
			if (isset(self::$_systemMetadataNames[$name]))
			{
				// This isn't set but is a system value.
				$METADATUM_TYPE = self::$_systemMetadataNames[$name];
			}

			if ($METADATUM_TYPE && in_array($METADATUM_TYPE, Metadatum::METADATA_TYPES))
			{
				$metadatum = new Metadatum();
				$metadatum->name = $name;
			}
			else
			{
				$this->outputError("Unable to create new metadatum \"<w>{$name}</w>\" without a specified type!");
				return false;
			}
		}

		$metadatum->entityId = $this->id;

		$setResult = $metadatum->setValue($value, $METADATUM_TYPE);

		if ($setResult === true)
		{
			if ($metadatum->_isGhost)
			{
				$metadatum->dbCreate();
			}
			else
			{
				$metadatum->dbUpdate();
			}

			$this->_metadata[$name] = $metadatum;

			return true;
		}
		else
		{
			$this->outputError($setResult);
		}
	}

	public function deleteMetadata ($name)
	{
		if (isset($this->_metadata[$name]))
		{
			$metadatum = & $this->_metadata[$name];

			$metadatum->deleted = true;
			$metadatum->deletedDate = REQUEST_TIME;

			$metadatum->dbUpdate();
		}
		else
		{
			return "Unable to delete non-existent metadatum \"<w>{$name}</w>\"!";
		}
	}
}

////////////////////////////////////////////////////////////////////////////////
//
//	METADATUM
//
////////////////////////////////////////////////////////////////////////////////

class Metadatum
{
	use DbObject;

	const METADATUM_TYPE_ID			= 'id';
	const METADATUM_TYPE_TEXT		= 'text';
	const METADATUM_TYPE_NUMBER		= 'number';
	const METADATUM_TYPE_DATE		= 'date';
	const METADATUM_TYPE_BOOLEAN	= 'boolean';

	const METADATA_TYPES =
	[
		self::METADATUM_TYPE_ID,
		self::METADATUM_TYPE_TEXT,
		self::METADATUM_TYPE_NUMBER,
		self::METADATUM_TYPE_DATE,
		self::METADATUM_TYPE_BOOLEAN
	];

	public $name;
	public $entityId;

	public $idValue;
	public $textValue;
	public $numberValue;
	public $dateValue;
	public $booleanValue;

	public $creatorId;
	public $creatorName;
	public $creatorIp;

	public $deleted;
	public $deletedDate;

	public $_entity;

	public $_type;
	public $_value;
	public $_isGhost = false;

	public $_isSystemValue;
	public $_isTypeValue;

	public function __construct ($entityId = null, $name = null)
	{
		$results = null;

		if (isset($entityId, $name))
		{
			$entityId = getHash($entityId);

			$query = "SELECT * FROM metadatum WHERE id = :id AND name = :name";
			$params = [':id' => $this->id, ':name' => $name];

			$results = DbConn::query($query, $params);
		}

		if ($results)
		{
			$this->dbConstruct($results[0]);
		}
		else
		{
			$this->constructGhost();
		}
	}

	function getPKs() { return ['name', 'entityId']; }

	public function afterCreate()
	{
		foreach (self::METADATA_TYPES as $type)
		{
			if (isset($this->{"{$type}Value"}))
			{
				$this->_type = $type;
				$this->_value = $this->{"{$type}Value"};
			}
		}
	}

	public function constructGhost ()
	{
		global $user;

		$this->name			= null;
		$this->entityId		= null;

		$this->idValue		= null;
		$this->textValue	= null;
		$this->numberValue	= null;
		$this->dateValue	= null;
		$this->boolenaValue	= null;

		$this->creatorId	= $user->id;
		$this->creatorName	= $user->name;
		$this->creatorIp	= REMOTE_ADDR;

		$this->createdDate	= REQUEST_TIME;

		$this->deleted		= 0;

		$this->_type		= null;
		$this->_value		= null;
		$this->_isGhost		= true;
	}

	public function setValue ($value, $METADATUM_TYPE = null)
	{
		if (!$METADATUM_TYPE) $METADATUM_TYPE = $this->_type;

		$this->{"{$this->_type}Value"} = null;

		$this->_type = $METADATUM_TYPE;

		$property = $this->_type . 'Value';

		if (!$METADATUM_TYPE)
		{
			trigger_error("Metadata type missing!");
			return false;
		}
		else if (property_exists(__CLASS__, $property))
		{
			switch ($this->_type)
			{
				case self::METADATUM_TYPE_ID:
					$value = getHash($value);
					break;

				case self::METADATUM_TYPE_TEXT:
					$value = '' . $value;
					break;

				case self::METADATUM_TYPE_NUMBER:
					if (!is_numeric($value))
					{
						return "\"<w>{$value}</w>\" is not a valid number value!";
					}
					break;

				case self::METADATUM_TYPE_DATE:
					if (!($value = strtotime($value)))
					{
						return "\"<w>{$value}</w>\" is not a valid date value!";
					}
					break;

				case self::METADATUM_TYPE_BOOLEAN:
					switch (strtolower($value))
					{
						case '1':
						case 'true':
						case 'yes':
						case 'on':
						case 'tick':
							$value = 1;
							break;

						case '0':
						case 'false':
						case 'no':
						case 'off':
						case 'cross':
							$value = 0;
							break;

						default:
							return "\"<w>{$value}</w>\" is not a valid boolean value!";
					}
					break;
				default:
					debugOutput($property, 'rh');
					break;
			}

			$property = "{$this->_type}Value";
			$this->_value = $value;

			$this->$property = $value;
			return true;
		}
		else
		{
			trigger_error("Invalid metadata type \"<w>{$property}</w>\".");
			return false;
		}
	}

	public function getClientObject ()
	{
		if (!$this->_entity)
		{
			$this->_entity = new Entity($this->entityId);
			debugOutput('Loading Metadatum\'s entity whilst preparing client metadata.', 'm');
		}

		$typeVars = [];

		if ($this->_entity->_type)
		{
//			$type
		}

		$metadatumData = new stdClass();

		$metadatumData->name	= $this->name;
		$metadatumData->type	= $this->_type;
		$metadatumData->value	= $this->_value;

		$metadatumData->systemDefined	= isset(Entity::$_systemMetadataNames[$this->name]);
		$metadatumData->typeDefined		= isset($this->_entity->type);

		$metadatumData->deleted	= $this->deleted;

		return $metadatumData;
	}
}

////////////////////////////////////////////////////////////////////////////////
//
//	COMMENT
//
////////////////////////////////////////////////////////////////////////////////

class Comment
{
	use DbObject;

	public	$seqNo;
	public	$parentId;
	public	$body;
	public	$creatorId;
	public	$creatorName;
	public	$creatorIp;
	public	$createdDate;
	public	$modifiedDate;
	public	$deleted;
	public	$re;

	function __construct ($seqNo = null)
	{
//		global $user;

		$isNew = true;

		if ($seqNo)
		{
			$query = "SELECT * FROM comment WHERE seqNo = :seqNo";
			$params = [':seqNo' => $this->seqNo];

			$results = DbConn::query($query, $params);

			if ($results)
			{
				$this->dbConstruct($results[0]);
				$isNew = false;
			}
		}

		if ($isNew)
		{

		}
	}

	function getPKs() { return ['seqNo']; }
}

////////////////////////////////////////////////////////////////////////////////
//
//	DB OBJECT TRAIT
//
////////////////////////////////////////////////////////////////////////////////

trait DbObject
{
	public abstract function getPKs ();

	protected function getDbVars (/* $exemption1, $exemption2 */)
	{
		$exemptions		= func_get_args();
		$dbVars		= [];

		$className = get_class($this);

		foreach (get_class_vars($className) as $var => $val)
		{
			if ($var[0] === '_' || in_array($var, $exemptions)) continue;

			$dbVars[$var] = $this->$var;
		}

		$exemptions = array_merge($exemptions, array_keys($dbVars));

		return $dbVars;
	}

	public function dbConstruct ($results)
	{
		foreach ($results as $var => $val)
		{
			$this->$var = $val;
		}
		$this->_isGhost = false;

		$this->afterCreate();
	}

	public function dbCreate ()
	{
		$vars = $this->getDbVars();
		$className = get_class($this);

		$varNames = array_keys($vars);
		$paramKeys = [];

		foreach ($varNames as $varName) $paramKeys[] = ":{$varName}";

		$query = "INSERT INTO {$className} (";
		$query .= implode(', ', $varNames);
		$query .= ') VALUES (';
		$query .= implode(', ', $paramKeys);
		$query .= ')';

		$params = [];

		foreach ($vars as $key => $val) $params[":{$key}"] = $val;

		if (DbConn::query($query, $params) === false)
		{

			trigger_error("Failed to create database instance of \"{$className}\" (id: \"{$this->id}\").");
			return false;
		}

		return true;
	}

	public function afterCreate () { }

	public function dbUpdate ()
	{
		$vars = $this->getDbVars();
		$className = get_class($this);

		$varNames = array_keys($vars);

		$query = "UPDATE {$className} SET ";


		$setComponents = [];

		foreach ($varNames as $var)
		{
			$setComponents[] = "{$var} = :{$var}";
		}

		$query .= implode(',', $setComponents);

		$PKs = [];
		$params = [];

		foreach ($this->getPKs() as $PK)
		{
			$PKs[] = "{$PK} = :{$PK}";
			$params[":{$PK}"] = $this->$PK;
		}

		$query .= ' WHERE ' . implode(' AND ', $PKs);

		foreach ($vars as $var => $val) $params[":{$var}"] = $val;

		DbConn::query($query, $params);
	}
}