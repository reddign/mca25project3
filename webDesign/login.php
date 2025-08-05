<html>
    <head>
        <title>Login - Medieval Studios</title>
    </head>
    <link rel="icon" type="image/x-icon" href="images/swords.png">
    <link href="webDesign.css" rel="stylesheet">
    <link href="login.css" rel="stylesheet">
    <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="homePage.htm">Home</a>
                    </li>
                    <li>
                        <a href="instructions.htm">How To Play</a>
                    </li>
                    <li>
                        <a href="credits.htm">Credits</a>
                    </li>
                    <li>
                        <a href="leaderboard.htm">Leaderboard</a>
                    </li>
                    <li style="float: right">
                        <a  href="login.php">Login/Register</a>
                    </li>
                    <li style="float: right">
                        <a href="">Coins: {10}</a>
                    </li>
                </ul>
            </nav>
        </header>
        <div class="container">
        <form id="login" method="post" action="processes/processlogin.php">
        <label for="user" class="fields">Username: </label>
        <input type="text" id="user" name="user"/><br>
        <label for="password" class="fields">Password: </label>
        <input type="password" id="password" name="password"/><br>
        <br/>
        <button onclick="login(event);">Login</button>
        </form>
        <h1 class="subtitle">New User? Click <a href="register.php">here</a> to register!</h1>
        <main>
        </main>
    </body>
</html>