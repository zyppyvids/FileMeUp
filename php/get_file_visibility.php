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
    $stmt = $pdo->prepare("SELECT is_private FROM files WHERE owner_id = :ownerId and file_name = :file_name");
    $ownerId = isset($_SESSION['userId']) ? $_SESSION['userId'] : 1;
    
    $stmt->bindParam(':file_name', $file_name);
    $stmt->bindParam(':ownerId', $ownerId); // corrected parameter name
    
    if ($stmt->execute()) {
        $result = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch single row
        if ($result) {
            echo json_encode($result); // Return result as JSON
        } else {
            echo 'No file found with the specified name.';
        }
    } else {
        echo 'There was an error retrieving the file ' . $file_name . ' from the database!';
        print_r($stmt->errorInfo());
    }
} else {
    echo 'File is not set correctly';
}
?>
