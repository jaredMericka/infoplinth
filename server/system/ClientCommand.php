<?php

abstract class ClientCommand extends Command
{
	public final function run()
	{
		$commandName = get_class($this);
		trigger_error("Attempting to run client command\"{$commandName}\" remotely.");
	}

	abstract function clientJs ();

	public final function getClientJs ()
	{
		$commandName = str_replace('Command', '', get_class($this));

		$clientJs = "function clientCommand_{$commandName} (";

		$inputTypes = $this->getInputTypes();

		$paramNames = ['switches'];

		foreach ($inputTypes as $inputType)
		{
			$paramNames[] = lcFirst(str_replace(' ', '', $inputType->name));
		}

		$clientJs .= implode(', ', $paramNames) . ")\n{";

		ob_start();
		$this->clientJs();
		$clientJs .= ob_get_clean() . "}\n\n";

		return $clientJs;
	}
}