<?php
session_start();

// Verifica si el usuario está autenticado
if (!isset($_SESSION['user'])) {
    header("Location: index.php");
    exit;
}

$userEmail = $_SESSION['user']; // Obtiene el email del usuario logueado
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/script.js" defer></script> <!-- Se enlaza el archivo JS externo -->
</head>
<body>
    <div class="container">
        <div class="welcome-box">
            <h1>Bienvenido,</h1>
            <p class="user-email"><?php echo htmlspecialchars($userEmail); ?>!</p>
            <a href="logout.php" id="logoutButton" data-no-instant>Salir</a>
        </div>
    </div>
</body>
</html>

