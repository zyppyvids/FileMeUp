<?php
include 'connection.php';
$pdo = getDbInstance();

session_start();
$contents = file_get_contents("php://input");
$requestData = json_decode($contents, true);

if(isset($requestData['file'])) {
    $file_name = $requestData['file'];
    if (!$pdo) {
        die("Connection failed.");
    }
    echo 'The file ' . $file_name . ' was deleted successfully!';
    $stmt = $pdo->prepare("DELETE from files where owner_id=:owner_id and file_name=:file_name");
    $ownerId = isset($_SESSION['userId']) ? $_SESSION['userId'] : 1;
    
    $stmt->bindParam(':file_name', $file_name);
    $stmt->bindParam(':owner_id', $ownerId);
    
    if ($stmt->execute()) {
        echo 'The file ' . $file_name . ' was deleted successfully from the database!';   
    } else {
        echo 'There was a error deleting the file ' . $file_name . ' from the database!';
        print_r($stmt->errorInfo());
    }
} else {
    echo 'File is not set correctly';
}
?>