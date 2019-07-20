<?php

class CommandHandler extends Handler
{
	public $i_entityId;
	public $i_command;
	public $i_switches;
	public $i_params;

	protected function run ()
	{
//		$entityShell = new EntityShell($this->i_entityId);

//		$commandName = ucfirst($this->i_command) . 'Command';
		$commandName = "{$this->i_command}Command";
		$commandPath = "Commands/{$commandName}.php";

		if (!is_file($commandPath))
		{
			// Command class file missing. Command must be nonsense.
			return;
		}

		require $commandPath;
		$command = new $commandName;
		$command->entity = new Entity($this->i_entityId);
		$command->switches = $this->i_switches;

		if (in_array('h', $this->i_switches))
		{
			$DOM = $command->getHelp();

			registerClientAction(CONDUIT_RENDER_HTML_IN_CWINDOW, $DOM, "{$this->i_command} command help", 'question-circle');
		}
		else
		{
			$inputTypes = $command->getInputTypes();

			foreach ($inputTypes as $index => $inputType)
			{
				$param = isset($this->i_params[$index]) ? $this->i_params[$index] : null;

				if ($param || $inputType->optional === false)
				{
					$param = $inputType->validateInput($param);
				}

				if ($param === false)
				{
					die ("Post submission validation failed on {$inputType->name}");
				}

				$name = lcFirst(str_replace(' ', '', $inputType->name));

				if (isset($this->i_params[$index]))
				{
					$command->$name = $param;
				}
			}

			$command->run();
		}
	}
}