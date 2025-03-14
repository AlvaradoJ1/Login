<?php
session_start();

// Si el usuario ya está autenticado y accede a index.php directamente, lo redirigimos a welcome.php
if (isset($_SESSION['user']) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: welcome.php");
    exit;
}

// Credenciales fijas (solo para pruebas, en producción usa una base de datos)
$valid_email = "legendary2128@gmail.com";
$valid_password = "123456";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    header("Content-Type: application/json");

    // 🔹 Validación de localStorage (solo si no hay sesión activa)
    if (isset($_POST['localStorageCheck']) && $_POST['localStorageCheck'] === "true") {
        if ($email === $valid_email && $password === $valid_password) {
            $_SESSION['user'] = $email;
            echo json_encode(["status" => "success", "redirect" => "welcome.php"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Credenciales inválidas en localStorage."]);
        }
        exit;
    }

    // 🔹 Validación normal de inicio de sesión
    if ($email === $valid_email && $password === $valid_password) {
        $_SESSION['user'] = $email;
        echo json_encode(["status" => "success", "redirect" => "welcome.php"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Credenciales incorrectas."]);
        session_unset();
        session_destroy();
    }
    exit;
}
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <div class="login-container">
        <img src="img/logo.png" alt="Logo" class="logo">
        <form id="loginForm" autocomplete="off">
            <input type="email" id="email" name="email" placeholder="Correo electrónico">
            <input type="password" id="password" name="password" placeholder="Contraseña" minlength="6">
            
            <button type="submit" id="submitButton">Iniciar Sesión</button>

            <!-- Loader (Inicialmente oculto) -->
            <div id="loadingContainer" class="loading-container">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </form>
        <p id="error-message" class="error-message"></p>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
