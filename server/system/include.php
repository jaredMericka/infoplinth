<?php

require ROOT_PATH . 'server/system/_constants.php';
require ROOT_PATH . 'server/system/constants.php';

require ROOT_PATH . 'server/system/systemFunctions.php';
require ROOT_PATH . 'server/system/systemClasses.php';

require ROOT_PATH . 'server/system/Command.php';
require ROOT_PATH . 'server/system/ClientCommand.php';
require ROOT_PATH . 'server/system/Handler.php';
require ROOT_PATH . 'server/system/InputTypes.php';

//require ROOT_PATH . 'server/dataObjects/entities/entity.php';

require ROOT_PATH . 'server/system/session.php';

debugOutput('include.php');