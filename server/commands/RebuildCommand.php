<?php

class RebuildCommand extends Command
{
	public $aliases = ['r', 'rbld'];

	private $conduitConstants = [];
	private $conduitParams = [];

	public function getDescription()
	{
		return 'Runs server scripts and rebuilts generated files.';
	}

	public function getInputTypes()
	{
		return [];
	}

	public function run()
	{
		$ok = true;

		////////////////////////////////////////////////////////////////////////
		//
		//	CONDUIT FUNCTIONS
		//
		////////////////////////////////////////////////////////////////////////

		global $conduitFunctionNames;

		$jsPath = ROOT_PATH . 'js';
		$this->scanDirForConduitFunctions($jsPath);

		$missingConduitConstants = array_diff($conduitFunctionNames, $this->conduitConstants);
		$this->conduitConstants = $this->conduitConstants + $missingConduitConstants;

		$constFileString = "<?php\n\n";

		ksort($this->conduitConstants);

		foreach ($this->conduitConstants as $ucFunctionName => $functionName)
		{
			$comment = '';

			if (isset($missingConduitConstants[$ucFunctionName]))
			{
				$constFileString .= "/** <b>DEPRECATED</b> */\n";
			}
			else
			{
				$constFileString .= "/** {$this->conduitParams[$ucFunctionName]} */\n";
			}

			$constFileString .= "const {$ucFunctionName} = '{$functionName}';{$comment}\n";
		}

		$constFileString .= "\n\$conduitFunctionNames =\n[\n";

		foreach ($this->conduitConstants as $ucFunctionName => $functionName)
		{
			$constFileString .= "\t'{$ucFunctionName}' => '{$functionName}',\n";
		}

		$constFileString .= "];\n";

		$ok = $ok && file_put_contents(ROOT_PATH . 'server/system/_constants.php', $constFileString);

		if ($ok)
		{
			$this->entity->output(' Rebuild successful! ', 'gh');
		}
		else
		{
			$this->entity->output(' Rebuild failed! ', 'rh');
		}
	}

	function scanDirForConduitFunctions ($jsPath)
	{
		$jsFiles = scandir($jsPath);

		foreach ($jsFiles as $file)
		{
			if ($file[0] === '.') continue;

			$filePath = "{$jsPath}/{$file}";

			if (is_dir($filePath))
			{
				$this->scanDirForConduitFunctions("{$jsPath}/{$file}");
			}

			if (substr($file, -3) !== '.js') continue;

			$fileLines = file($filePath);

			foreach ($fileLines as $line)
			{
				if (strpos($line, 'function conduit_') === 0)
				{
					$functionParts = explode(' ', $line, 3);
					$functionName = $functionParts[1];
					$ucFunctionName = strtoupper(preg_replace('/[A-Z]/', '_$0', $functionName));

					$this->conduitConstants[$ucFunctionName] = $functionName;
					$this->conduitParams[$ucFunctionName] = substr($functionParts[2], 1, strpos($functionParts[2], ')') - 1);
				}
			}
		}
	}
}