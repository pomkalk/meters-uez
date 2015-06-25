<?php

session_start();

define('502406e2-7845-4606-8029-841c3d88df7e',1);

include_once("conf.php");

$con = new mysqli(conf::$db_server, conf::$db_username, conf::$db_passwd, conf::$db_database);
$con->set_charset("utf8");

if (!isset($_POST['streetId'])) die('{success:false, message:"Ошибка в парамметрах поиска. Заполните все поля."}');
if (!isset($_POST['buildingId'])) die('{success:false, message:"Ошибка в парамметрах поиска. Заполните все поля."}');
if (!isset($_POST['appartmentId'])) die('{success:false, message:"Ошибка в парамметрах поиска. Заполните все поля."}');
if (!isset($_POST['lsId'])) die('{success:false, message:"Ошибка в парамметрах поиска. Заполните все поля."}');
if (!isset($_POST['space'])) die('{success:false, message:"Ошибка в парамметрах поиска. Заполните все поля."}');
if (!isset($_POST['captcha'])) die('{success:false, message:"Ошибка в парамметрах поиска. Заполните все поля."}');

if ($_SESSION['captcha']['code'] != $_POST['captcha']) die('{success:false, message:"Введен неверный код с картинки"}');


$streetId = intval($_POST['streetId']);
$buildingId = intval($_POST['buildingId']);
$appartmentId = intval($_POST['appartmentId']);
$lsId = intval($_POST['lsId']);
$space = (float)str_replace(",",".",$_POST['space']);

if ($appartmentId != $lsId) die('{success:false, message:"Введен неверный лицевой счет."}');




$resp = $con->query("SELECT a.ls, s.street, b.num, b.corp, a.kv, a.lit, a.space FROM appartments as a, buildings as b, streets as s WHERE a.ls=$lsId AND a.idBuilding = $buildingId AND CAST(a.space AS DECIMAL(20,3)) = CAST($space AS DECIMAL(20,3)) AND b.id = a.idBuilding AND s.id = b.idStreet");

if ($resp->num_rows != 1) die('{success:false, message:"К сожалению данный адрес не найден. Возможно Вы ввели некорректные данные. Обращаем Ваше внимание, что необходимо заполнить все данные корректно. Указывать площадь необходимо в соответствии с площадью указанной в Вашем счете на оплату жилищно-коммунальных услуг."}');

$lsInfo = $resp->fetch_assoc();
$windowHeader = $lsInfo['street'].", д. ".$lsInfo['num'].(strlen($lsInfo['corp'])>0?"/".$lsInfo['corp']:"").", кв. ".$lsInfo['kv'].(strlen($lsInfo['lit'])>0?"/".$lsInfo['lit']:"")." (".$lsInfo['ls'].")";

$resp = $con->query("SELECT m.ls, m.meterId, s.type, m.lastValueDate, m.lastValue, m.currentValueDate, m.currentValue FROM meters as m, service as s WHERE m.type=s.id AND m.ls=$lsId");

if ($resp->num_rows<=0) die('{success:false, message:"К сожалению счетчиков по адресу '.$windowHeader.' не найдено."}');

$data = array();
while ($row = $resp->fetch_assoc())
	{
		array_push($data, array(
				"ls"=>$row['ls'],
				"meter"=>$row['meterId'],
				"service"=>$row['type'],
				"lastValueDate"=>$row['lastValueDate'],
				"lastValue"=>$row['lastValue'],
				"currentValueDate"=>$row['currentValue'],
				"currentValue"=>$row['currentValue']
			));
	}
$js = array(
		"success"=> true,
		"address"=>$windowHeader,
		"data"=> $data
	);
echo json_encode($js);
?>