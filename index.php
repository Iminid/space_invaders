<!DOCTYPE html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="stylesheet" type="text/css" href="style.css" />
<title>Space Invaders</title>
<style>


</style>
</head>
<body>
    <header class="v-header container">
        <div class="fullscreen-wrap">
           <video autoplay muted loop src="img/stars-background.mp4">
           </video> 
        </div>
        <div class="overlay"></div>
        <div class="content">
            <img id="logo" src="img/logo.png" alt="logo">
            <h1>SPACE INVADERS</h1>
            <p>Choisissez votre pseudo :</p>
            <p id="check"></p>
            <audio id="univers" src="sounds/Space.mp3"></audio>
            <audio id="blind" src="sounds/Blind_Shift.mp3"></audio>
            <audio id="musica" src="sounds/Musica_Universalis.ogg"></audio>
            <form>
            <input id="inputRegex" type="text">
            </form>
            
            <a href="#" id="button" value="Valider">Commencer</a>
            <a href="https://mikhail.bes-webdeveloper-seraing.be/portfolio/" target="_blank"><p class="myname"> Créé par Mikhail Baranov</p></a>
            <div id="test1"></div>
        </div>
    </header>
    

<canvas id="mycanvas" width="1200" height="800" >
    <img src="img/rocket2.png" id="missiles"  alt="missiles">
</canvas>
<p id="pause">PAUSE</p>

<div id="result">
   <p id="check2"></p>
   <p id="check3"></p>
    <ul>
        <li id="playerName"></li>
        <li id="playerScore"></li>
        <li id="playerChrono"></li>
        <li></li>
    </ul>
    <a href="result.php" id="button-r" value="Valider">Voir les resultats</a>
</div>




<script src="js/jquery-3.4.1.js" type="text/javascript"></script>
<script src="js/jquery-ui.js" type="text/javascript"></script>
<script src="js/ajax.js" type="text/javascript"></script>
<script src="js/functions.js" type="text/javascript"></script>
<script src="js/game.js" type="text/javascript"></script>
</body>
</html>