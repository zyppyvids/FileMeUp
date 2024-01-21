<?php
// If delete button is clicked
// will work for method="POST", (input name)name="deleteFile", button name="delete" similar to upload.php
//	
if (isset($_POST['delete'])) {
    require_once 'files_repository.php'; 
    // filename should be passed through the frontend 
    $fileHandler = new FileHandler();
	$filename = $_FILES["deleteFile"]["name"];
    // works only if $_SESSION is set
	$username = $_SESSION["username"];
	$path = "./files/" . $username . "/". $filename;
    $fileHandler->deleteFile($filename, $username);
	// delete the uploaded image from folder: files
	if (unlink($path)) {
        echo 'The file ' . $filename . ' was deleted successfully!';
    } else {
        echo 'There was a error deleting the file ' . $filename;
    }
}