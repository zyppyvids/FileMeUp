<?php

function getDbInstance($host = '127.0.0.1', $dbname = 'filemeup', $username = 'root') {
    // Create a PDO instance
    try {
        $pdo = new PDO("mysql:host=127.0.0.1:3306;dbname=filemeup", "root", "");
    
        // Set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        return $pdo;

    } catch(PDOException $e) {
        echo "Connectio failed: " . $e->getMessage();
    }
}

?>