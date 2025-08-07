<?php
session_start();
?>

<html>
    <head>
        <title>Register - Medieval Studios</title>
    </head>
    <link rel="icon" type="image/x-icon" href="images/swords.png">
    <link href="webDesign.css" rel="stylesheet">
    <link href="register.css" rel="stylesheet">
    <script src="register.js"></script>
    <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="homePage.php">Home</a>
                    </li>
                    <li>
                        <a href="instructions.php">How To Play</a>
                    </li>
                    <li>
                        <a href="credits.php">Credits</a>
                    </li>
                    <li>
                        <a href="leaderboard.php">Leaderboard</a>
                    </li>
                    <li style="float: right">
                        <?php if (array_key_exists("UserID", $_SESSION)){
                            if ($_SESSION["UserID"] != ""){
                            print("<a href='logout.php'>Hello, {$_SESSION['UserID']}!</a>");
                            }
                        }else{
                            print("<a href='login.php'>Login/Register</a>");
                        }?>
                    </li>
                </ul>
            </nav>
        </header>
        <div>
        <img class="image" src="images/medieval_knight_face_left.png" width="24%" height="50%" style="float:right; padding-top: 20px;">
        </div>
        <div>
        <img class="image" src="images/medieval_knight_face_right.png" width="24%" height="50%" style="float:left; padding-top: 20px;">
        </div>
        <div class="container">
        <form id="login" method="post" action="../webDesign/processes/processRegister.php">
        <label for="user" class="registerText">Username: </label>
        <input type="text" id="user" name="user"/><br>
        <label for="password" class="registerText">Password: </label>
        <input type="password" id="password" name="password"/><br>
        <label for="email" class="registerText">Email: </label>
        <input type="text" id="email" name="email"/><br>
        <br/>
        <button onclick="login(event);">Register</button>
    </form>
        <h1 class="registerSubtitle">Have an account? Click <a href="login.php">here</a> to login!</h1>
        <footer>
            <p>Copyright 2025. All rights reserved.</p>
        </footer>
    </body>
</html>