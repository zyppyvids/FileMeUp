<?php

include 'connection.php';

session_start();
try {
    // Get DB Instance
    $first_pdo = getDbInstance();

    // Sample user input (replace with your actual data)
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Hash the user-provided password during registration
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Prepare the SQL statement to insert the user into the database
    $first_stmt = $first_pdo->prepare("INSERT INTO users (username, password_hash) VALUES (:username, :password)");
    $first_stmt->bindParam(':username', $username);
    $first_stmt->bindParam(':password', $hashedPassword);
    $first_stmt->execute();

    // Check if the insertion was successful
    if ($first_stmt->rowCount() > 0) {
        // Get DB Instance
        $second_pdo = getDbInstance();

        // Prepare the SQL statement to retrieve the id for the given username
        $second_stmt = $second_pdo->prepare("SELECT id FROM users WHERE username = :username");
        $second_stmt->bindParam(':username', $username);
        $second_stmt->execute();

        // Fetch the result
        $result = $second_stmt->fetch(PDO::FETCH_ASSOC);

        // Check if the username exists in the database
        if ($result) {
            // Set a session variable to mark the user as authenticated
            $_SESSION['authenticated'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['userId'] = $result['id'];
            $userDirectory = "../uploads/" . $result['id'];
            if (!file_exists($userDirectory)) {
                mkdir($userDirectory, 0777, true);
            }
            echo json_encode(['id' => $result['id'], 'success' => true, 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'User registration failed']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User registration failed']);
    }
} catch (PDOException $e) {
    // Handle database connection errors
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
