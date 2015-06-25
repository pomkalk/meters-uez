<?php

define('502406e2-7845-4606-8029-841c3d88df7e',1);

include_once("conf.php");

$con = new mysqli(conf::$db_server, conf::$db_username, conf::$db_passwd, conf::$db_database);
$con->set_charset("utf8");

if (isset($_POST['action']))
{
	$act = $_POST['action'];
	if (is_numeric($act))
	{
		switch ($act) {
			case 0:
				$resp = $con->query("SELECT * FROM streets ORDER BY street");

				if ($resp->num_rows > 0)
				{
					$data = array();
					while ($row = $resp->fetch_assoc())
					{
						array_push($data, array("idStreet"=>$row['id'], "street"=>$row['street']));
					}
					$res = array("success"=>true, "data"=> $data);
				}else{
					$res = array("success"=>false,"message"=>"streets пуста");	
				}
				break;
			case 1:
				if (isset($_POST['idStreet']))
				{
					$idStreet = $_POST['idStreet'];
					if (is_numeric($idStreet))
					{
						$resp = $con->query("SELECT * FROM buildings WHERE idStreet=".$idStreet." ORDER BY num, corp");

					if ($resp->num_rows > 0)
					{
						$data = array();
						while ($row = $resp->fetch_assoc())
						{
							array_push($data, array("idBuilding"=>$row['id'], "buildingNumber"=>$row['num'].(strlen($row['corp'])>0?"/".$row['corp']:"")));
						}
						$res = array("success"=>true, "data"=> $data);
					}else{
						$res = array("success"=>false,"message"=>"streets пуста");	
					}

					}else{
						$res = array("success"=>false,"message"=>"Неверный параметр");		
					}
				}else{
					$res = array("success"=>false,"message"=>"Неверный параметр");	
				}
				break;
			case 2:
				if (isset($_POST['idBuilding']))
				{
					$idBuilding = $_POST['idBuilding'];
					if (is_numeric($idBuilding))
					{
						$resp = $con->query("SELECT * FROM appartments WHERE idBuilding=".$idBuilding." ORDER BY kv, lit");

					if ($resp->num_rows > 0)
					{
						$data = array();
						while ($row = $resp->fetch_assoc())
						{
							array_push($data, array("idLs"=>$row['ls'], "kv"=>$row['kv'].(strlen($row['lit'])>0?"/".$row['lit']:"")));
						}
						$res = array("success"=>true, "data"=> $data);
					}else{
						$res = array("success"=>false,"message"=>"streets пуста");	
					}

					}else{
						$res = array("success"=>false,"message"=>"Неверный параметр");		
					}
				}else{
					$res = array("success"=>false,"message"=>"Неверный параметр");	
				}
				break;
			default:
				$res = array("success"=>false,"message"=>"Неверный параметр");
				break;
		}

		echo json_encode($res);
	}
}


?>