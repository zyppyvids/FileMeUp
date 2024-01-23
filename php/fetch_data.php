<?php

// Include the connection.php file
include 'connection.php';

// Get PDO instance from connection.php
$pdo = getDbInstance();

// Prepare the SQL query
$sql = "SELECT file_name, file_type, `size` file_path FROM files";
$result = array();

try {
    // Execute the query
    $queryResult = $pdo->query($sql);

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
