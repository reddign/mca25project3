<?php
session_start();
?>

<html>
    <head>
        <title>Home - Medieval Studios</title>
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
            </nav>
            <div>
            <img class="image" src="images/knight_face_left.png" width="30%" height="70%" style="float:right">
            </div>
            <div>
            <img class="image" src="images/knight_face_right.png" width="30%" height="70%" style="float:left">
            </div>
            <h1 class="title">Welcome To Medieval Studios!</h1>
            <h3 class="subtitle">Plan your moves. Win the fight.</h3>
        </header>
        <main>
            <p class="description">Prepare for turn-based battles and start your adventure now.</p>
                <h1 class="play"><span class="highlight"><a href="playNow.php">Play Now</span></a></h1>
        </main>
        <footer>
            <p>Copyright 2025. All rights reserved.</p>
        </footer>
    </body>
</html>