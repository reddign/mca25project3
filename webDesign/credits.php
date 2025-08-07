<?php
session_start();
?>

<html>
    <head>
        <title>Credits - Medieval Studios</title>
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
            <img class="image" src="images/shield.png" width="20%" height="50%" style="float:right; padding: 80px;">
            </div>
            <div>
            <img class="image" src="images/shield.png" width="20%" height="50%" style="float:left; padding: 80px;">
            </div>
            <h1 class="title"><u>Credits</u></h1>
            <h3 class="credits">Favicon Image: <a href="https://www.flaticon.com/free-icons/war" title="war icons">War icons created by Freepik - Flaticon</a></h3>
            <h3 class="credits">Home Screen Image: <a href="https://www.rawpixel.com/image/18420251">Created by RawPixel</a></h3>
            <h3 class="credits">Instructions Screen Image: <a href="https://www.vecteezy.com/free-png/medieval-scroll">Medieval Scroll PNGs by Vecteezy</a></h3>
            <h3 class="credits">Credits Screen Image: <a href="https://www.vecteezy.com/free-png/protective-shield">Protective Shield PNGs by Vecteezy</a></h3>
            <h3 class="credits">Leaderboards Screen Image: <a href="https://www.cleanpng.com/png-golden-trophy-for-achievement-8188779/">Created by CleanPNG</a></h3>
            <h3 class="credits">Login/Register Screen Image: <a href="https://toppng.com/free-image/medival-knight-PNG-free-PNG-Images_29205">Created by TopPNG</a></h3>
            <h3 class="credits">Player Image: <a href="https://www.pixilart.com/art/the-pixel-knight-baaa421bd4cda71">Created by PixilArt</a></h3>
            <h3 class="credits">Goblin Image: <a href="https://www.vecteezy.com/free-png/goblin">Goblin PNGs by Vecteezy</a></h3>
        </header>
        <footer><br>
            <p>Copyright 2025. All rights reserved.</p>
        </footer>
    </body>
</html>