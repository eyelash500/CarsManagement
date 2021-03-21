<?php

//接收 jQuery ajax 傳來的值 
print (1);

$id = $_POST['ID'];
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
$date = $_POST['Date'];
$item = $_POST['Item'];
$money = $_POST['Money'];
$detail = $_POST['Detail'];
$isGetMoney = $_POST['IsGetMoney'];
$remark = $_POST['Remark'];
$userID = $_POST['UserID'];
print (2);

$dbhost = '127.0.0.1';
$dbuser = 'root';
$dbpass = '1234';
$dbname = 'MotoMaintenance';

//登入連線 含 資料庫
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
print (3);

mysqli_set_charset($conn,"utf8");
print (4);

if($vehicleBrand == 'o'){
    $vehicleBrand = $otherBrand;
}

if($birthday == ''){
    $birthday = "null";
}
else{
    $birthday = "'$birthday'";
}

print (5);

//插入欄位			
$sql = "UPDATE MaintenanceData SET 
		PlateNumber = '$plateNO', ManufactureDate ='$vehicleManufactureDate', Brand = '$vehicleBrand', MotoProduct = '$vehicleProduct', Name = '$customerName', Gender = b'$gender', Birthday = $birthday, Address = '$address', Phone = '$telephone', CellPhone = '$cellphone', MaintenanceDate = '$date', RepairItem = '$item', Money = '$money', Detail = '$detail', IsPayment = $isGetMoney, Remark = '$remark', Modifier = '$userID'
        WHERE MaintenanceDateID = $id;";

print (6);

$conn -> query($sql);

// print ($sql);
print ('1');

mysqli_close($conn);

?>