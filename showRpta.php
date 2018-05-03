<?php
session_start();
/*
require_once 'util/Session.php';
*/

/* 
//Remplazo de session.php
$rpta = Session::getAttribute2("rpta");

*/
$rpta = $_SESSION["rpta"];
$salida = json_encode($rpta);
echo($salida);

?>