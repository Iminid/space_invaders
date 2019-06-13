<?php

function getPdo() {
    try {
        $db = new PDO('mysql:host=localhost;dbname=mikhail;', 'mikhail', '20MQfI4w');
        //$db = new PDO('mysql:host=localhost;dbname=mikhail;', 'mikhail', '20MQfI4w'); //root,root en localhost
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('connection error : ' . $e->getMessage());
    }
    return $db;
   
}

