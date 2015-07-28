<?php

session_start();

define('502406e2-7845-4606-8029-841c3d88df7e',1);

include_once("conf.php");

$con = new mysqli(conf::$db_server, conf::$db_username, conf::$db_passwd, conf::$db_database);
$con->set_charset("utf8");



if (!isset($_POST['ls'])) die('{success:false, message:"Ошибка в парамметрах. Заполните все поля."}');
if (!isset($_POST['feedback'])) die('{success:false, message:"Ошибка в парамметрах. Заполните все поля."}');


$ls = $_POST['ls'];
$feedback = htmlspecialchars(trim($_POST['feedback']));
$fdate = date('Y-m-d');

if (strlen($feedback) <= 0) die('{success:false, message:"Отзыв не может быть пустым."}');

$resp = $con->query("SELECT * FROM feedback WHERE ls=$ls AND feedbackDate='$fdate'");
if ($resp->num_rows > 0) die('{success:false, message:"К сожалению, по данному адресу сегодня уже оставляли отзыв, попробуйте сделать это завтра. "}');


$resp = $con->query("INSERT INTO feedback (ls,feedbackDate, feedbackText) VALUES ($ls,'$fdate','$feedback')");
echo '{success:true, message:""}';


echo $con->error;

?>