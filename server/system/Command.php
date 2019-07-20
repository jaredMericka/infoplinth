<?php

////////////////////////////////////////////////////////////////////////////////
//
//	COMMAND
//
//	Base class from which all commands should derive
//
////////////////////////////////////////////////////////////////////////////////

abstract class Command
{
	const SWITCH_HELP = 'h';

	public $isClientSide = false;
	public $entity;
	public $switches;

	public $typeWhiteList = [];
	public $typeBlackList = [];

	public $aliases = [];

	abstract public function getDescription ();
	abstract public function getInputTypes ();
	abstract public function run ();


	public final function getJsObject ()
	{
		$jsObject = new stdClass();

		$jsObject->desc = $this->getDescription();
		$jsObject->vars = $this->getInputTypes();
		$jsObject->switches = $this->getSwitches();
		if ($this->typeWhiteList) $jsObject->whiteList = $this->typeWhiteList;
		if ($this->typeBlackList) $jsObject->blackList = $this->typeBlackList;
		$jsObject->isClientCommand = $this instanceof ClientCommand;

		return $jsObject;
	}

	/**
	 *
	 * @param Array A keyed array of new switches.
	 * @return Array Array where the switch is the key and a description
	 */
	public function getSwitches ($switches = [])
	{
		return
		[
			self::SWITCH_HELP => 'Get help for this command.'
		] + $switches;
	}

	public final function on ($switch)
	{
		return in_array($switch, $this->switches);
	}

	public final function getHelp ()
	{
		$inputTypes = $this->getInputTypes();
		$switches = $this->getSwitches();

		$helpText = '<bh>&gt;' . str_replace('Command', '', get_class($this)) . '</bh> command help';

		$helpText = "{$helpText}\n\n" . $this->getDescription() . "\n";

		////////////////////////////////////////////////////////////////////////
		//	SWITCHES
		////////////////////////////////////////////////////////////////////////

		$helpText .= "\n<bu>Switches:</bu>\n";

		$switchHelp = array_align($switches, '<k>:</k>');

		foreach ($switchHelp as $switch => $desc)
		{
			$helpText .= "\n\t<b>{$switch}</b> {$desc}";
		}

		$helpText .= "\n";

		////////////////////////////////////////////////////////////////////////
		//	INPUT TYPES
		////////////////////////////////////////////////////////////////////////

		$helpText .= "\n<bu>Parameters:</bu>\n";

		$inputTypesHelp = [];

		foreach ($inputTypes as $inputType)
		{
			$optional = $inputType->optional ? ' <k>[optional]</k>' : '';
			$tag = $inputType->optional ? 'c' : 'b';
			$inputTypesHelp["<{$tag}>{$inputType->name}</{$tag}>"] = "{$inputType->help}{$optional}";
		}

		$inputTypesHelp = array_align($inputTypesHelp, '<k>:</k>');

		foreach ($inputTypesHelp as $name => $help) $helpText .= "\n\t{$name} {$help}";

		if (!$inputTypesHelp) $helpText .= "\n\t<k>None</k>";

		return $helpText;
	}

	public final function getClientValidationParamString ()
	{
		$paramString = "";

		$vars = $this->getInputTypes();

		$index = 0;

		foreach ($vars as $var)
		{
			$varName = lcFirst(str_replace(' ', '', $var->name));

			$paramString .= "\tvar {$varName} = params[{$index}];\n";
			$index++;
		}

		return $paramString;
	}

	public function clientCommand () { return false; }
}