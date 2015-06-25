<?php

define('502406e2-7845-4606-8029-841c3d88df7e',1);

include_once('conf.php');

$con = new mysqli(conf::$db_server, conf::$db_username, conf::$db_passwd, conf::$db_database);
$con->set_charset("utf8");
$resp = $con->query("SELECT * FROM visitors ORDER BY visitDate DESC");

$visitors = array();
while ($row = $resp->fetch_assoc())
{
		array_push($visitors, array("date"=>$row["visitDate"], "amount"=>$row["amount"]));
}


$resp = $con->query("SELECT currentValueDate, count(ls) as amount FROM (SELECT DISTINCT currentValueDate, ls FROM meters WHERE currentValue>0) AS a GROUP BY currentValueDate ORDER BY currentValueDate DESC");
$upd = array();
while ($row = $resp->fetch_assoc())
{
	array_push($upd, array("date"=>$row["currentValueDate"], "amount"=>$row["amount"]));
}

echo json_encode(array("success"=> true, "visitors"=>$visitors, "updates"=>$upd));


?>