<?php

$id = $_POST["ID"];

//登入設定
$dbhost = '127.0.0.1';
$dbuser = 'root';
$dbpass = '1234';
$dbname = 'MotoMaintenance';

//登入連線 含 資料庫
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

mysqli_set_charset($conn,"utf8");

$sql = " 
	SELECT PlateNumber PlateNO, ManufactureDate, Brand, MotoProduct Product, Name CustomerName, Gender, Birthday, Address, Phone, CellPhone, MaintenanceDate, RepairItem MaintenanceItem, Money, Detail, IsPayment, Remark
	FROM MaintenanceData
	WHERE MaintenanceDateID = '$id';";

// print ($sql);

$result = mysqli_query($conn, $sql);

$returnArray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $returnArray[] = $row;
    }
print json_encode($returnArray);

//關閉連線
mysqli_close($conn);

?>