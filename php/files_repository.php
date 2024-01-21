<?php
require_once 'Db.php';

class FileHandler {

    public function __construct() {
    }

    public function uploadFile($filePath, $fileType, $size, $username) {
        $db = Db::getInstance();
        $conn = $db->getConnection();
        $stmt = $conn->prepare("INSERT INTO files (file_path, file_type, size, username) VALUES (:file_path, :file_type, :size, :username)");
        $stmt->bindParam(':file_path', $filePath, PDO::PARAM_STR);
        $stmt->bindParam(':file_type', $fileType, PDO::PARAM_STR);
        $stmt->bindParam(':size', $size, PDO::PARAM_INT);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute(); 
    }

    public function deleteFile($filePath, $username) {
        $db = Db::getInstance();
        $conn = $db->getConnection();
        $stmt = $conn->prepare("DELETE FROM files WHERE file_path = :file_path AND username = :username");
        $stmt->bindParam(':file_path', $filePath, PDO::PARAM_STR);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
    }

    public function getFilesByUsername($username) {
        $db = Db::getInstance();
        $conn = $db->getConnection();
        $stmt = $conn->prepare("SELECT file_path FROM files WHERE username = :username");
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        $filePaths = $stmt->fetch(PDO::FETCH_DEFAULT);
        return $filePaths;
    }
}