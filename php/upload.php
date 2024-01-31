<?php

// Database connection
include 'connection.php';
$pdo = getDbInstance();

session_start();

$target_dir = "../uploads/"; // Ensure this directory exists and is writable
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check file size (for example, 5MB limit)
if ($_FILES["fileToUpload"]["size"] > 5000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Check connection
if (!$pdo) {
    die("Connection failed.");
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (file_exists($_FILES["fileToUpload"]["tmp_name"])) {
        $destination = getcwd() . '/' . $target_file;
        if (!file_exists($target_file) && move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $destination)) {
            echo "The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.";
        }
    
        // Insert file info into the database
        $stmt = $pdo->prepare("INSERT INTO files (file_name, file_type, `size`, file_path, owner_id) VALUES (:fileName, :fileType, :fileSize, :filePath, :ownerId)");
        
        // Set parameters and execute
        $fileName = basename($_FILES["fileToUpload"]["name"]);
        $fileType = $_FILES["fileToUpload"]["type"];
        $fileSize = $_FILES["fileToUpload"]["size"];
        $filePath = $target_file;
        $ownerId = isset($_SESSION['userId']) ? $_SESSION['userId'] : 1;
        
        $stmt->bindParam(':fileName', $fileName);
        $stmt->bindParam(':fileType', $fileType);
        $stmt->bindParam(':fileSize', $fileSize);
        $stmt->bindParam(':filePath', $filePath);
        $stmt->bindParam(':ownerId', $ownerId);

        $stmt->execute();
        print_r($stmt->errorInfo());
    } else {
        echo "Temporary file does not exist.";
    }
}

?>
