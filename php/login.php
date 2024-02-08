<?php

include 'connection.php';

session_start();

try {
    // Get DB Instance
    $pdo = getDbInstance();

    // Sample user input (replace with your actual data)
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Prepare the SQL statement to retrieve the hashed password for the given username
    $stmt = $pdo->prepare("SELECT id, password_hash FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if the username exists in the database
    if ($result) {
        // Verify the provided password with the stored hash
        if (password_verify($password, $result['password_hash'])) {
            // Set a session variable to mark the user as authenticated
            $_SESSION['authenticated'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['userId'] = $result['id'];
            
            echo json_encode(['id' => $result['id'], 'username' => $username, 'success' => true, 'message' => 'Authentication successful']);
        } else {
            // Invalid password
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        // User not found
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} catch (PDOException $e) {
    // Handle database connection errors
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
