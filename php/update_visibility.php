<?php
include 'connection.php';
$pdo = getDbInstance();

session_start();
$contents = file_get_contents("php://input");
$requestData = json_decode($contents, true);

if(isset($requestData['file']) && isset($requestData['visibility'])) {
    $file_name = $requestData['file'];
    $visibility = $requestData['visibility']; // Get visibility parameter
    if (!$pdo) {
        die("Connection failed.");
    }
    $stmt = $pdo->prepare("UPDATE files SET is_private=:visibility WHERE owner_id=:owner_id AND file_name=:file_name");
    $ownerId = isset($_SESSION['userId']) ? $_SESSION['userId'] : 1;
    
    $stmt->bindParam(':file_name', $file_name);
    $stmt->bindParam(':owner_id', $ownerId);
    $stmt->bindParam(':visibility', $visibility); // Bind visibility parameter
    
    if ($stmt->execute()) {
        echo 'The file ' . $file_name . ' was updated successfully!';   
    } else {
        echo 'There was an error updating the file ' . $file_name . '!';
        print_r($stmt->errorInfo());
    }
} else {
    echo 'File or visibility parameter is not set correctly';
}
?>
