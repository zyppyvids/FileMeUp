<?php

// Include the connection.php file
include 'connection.php';

// Get PDO instance from connection.php
$pdo = getDbInstance();

session_start();

// Prepare the SQL query
$sql = "SELECT file_name, file_type, `size`, file_path, owner_id FROM files WHERE owner_id = :ownerId";
$result = array();

try {
    $ownerId = isset($_SESSION['userId']) ? $_SESSION['userId'] : 1;

    // Execute the query
    $queryResult = $pdo->prepare($sql);
    $queryResult->bindParam(':ownerId', $ownerId);
    $queryResult->execute();

    // Fetch the results
    while($row = $queryResult->fetch(PDO::FETCH_ASSOC)) {
        $result[] = $row;
    }

    // Encode and output the results as JSON
    echo json_encode($result);
} catch (PDOException $e) {
    // Handle any exceptions
    die("Error: " . $e->getMessage());
} finally {
    // Close the PDO connection
    $pdo = null;
}

?>
