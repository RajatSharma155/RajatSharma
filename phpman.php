<?php
    $name = S_POST['name'];
	$visitor_email = $_POST['email'];
	$message = $_POST['message'];
	$email_form = 'cyberlinkrajat155@gmail.com';
	$email_subject = "Linking With you";
	$email_body = "User Name: $name\n". "User Email: $visitor_email.\n". "UserMessage: $message.\n';
	
	$to = "aspirarajat155@gmail"
	$headers = "From: $email_from \r\n";
	$headers = "Reply-To: $visitor_email \r\n";
	mail($to, email_subject, $email_body, $headers);
	header("Location: inderx.html);

?>
	
	