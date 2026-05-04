<?php
$is_ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

function respond($success, $message, $code = 200) {
    global $is_ajax;
    http_response_code($code);
    if ($is_ajax) {
        header('Content-Type: application/json');
        echo json_encode(['success' => $success, 'message' => $message]);
    } else {
        $param = $success ? 'mailsend=success' : 'error=' . urlencode($message);
        header('Location: index.html?' . $param);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['submit'])) {
    respond(false, 'Invalid request.', 400);
}

$name    = trim(filter_input(INPUT_POST, 'name',    FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email   = trim(filter_input(INPUT_POST, 'email',   FILTER_SANITIZE_EMAIL)         ?? '');
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');

if (!$name || !$email || !$message) {
    respond(false, 'All fields are required.', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

$to      = 'aspirarajat155@gmail.com';
$subject = 'Portfolio contact from ' . $name;
$body    = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";
$headers = "From: noreply@rajatsharma.dev\r\nReply-To: {$email}\r\n";

if (mail($to, $subject, $body, $headers)) {
    respond(true, 'Message sent! I will get back to you soon.');
} else {
    respond(false, 'Mail delivery failed. Please email directly.', 500);
}
