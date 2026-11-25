<?php
// Configuración para Hostinger
header('Content-Type: text/plain');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar que existan los campos
    if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
        echo "error: Faltan campos requeridos";
        exit;
    }

    $name = trim(htmlspecialchars($_POST['name']));
    $email = trim(htmlspecialchars($_POST['email']));
    $message = trim(htmlspecialchars($_POST['message']));

    // Validar que no estén vacíos
    if (empty($name) || empty($email) || empty($message)) {
        echo "error: Los campos no pueden estar vacíos";
        exit;
    }

    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "error: Email inválido";
        exit;
    }

    // ¡¡¡ IMPORTANTE: Cambiar por tu email real !!!
    $to = "tu-correo@tudominio.com"; // ← CAMBIAR ESTO

    $subject = "Nuevo mensaje desde el formulario de contacto - " . date('Y-m-d H:i:s');
    
    // Mejorar el cuerpo del mensaje
    $body = "Has recibido un nuevo mensaje desde tu formulario de contacto:\n\n";
    $body .= "Nombre: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Fecha: " . date('Y-m-d H:i:s') . "\n\n";
    $body .= "Mensaje:\n" . $message . "\n\n";
    $body .= "---\nEste mensaje fue enviado desde " . $_SERVER['HTTP_HOST'];
    
    // Headers mejorados para Hostinger
    $headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error: No se pudo enviar el mensaje";
    }
} else {
    echo "error: Método no permitido";
}
?>