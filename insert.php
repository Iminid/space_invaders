
<?php
//Database connection
function getPdo() {
    try {
        $db = new PDO('mysql:host=localhost;dbname=mikhail;', 'mikhail', '20MQfI4w');
        //$db = new PDO('mysql:host=localhost;dbname=game;', 'root', 'root'); //root,root en localhost
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('connection error : ' . $e->getMessage());
    }

    return $db;
}
//$date =date ("y.m.d"); //Optional

//Insert Data
print_r($_POST); 
$db = getPdo();
    try {
        $request = 'INSERT INTO `player` (`pseudo`,`score`,`chrono`) VALUES (:pseudo, :score, :chrono)';
        $insert = $db->prepare($request);
        $insert->execute(['pseudo' => $_POST['pseudo'], 'score' => $_POST['score'], 'chrono' => $_POST['chrono']]);
    } catch (PDOException $e) {
        die($e->getMessage());
    }