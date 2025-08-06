<?php
session_start();
$_SESSION["LoggedIn"] = "NO";
$_SESSION["UserID"] = ""; 
header("location: login.php");
?>



