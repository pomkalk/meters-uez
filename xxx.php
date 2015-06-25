<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

/*

function send($host, $port, $login, $password, $phone, $text, $sender = false, $wapurl = false )
{
	$fp = fsockopen($host, $port, $errno, $errstr);
	if (!$fp)
	{
		return "errno: $errno \nerrstr: $errstr\n";
	}
	fwrite($fp, "GET /send/" .
		"?phone=" . rawurlencode($phone) .
		"&text=" . rawurlencode($text) .
		($sender ? "&sender=" . rawurlencode($sender) : "") .
		($wapurl ? "&wapurl=" . rawurlencode($wapurl) : "") .
		"  HTTP/1.0\n");

	fwrite($fp, "Host: " . $host . "\r\n");
	if ($login != "") {
		fwrite($fp, "Authorization: Basic " . 
			base64_encode($login. ":" . $password) . "\n");
	}
	fwrite($fp, "\n");
	$response = "";
	while(!feof($fp)) {
		$response .= fread($fp, 1);
	}
	fclose($fp);
	list($other, $responseBody) = explode("\r\n\r\n", $response, 2);
	return $responseBody;
}


function senders($host, $port, $login, $password)
{
	$fp = fsockopen($host, $port, $errno, $errstr);
	if (!$fp)
	{
		return "errno: $errno \nerrstr: $errstr\n";
	}
	fwrite($fp, "GET /senders/ HTTP/1.0\n");

	fwrite($fp, "Host: " . $host . "\r\n");
	if ($login != "") {
		fwrite($fp, "Authorization: Basic " . 
			base64_encode($login. ":" . $password) . "\n");
	}
	fwrite($fp, "\n");
	$response = "";
	while(!feof($fp)) {
		$response .= fread($fp, 1);
	}
	fclose($fp);
	list($other, $responseBody) = explode("\r\n\r\n", $response, 2);
	return $responseBody;
}

//echo senders("gate.prostor-sms.ru", 80, "t89832226762", "932237");
echo send("gate.prostor-sms.ru", 80, "t89832226762", "932237", "79832223535", "Hohoho", "inform");
*/

echo "get: ";
print_r($_GET);
echo "post: ";
print_r($_POST);
echo "files: ";
print_r($_FILES);
echo "HTTP_RAW_POST_DATA: ";
print_r(json_decode($HTTP_RAW_POST_DATA));
echo "server: ";
print_r($_SERVER);


$a = json_decode($HTTP_RAW_POST_DATA);

if ($a->successz)
{
	echo "ASD";
}


?>