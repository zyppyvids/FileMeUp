<?php

// Database connection
include 'connection.php';
$pdo = getDbInstance();

$target_dir = "../uploads/"; // Ensure this directory exists and is writable
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

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
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $destination)) {
            echo "The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.";

            $stmt = $conn->prepare("INSERT INTO files (file_name, file_type, size, file_path, owner_id) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssisi", $filename, $fileType, $fileSize, $filePath, $ownerID);
    
            // Set parameters and execute
            $filename = basename($_FILES["fileToUpload"]["name"]);
            $fileType = $_FILES["fileToUpload"]["type"];
            $fileSize = $_FILES["fileToUpload"]["size"];
            $filePath = $target_file;
            $ownerID = 18;

            $stmt->execute();

            $stmt->close();
        } else {
            echo "File could not be moved. Debugging information: " . print_r($_FILES, true);
        }
    } else {
        echo "Temporary file does not exist.";
    }
}
?>
