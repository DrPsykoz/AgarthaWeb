<?php

$host = "localhost"; 
$user = "drpsykoz"; 
$password = "debianAmiens*$"; 
$dbname = "network_minecraft"; 

$con = mysqli_connect($host, $user, $password,$dbname);

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

$username = $_POST["username"];
$type = $_POST["type"];
$amount = $_POST["amount"];

$sql = "insert into shop_sales (username, type, amount) values ('$username', '$type', '$amount')"; 

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

echo json_encode($result);

$con->close();

?>