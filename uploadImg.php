<?php
/**
 * Created by PhpStorm.
 * User: GHostEater
 * Date: 07-Apr-16
 * Time: 8:01 PM
 */
ob_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../conn.php");

$id = $_POST['id'];
$img = $id.'.jpg';

mysqli_query($con,"UPDATE candidates SET img = '$img' WHERE sn = '$id';");

$destination = '../img/candidates/'.$img;
move_uploaded_file($_FILES['file']['tmp_name'],$destination);