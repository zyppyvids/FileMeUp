<?php
error_reporting(0);

// If upload button is clicked
// will work for method="POST", (input name)name="uploadfile", button name="upload". Example:
//	
// <form method="POST" action="upload.php" enctype="multipart/form-data">
// 			<div class="form-group">
// 				<input class="form-control" type="file" name="uploadfile" value="" />
// 			</div>
// 			<div class="form-group">
// 				<button class="btn btn-primary" type="submit" name="upload">UPLOAD</button>
// 			</div>
// 	</form>

if (isset($_POST['upload'])) {
    require_once 'files_repository.php'; 
    $fileHandler = new FileHandler();
	$filename = $_FILES["uploadfile"]["name"];
	$tempname = $_FILES["uploadfile"]["tmp_name"];
	$type = $_FILES["uploadfile"]["type"];
	$size = $_FILES["uploadfile"]["size"];
	// works only if $_SESSION is set
	$username = $_SESSION["username"];
	$folder = "./files/" . $username . "/". $filename;
    $fileHandler->uploadFile($filename, $type, $size, "pesho");
	// move the uploaded image into the folder: files
	if (move_uploaded_file($tempname, $folder)) {
		echo "<h3> Image uploaded successfully!</h3>";
	} else {
		echo "<h3> Failed to upload image!</h3>";
	}
}

