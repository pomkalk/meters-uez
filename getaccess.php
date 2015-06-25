<?php

define('502406e2-7845-4606-8029-841c3d88df7e',1);

include_once('conf.php');

$con = new mysqli(conf::$db_server, conf::$db_username, conf::$db_passwd, conf::$db_database);
$con->set_charset("utf8");
$r = $con->query("SELECT * FROM config");



while($l = $r->fetch_assoc())
	$c[$l["name"]] = $l["value"];


//print_r($c);
$d = intval(date("d"));
$t = intval(date("H"));

$ok = false;

if ($d == intval($c["date.start"]))
	if ($t>=intval($c["time.start"])) $ok = true;


if (($d > intval($c["date.start"])) && ($d < intval($c["date.end"]))) $ok = true;

if ($d == intval($c["date.end"]))
	if ($t < intval($c["time.end"])) $ok = true;


if ($ok)
{
	$res = array("success"=>true,"message"=>$c["message"]);
}else{
	$res = array("success"=>false,"message"=>$c["message"]);
}




//Добавление кук для счетчика
if (!isset($_COOKIE["7c84c6e5-c595-46da-b11f-0bd2c1a5d8b4"]))
{
	$dv = date("Y-m-d");
	$r = $con->query("INSERT INTO `visitors` (`visitDate`, `amount`) VALUES ('$dv', 1) ON DUPLICATE KEY UPDATE `amount` = `amount` +1");
	setcookie("7c84c6e5-c595-46da-b11f-0bd2c1a5d8b4", 1, strtotime("tomorrow"));
}





$con->close();

echo json_encode($res);

?>