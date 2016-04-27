<?php
/**
 * Created by PhpStorm.
 * User: GHostEater
 * Date: 14-Apr-16
 * Time: 1:22 PM
 */
ob_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("conn.php");

$username = $_GET['username'];
$password = $_GET['password'];

$query = "SELECT * FROM admin WHERE username = '$username'";
$result = mysqli_query($con,$query)or die("Unable To Execute");
$n_rows = mysqli_num_rows($result);
$loginArr = '';

if($n_rows > 0){
    $query2 = "SELECT * FROM admin WHERE username = '$username' AND password = '$password'";
    $result2 = mysqli_query($con,$query2)or die("Unable To Execute");
    $n_rows2 = mysqli_num_rows($result2);

    if($n_rows2 > 0){
        while($row = mysqli_fetch_assoc($result2)){
            $loginArr = [
                'id' => $row['sn'],
                'username' => $row['username'],
                'name' => $row['name'],
                'systemRank' => 1
            ];
        }
        header("HTTP/1.0 201 Success");
        echo json_encode($loginArr);
    }
    else{
        header("HTTP/1.0 402 Incorrect Password");
    }
}
else{
    $query = "SELECT * FROM student_info WHERE matric_no = '$username'";
    $result = mysqli_query($con,$query)or die("Unable To Execute");
    $n_rows = mysqli_num_rows($result);

    if($n_rows > 0){
        $query2 = "SELECT * FROM student_info WHERE matric_no = '$username' AND password = '$password'";
        $result2 = mysqli_query($con,$query2)or die("Unable To Execute");
        $n_rows2 = mysqli_num_rows($result2);

        if($n_rows2 > 0){
            while($row = mysqli_fetch_assoc($result2)){
                $collegeId = $row['collegeId'];
                $departmentId = $row['departmentId'];
                $majorId = $row['majorId'];

                $query = "select * from college WHERE sn='$collegeId'";
                $result3  = mysqli_query($con,$query)or die("Unable To Execute");

                while($row3 = mysqli_fetch_assoc($result3)){

                    $query = "select * from department WHERE sn='$departmentId'";
                    $result4  = mysqli_query($con,$query)or die("Unable To Execute");

                    while($row4 = mysqli_fetch_assoc($result4)){
                        $query = "select * from major WHERE sn='$majorId'";
                        $result5  = mysqli_query($con,$query)or die("Unable To Execute");

                        while($row5 = mysqli_fetch_assoc($result5)){

                            $college = $row3['name'];
                            $department = $row4['name'];
                            $major = $row5['name'];

                            $loginArr = [
                                'id' => $row['matric_no'],
                                'matric_no' => $row['matric_no'],
                                'lastName' => $row['last_name'],
                                'middleName' => $row['middle_name'],
                                'firstName' => $row['first_name'],
                                'college' => $college,
                                'department' => $department,
                                'major' => $major,
                                'level' => $row['level'],
                                'modeOfEntry' => $row['mode_of_entry'],
                                'session' => $row['session'],
                                'dateBirth' => $row['dob'],
                                'email' => $row['email'],
                                'address' => $row['address']
                            ];
                        }
                    }
                }
            }
            header("HTTP/1.0 201 Success");
            echo json_encode($loginArr);
        }
        else{
            header("HTTP/1.0 402 Incorrect Password");
        }
    }
    else{
        $query = "SELECT * FROM lecturer_info WHERE email = '$username'";
        $result = mysqli_query($con,$query)or die("Unable To Execute");
        $n_rows = mysqli_num_rows($result);

        if($n_rows > 0){
            $query2 = "SELECT * FROM lecturer_info WHERE email = '$username' AND password = '$password'";
            $result2 = mysqli_query($con,$query2)or die("Unable To Execute");
            $n_rows2 = mysqli_num_rows($result2);

            if($n_rows2 > 0){
                while($row = mysqli_fetch_assoc($result2)){
                    $loginArr = [
                        'id' => $row['sn'],
                        'username' => $row['username'],
                        'name' => $row['name']
                    ];
                }
                header("HTTP/1.0 201 Success");
                echo json_encode($loginArr);
            }
            else{
                header("HTTP/1.0 402 Incorrect Password");
            }
        }
        else{
            header("HTTP/1.0 401 Incorrect Username");
        }
    }
}
ob_end_flush();