<?php

//接收 jQuery ajax 傳來的值 
$plateNO = $_POST['PlateNO'];
$vehicleBrand = $_POST['VehicleBrand'];
$vehicleProduct = $_POST['VehicleProduct'];
$otherBrand = $_POST['OtherBrand'];
$vehicleProduct = $_POST['VehicleProduct'];
$vehicleManufactureDate = $_POST['VehicleManufactureDate'];
$customerName = $_POST['CustomerName'];
$gender = $_POST['Gender'];
$birthday = $_POST['Birthday'];
$address = $_POST['Address'];
$cellphone = $_POST['Cellphone'];
$telephone = $_POST['Telephone'];
$repairDate = $_POST['RepairDate'];
$repairItem = $_POST['RepairItem'];
$repairMoney = $_POST['RepairMoney'];
$repairDetail = $_POST['RepairDetail'];
$isGetMoney = $_POST['IsGetMoney'];
$remark = $_POST['Remark'];
$userID = $_POST['UserID'];

$dbhost = '127.0.0.1';
$dbuser = 'root';
$dbpass = '1234';
$dbname = 'MotoMaintenance';

//登入連線 含 資料庫
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

mysqli_set_charset($conn,"utf8");

if($vehicleBrand == 'o'){
    $vehicleBrand = $otherBrand;
}

if($birthday == ''){
    $birthday = "null";
}
else{
    $birthday = "'$birthday'";
}


//插入欄位			
$sql = "INSERT INTO MaintenanceData 
		(PlateNumber, ManufactureDate, Brand, MotoProduct, Name, Gender, Birthday, Address,Phone, CellPhone, MaintenanceDate, RepairItem, Money, Detail, IsPayment, Remark, ModifyTime, Modifier, CreateTime, Creator) 
		 VALUES ('$plateNO', '$vehicleManufactureDate', '$vehicleBrand', '$vehicleProduct', '$customerName', b'$gender', $birthday, '$address', '$telephone', '$cellphone', '$repairDate', '$repairItem', '$repairMoney', '$repairDetail', $isGetMoney, '$remark', sysdate(), '$userID',  sysdate(), '$userID');";

$conn -> query($sql);

// print ($sql);
print ('1');

mysqli_close($conn);

?>