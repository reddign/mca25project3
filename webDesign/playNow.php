<?php
session_start();
?>

<html>
    <head>
        <title>Play Now - Medieval Studios</title>
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
                            print("<a href='logout.php'>Hello, {$_SESSION['UserID']}!</a>");
                        }else{
                            print("<a href='login.php'>Login/Register</a>");
                        }?>
                    </li>
                </ul>
            </nav><br>
            <canvas style="background-color:#a50034; width: 1000; height: 415"
            onmousedown="press(event)"></canvas>
        </header>
        <footer>
            <p>Copyright 2025. All rights reserved.</p>
        </footer>
    </body>
    <script src="../FinalGame/game.js"></script>
</html>