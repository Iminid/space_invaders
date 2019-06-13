<!DOCTYPE html>
<head>
    <meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="stylesheet" type="text/css" href="style.css" />
<title>Space Invaders</title>
</head>
<body>
    
    <div id="all-result">
    <p>Liste des joueurs</p>
    <a href="index.php" id="button" value="Valider">Recommencer</a>
    <?php
        include 'database.php';
        $db =  getPdo();
showScores($db); //Function call
function showScores(PDO $db) { 

    
    try {
     $response = $db->prepare('SELECT * FROM `player` ORDER BY score DESC LIMIT 20'); 
     $response -> execute();
     } catch (Exception $ex) {

 }
 
 
 
 $i=1;
     $lines=$response->fetchAll();
     
     
     
      echo '<table>';
      echo              '<tr>';
      echo              '<th>id</th>';
      echo              '<th>joueur</th>';
      echo              '<th>score</th>';
      echo              '<th>chrono</th>';
      
      echo              '</tr>';
          
            foreach ($lines as $line){
            
                echo         '<tr>';
                echo              '<th>'.$i.'</th>';
                echo              '<th>'.$line['pseudo'].'</th>';
                echo              '<th>'.$line['score'].'</th>';
                echo              '<th>'.$line['chrono'].'</th>';
              
                echo          '</tr>';
                $i++; 
           } 
            
        
      echo  '</table>';

}
    ?>
    
    
   
</div>
    
    
    
    <script src="js/jquery-3.4.1.js" type="text/javascript"></script>
    <script src="js/jquery-ui.js" type="text/javascript"></script>
    <script src="js/ajax.js" type="text/javascript"></script>
    <script src="js/functions.js" type="text/javascript"></script>
    <script src="js/game.js" type="text/javascript"></script>
</body>