<?php

$account = $_POST["Account"];
$pwd = $_POST["Password"];

//登入設定
$dbhost = '127.0.0.1';
$dbuser = 'root';
$dbpass = '1234';
$dbname = 'MotoMaintenance';

//登入連線 含 資料庫
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

mysqli_set_charset($conn,"utf8");

$sql = " 
	SELECT Account
	FROM UserAccount
	WHERE Account = '".$account."' AND 
	Password = '".$pwd."' ";


$result = mysqli_query($conn, $sql);
$result = mysqli_fetch_assoc($result);

if($result == "" or $result == null){
	$result = 0;
}
else{
	$result = 1;
}

print ( $result  );

//關閉連線
mysqli_close($conn);

?>