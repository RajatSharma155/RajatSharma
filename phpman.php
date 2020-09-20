<?php
if (isset($POST['submit']))
{
    $name = $_POST['name'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	$email_form = $POST['mail'];
	
	$to = "aspirarajat155@gmail"
	$headers = "From:" .$email_from "\r\n";
    $txt = "You have received an email from" .$name.".\n\n".$message;
	mail($to, $subject, $txt, $headers);
	header("Location: index.php?mailsend");
}
?>
	
	
	
