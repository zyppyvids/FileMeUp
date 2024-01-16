<?php
$database = 'filemeup';
$username = 'root';
$password = 'root';
$host = 'localhost';

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
} 

echo "Connected successfully";
$connection->close();
header("Location: ../logged_in.html");
exit;
?>
