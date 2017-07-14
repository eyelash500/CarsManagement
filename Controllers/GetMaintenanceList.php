<?php

$plate_NO = $_POST["Plate_NO"];
$date = $_POST["Date"];

//登入設定
$dbhost = '127.0.0.1';
$dbuser = 'root';
$dbpass = '1234';
$dbname = 'MotoMaintenance';

//登入連線 含 資料庫
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

mysqli_set_charset($conn,"utf8");

$sql_where = "";


if($date == null or $date == ""){
    $sql = " 
	SELECT MaintenanceDateID ID, MaintenanceDate MaintenanceDate, PlateNumber PlateNO, RepairItem RepairItem, Detail Detial, Money Money
	FROM MaintenanceData
	WHERE PlateNumber LIKE '%".$plate_NO."%';";
}
else{
    $sql = " 
	SELECT MaintenanceDateID ID, MaintenanceDate MaintenanceDate, PlateNumber PlateNO, RepairItem RepairItem, Detail Detial, Money Money
	FROM MaintenanceData
	WHERE PlateNumber LIKE '%".$plate_NO."%' AND 
	MaintenanceDate = '".$date."';";
}


$result = mysqli_query($conn, $sql);

$returnArray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $returnArray[] = $row;
    }
print json_encode($returnArray);

//關閉連線
mysqli_close($conn);

?>