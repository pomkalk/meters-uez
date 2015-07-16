<?php

session_start();

define('502406e2-7845-4606-8029-841c3d88df7e',1);

include_once("conf.php");

$con = new mysqli(conf::$db_server, conf::$db_username, conf::$db_passwd, conf::$db_database);
$con->set_charset("utf8");

$resp = $con->query("SELECT s.street, b.num, b.corp, a.kv, a.lit, a.ls, f.feedbackDate, f.feedbackText FROM streets as s, buildings as b, appartments as a, feedback as f WHERE s.id=b.idStreet AND b.id=a.idBuilding AND a.ls=f.ls ORDER BY f.feedbackDate DESC, f.id DESC");


$data = array();
while ($lsInfo = $resp->fetch_assoc())
{
		$address = $lsInfo['street'].", д. ".$lsInfo['num'].(strlen($lsInfo['corp'])>0?"/".$lsInfo['corp']:"").", кв. ".$lsInfo['kv'].(strlen($lsInfo['lit'])>0?"/".$lsInfo['lit']:"")." (".$lsInfo['ls'].")";

 			array_push($data, array(
 				"address"=>$address,
 				"date"=>$lsInfo['feedbackDate'],
 				"feedback"=>$lsInfo['feedbackText']
 			));
}

 $js = array(
 		"success"=> true,
 		"data"=> $data
 	);
echo json_encode($js);

?>