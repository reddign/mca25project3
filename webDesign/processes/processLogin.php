<?php
session_start();
//Process the login for the website

$u = $_POST["user"];
$p = $_POST["password"];
// echo $_SERVER['HTTP_HOST'];

//Connects to database

if($_SERVER['HTTP_HOST']=="127.0.0.1"){
    $mysqli = new mysqli("127.0.0.1","root","","mca");
}else{
    $mysqli = new mysqli("195.35.59.14","u121755072_medieval","/mL^Q#hU88","u121755072_medievaldb");
}

if ($mysqli->connect_errno){
    echo "Failed to connect to MYSQL: " . $mysqli->connect_error;
    exit;
}

//Build a SQL statement
$sql = "SELECT * FROM users 
where username='{$u}' and bestpassword = SHA2(CONCAT('{$p}', 'ocean'), 224);";


//3. Send the SQL message and get results

$result = $mysqli -> query($sql);
$rows = $result -> fetch_all(MYSQLI_ASSOC);

// print_r($rows);

//4. See if there is a row (user with the password)



if (is_array($rows) && array_key_exists(0, $rows)){
    //do something here to keep user logged in
    $_SESSION["LoggedIn"] = "YES";
    $_SESSION["UserID"] = $u; 
    header("location: ../homePage.php");
}else{
    $_SESSION["LoggedIn"] = "NO";
    $_SESSION["UserID"] = ""; 
    header("location: ../login.php?message=Incorrect Username or Password");
}


print_r($_SESSION);


?>