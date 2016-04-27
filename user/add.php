<?php
/**
 * Created by PhpStorm.
 * User: GHostEater
 * Date: 26-Feb-16
 * Time: 11:37 AM
 */
ob_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../conn.php");

$username = $_GET['username'];
$password = $_GET['password'];
$name = $_GET['name'];

$query = "insert into admin VALUES(NULL,'$username','$password','$name')";
mysqli_query($con,$query)or die("Unable To Execute");

header("HTTP/1.0 201 Success");
ob_end_flush();