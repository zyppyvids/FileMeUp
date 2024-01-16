<?php

include 'connection.php';

session_start();

// Get DB Instance
$pdo = getDbInstance();
 
// Get file ID from URL parameter
$fileId = isset($_GET['file_id']) ? $_GET['file_id'] : 1;

// Prepare the SQL statement to retrieve the wanted file
$stmt = $pdo->prepare("SELECT file_path, file_type FROM files WHERE file_id = :fileId");
$stmt->bindParam(':fileId', $fileId);
$stmt->execute();

// Fetch the result
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
  // Fetch file data from the row
  $filePath = $result['file_path'];

  // Set appropriate Content-Type header based on file type
  header("Content-Type: " . mime_content_type($filePath));

  // Output file content
  readfile($filePath);
} else {
  echo 'File not found';
}

$conn->close();

?>