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
    
    $ownerId = isset($_SESSION['userId']) ? $_SESSION['userId'] : 1;
    
    $filePath = dirname(__DIR__) . '\\uploads\\' . $ownerId . '\\' . $file_name;
    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            echo 'The file ' . $file_name . ' was deleted successfully from the server!';
            
            $stmt = $pdo->prepare("DELETE from files where owner_id=:owner_id and file_name=:file_name");
            $stmt->bindParam(':file_name', $file_name);
            $stmt->bindParam(':owner_id', $ownerId);
            
            if ($stmt->execute()) {
                echo ' The file ' . $file_name . ' was also deleted successfully from the database!';
            } else {
                echo ' However, there was an error deleting the file ' . $file_name . ' from the database!';
                print_r($stmt->errorInfo());
            }
        } else {
            echo 'Error deleting the file ' . $file_name . ' from the server.';
        }
    } else {
        echo 'The file ' . $file_name . ' does not exist on the server.';
    }
} else {
    echo 'File is not set correctly';
}
?>
