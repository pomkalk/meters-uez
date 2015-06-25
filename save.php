<?php

define('502406e2-7845-4606-8029-841c3d88df7e',1);

include_once("conf.php");

$con = new mysqli(conf::$db_server, conf::$db_username, conf::$db_passwd, conf::$db_database);
$con->set_charset("utf8");



if (!isset($_POST['ls'])) die('{success:false, message:"Неверные параметры"}');
if (!isset($_POST['meter'])) die('{success:false, message:"Неверные параметры"}');
if (!isset($_POST['currentValue'])) die('{success:false, message:"Неверные параметры"}');

$ls = intval($_POST['ls']);
$meter = intval($_POST['meter']);
$nv = (float)str_replace(",",".",$_POST['currentValue']);

$resp = $con->query("UPDATE meters SET currentValue = $nv, currentValueDate = NOW() WHERE ls = $ls and meterId = $meter");

if ($con->affected_rows == 1)
{
	echo '{success:true, message:"ok"}';
}else{
	die('{success:false, message:"Не обновлен."}');
}


?>