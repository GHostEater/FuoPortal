<?php
/**
 * Created by PhpStorm.
 * User: GHostEater
 * Date: 26-Feb-16
 * Time: 11:42 AM
 */
ob_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../conn.php");
$id = $_GET['id'];
$username = $_GET['username'];
$password = $_GET['password'];
$name = $_GET['name'];

$query = "UPDATE admin SET username='$username',password='$password',name='$name' where sn = '$id'";
mysqli_query($con,$query)or die("Unable To Execute");

header("HTTP/1.0 201 Success");
ob_end_flush();