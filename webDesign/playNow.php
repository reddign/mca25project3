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
                        <?php if (array_key_exists("UserID", $_SESSION)){
                            if ($_SESSION["UserID"] != ""){
                            print("<a href='logout.php'>Hello, {$_SESSION['UserID']}!</a>");
                            }else{
                                print("<a href='login.php'>Login/Register</a>");
                            }
                        }else{
                            print("<a href='login.php'>Login/Register</a>");
                        }?>
                    </li>
                </ul>
            </nav><br>
            <canvas style="background-color:#a50034; width: 1000; height: 415"
            onmousedown="press(event)"></canvas>
    <img style="height: 0px;" src="Game_images/map.png" id="map">
    <img style="height: 0px;" src="Game_images/knight.png" id="knight">
    <img style="height: 0px;" src="Game_images/gob.png" id="goblin">
    <script src="../FinalGame/game.js"></script>
        </header>
    </body>
</html>