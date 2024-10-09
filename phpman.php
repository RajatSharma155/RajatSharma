<?php
// Check if form is submitted
if (isset($_POST['submit'])) {
    // Retrieve form data
    $name = $_POST['name'];          // Name from the form
    $subject = $_POST['subject'];    // Subject from the form
    $message = $_POST['message'];    // Message from the form
    $email_from = $_POST['email'];   // Email address of the sender
    
    // Define recipient email address
    $to = "aspirarajat155@gmail.com";  // The recipient email address
    
    // Set email headers
    $headers = "From: " . $email_from . "\r\n";
    
    // Email body content
    $txt = "You have received an email from " . $name . ".\n\n" . $message;
    
    // Send the email
    if (mail($to, $subject, $txt, $headers)) {
        // Redirect to a confirmation page after successful email sending
        header("Location: index.php?mailsend=success");
        exit();
    } else {
        echo "Mail sending failed!";
    }
}
?>
