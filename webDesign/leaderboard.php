<?php
session_start();
?>

<html>
    <head>
        <title>Leaderboard - Medieval Studios</title>
    </head>
    <link rel="icon" type="image/x-icon" href="images/swords.png">
    <link href="webDesign.css" rel="stylesheet">
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
                        <?php if ($_SESSION["UserID"] != ""){
                            print("<a href='logout.php'>Hello, {$_SESSION['UserID']}</a>");
                        }else{
                            print("<a href='login.php'>Login/Register</a>");
                        }?>
                    </li>
                </ul>
            </nav>
            <div>
            <img class="image" src="images/trophy.png" width="20%" height="40%" style="float:right; padding: 100px;">
            </div>
            <div>
            <img class="image" src="images/trophy.png" width="20%" height="40%" style="float:left; padding: 100px;">
            </div>
            <h1 class="title"><u>Leaderboard</u></h1>
        </header><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <footer>
            <p>Copyright 2025. All rights reserved.</p>
        </footer>
    </body>
</html>