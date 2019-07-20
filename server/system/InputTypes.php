<?php

////////////////////////////////////////////////////////////////////////////////
//
//	INPUT TYPES
//
////////////////////////////////////////////////////////////////////////////////

abstract class InputType
{
	public $name;
	public $help;
	public $optional;
	public $type;

	public abstract function validateInput ($input);

	public function __construct ($name, $help, $optional)
	{
		$this->name = $name;
		$this->help = $help;
		$this->optional = $optional ? true : false;
		$this->type = explode('_', get_class($this), 2)[1]; // Lol, what a shit line of code.
	}
}

class InputType_number extends InputType
{
	public $min;
	public $max;

	public function __construct ($name, $help, $optional, $min = null, $max = null)
	{
		$this->min = $min;
		$this->max = $max;

		parent::__construct($name, $help, $optional);
	}

	public function validateInput ($input)
	{
		if (!is_numeric($input)) return false;

		$input = (int)$input;

		if (isset($this->min) && $input < $this->min) return false;
		if (isset($this->max) && $input > $this->max) return false;

		return $input;
	}
}

class InputType_string extends InputType
{
	public $minLength;
	public $maxLength;
	public $regexPattern;
	public $obfuscated;

	public function __construct ($name, $help, $optional, $minLength = null, $maxLength = null, $regexPattern = null, $obfuscated = null)
	{
		$this->minLength = $minLength;
		$this->maxLength = $maxLength;
		$this->regexPattern = $regexPattern;
		$this->obfuscated = $obfuscated;

		parent::__construct($name, $help, $optional);
	}

	public function validateInput ($input)
	{
		$input = '' . $input;
		$length = strlen($input);

		if (isset($this->minLength) && $length < $this->minLength) return false;
		if (isset($this->maxLength) && $length > $this->maxLength) return false;

		// Oosenupt - Check the regex here

		return $input;
	}
}

class InputType_option extends InputType
{
	public $options;

	public function __construct ($name, $help, $optional, $options)
	{
		foreach ($options as &$option) $option = strtolower($option);

		$this->options = $options;

		parent::__construct($name, $help, $optional);
	}

	public function validateInput ($input)
	{
		$input = strtolower((string)$input);

		if (in_array($input, $this->options)) return $input;

		if (is_numeric($input) && isset($this->options[(int)$input]))
		{
			return $this->options[(int)$input];
		}

		return false;
	}
}