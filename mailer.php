<?php

    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient = "ben@thewebguys.co.nz";

    // Set the email subject.
    $subject = "Message from HALE website";

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $fname = strip_tags(trim($_POST["fname"]));
    $fname = str_replace(array("\r","\n"),array(" "," "),$fname);

    $phone = strip_tags(trim($_POST["phone"]));
    $phone = str_replace(array("\r","\n"),array(" "," "),$phone);



    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    $message = strip_tags(trim($_POST["message"]));
    $message = str_replace(array("\r","\n"),array(" "," "),$message);
    $message = substr($message,0,5000);


    // Check that data was sent to the mailer.
    if ( empty($fname) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

    // Build the email content.
    $email_content = "Name: $fname\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Message: $message";



    // Build the email headers.
    $email_headers = "Enquiry from AUCKLAND WIDE SERVICES!";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Thank You! We'll be in touch!";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
