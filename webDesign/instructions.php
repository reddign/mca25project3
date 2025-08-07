<?php
session_start();
?>

<html>
    <head>
        <title>Instructions - Medieval Studios</title>
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
                            }
                        }else{
                            print("<a href='login.php'>Login/Register</a>");
                        }?>
                    </li>
                </ul>
            </nav>
            <div>
            <img class="image" src="images/scroll.png" width="20%" height="40%" style="float:right; padding: 100px;">
            </div>
            <div>
            <img class="image" src="images/scroll.png" width="20%" height="40%" style="float:left; padding: 100px;">
            </div>
            <h1 class="title"><u>Instructions</u></h1>
            <h3 class="instructions">- Use arrow keys to move around</h3>
            <h3 class="instructions">- When approaching an enemy, the turn-based battle will start</h3>
            <h3 class="instructions">- Coins can be spent to buy upgrades</h3>
            <h3 class="instructions">- As the player progress, they will level up, which can be used to expand their skill tree</h3>
            <h3 class="instructions">- After each run, the player will gain a certain amount of coins based on how far they progress</h3>
            <h3 class="instructions">- The skills in this game consist of health, damage, and mana</h3>
            <h3 class="instructions">- Lastly, we hope you have fun playing the game!</h3>
        </header>
        <footer>
            <p>Copyright 2025. All rights reserved.</p>
        </footer>
    </body>
</html>