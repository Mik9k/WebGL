<?php
error_reporting(E_ALL); // Error/Exception engine, always use E_ALL

ini_set('ignore_repeated_errors', TRUE); // always use TRUE

ini_set('display_errors', FALSE); // Error/Exception display, use FALSE only in production environment or real server. Use TRUE in development environment

ini_set('log_errors', TRUE); // Error/Exception file logging engine.

ini_set("error_log", "~/Documents/WebGL/php-error.log");
error_log( "Hello, errors!" );

require_once 'config/config.php';

require_once 'libs/controller.php';
require_once 'libs/model.php';
require_once 'libs/view.php';

require_once 'helpers/session.php';

require_once 'controllers/menu.php';


//include 'models/menu.php';
include 'models/usermodel.php';

require_once 'libs/game.php';

$game = Game::Init_One();
?>