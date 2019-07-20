<?php

////////////////////////////////////////////////////////////////////////////////
//
//	HANDLER
//
//	Extended for use iwith the conduit system.
//
////////////////////////////////////////////////////////////////////////////////

abstract class Handler
{
	abstract protected function run ();

	final public function __construct($inputParams = null)
	{
		if (!$inputParams) return; // Might need to instantiate just to get the JS or something. Maybe refine this later.

		foreach ($inputParams as $var => $val)
		{
			if ($val === 'null' || $val === 'undefined')
			{
				$val = null;
			}

			$var = 'i_' . $var;
			$this->$var = $val;
		}

		$this->run();
	}

	final public function getInputVars ()
	{
		$vars = get_class_vars(get_class($this));

		$inputVars = [];

		foreach ($vars as $var => $val)
		{
			if (substr($var, 0, 2) === 'i_') $inputVars[] = substr($var, 2);
		}

		return $inputVars;
	}

//	public function getOutputVars ()
//	{
//		$vars = get_class_vars(get_class($this));
//
//		$outputVars = [];
//
//		foreach ($vars as $var)
//		{
//			if (substr($var, 0, 2) === 'o_') $outputVars[] = substr($var, 2);
//		}
//
//		return $outputVars;
//	}

	final public function getJS ()
	{
		$params = $this->getInputVars();
		$functionName = get_class($this);

		echo "function {$functionName} (" . implode(', ', $params) . ")\n";
		echo "{\n";
		echo "\tvar component = {\n";
		echo "\t\t'h' : '{$functionName}',\n";
		echo "\t\t'i' : {\n";

		$lastOne = end($params);

		foreach ($params as $param)
		{
			$comma = $param === $lastOne ? '' : ',';
			echo "\t\t\t\t'{$param}' : myEncodeURIComponent({$param}){$comma}\n";
		}

		echo "\t\t\t}\n";
		echo "\t};\n";
		echo "\n";
		echo "\tconduit.add(component);\n";
		echo "}\n";
		echo "\n";

	}
}