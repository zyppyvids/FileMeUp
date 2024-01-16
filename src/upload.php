<?php
$target_dir = "../uploads/"; // Ensure this directory exists and is writable
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

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

// Allow certain file formats
// if($fileType != "jpg" && $fileType != "png" && $fileType != "jpeg" && $fileType != "gif" && $fileType != "pdf" && $filetype != "plain") {
//     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//     $uploadOk = 0;
// }

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";

        // Database connection
        $conn = new mysqli('localhost', 'root', 'root', 'filemeup');

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Insert file info into the database
        $stmt = $conn->prepare("INSERT INTO files (file_name, file_type, file_size, file_path) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $filename, $fileType, $fileSize, $filePath);

        // Set parameters and execute
        $filename = basename($_FILES["fileToUpload"]["name"]);
        $fileType = $_FILES["fileToUpload"]["type"];
        $fileSize = $_FILES["fileToUpload"]["size"];
        $filePath = $target_file;
        $stmt->execute();

       // echo "<script type='text/javascript'>alert('New record created successfully');</script>";
        $stmt->close();
        $conn->close();
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
   
} 
header("Location: ../logged_in.html");
exit;
?>
