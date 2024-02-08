<?php

session_start();

if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
	$uri = 'https://';
} else {
	$uri = 'http://';
}

if (isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
	$uri .= $_SERVER['HTTP_HOST'];
	header('Location: ./main.html');
	exit;
} else {
	$uri .= $_SERVER['HTTP_HOST'];
	header('Location: ./login.html');
	exit;
}

?>
Something is wrong with the application. Try again later...
