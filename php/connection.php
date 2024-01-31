<?php

function getDbInstance($host = 'localhost:3310', $dbname = 'filemeup', $username = 'root') {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
}

?>