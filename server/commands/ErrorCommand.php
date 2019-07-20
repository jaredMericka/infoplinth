<?php

class ErrorCommand extends Command
{
	public function getDescription()
	{
		return 'Throws and error to test error handling.';
	}

	public function getInputTypes()
	{
		return [];
	}

	public function run()
	{
		trigger_error('This error was intentionally thrown.');
	}
}