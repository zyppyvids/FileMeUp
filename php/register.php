<?php

include 'connection.php';

session_start();

try {
    // Get DB Instance
    $pdo = getDbInstance();

    // Sample user input (replace with your actual data)
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Hash the user-provided password during registration
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Prepare the SQL statement to insert the user into the database
    $stmt = $pdo->prepare("INSERT INTO users (username, password_hash) VALUES (:username, :password)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->execute();

    // Check if the insertion was successful
    if ($stmt->rowCount() > 0) {
        // Set a session variable to mark the user as authenticated
        $_SESSION['authenticated'] = true;
        $_SESSION['username'] = $username;

        echo json_encode(['success' => true, 'message' => 'User registered successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'User registration failed']);
    }
} catch (PDOException $e) {
    // Handle database connection errors
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
