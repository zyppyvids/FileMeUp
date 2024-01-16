<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$conn = new mysqli('localhost', 'root', 'root', 'filemeup');
$result = array();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT file_name, file_type, file_size FROM files";
$queryResult = $conn->query($sql);

if ($queryResult->num_rows > 0) {
    while($row = $queryResult->fetch_assoc()) {
        $result[] = $row;
    }
}

echo json_encode($result);
$conn->close();
?>
