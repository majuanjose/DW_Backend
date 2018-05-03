<?php
session_start();


$action = $_REQUEST["action"];
$controller = new Buscador();
$target = call_user_func(array($controller,$action));
header("location: $target");
return;

class Buscador {




	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	    public function consulta_Info(){


	 try{


		 $data = file_get_contents("data-1.json");


	//	  $nameFile = "data-1.json";
	//	  $file = fopen($nameFile, "r");
	//	  $data = fread($file, filesize($nameFile));
		  $dataArray = json_decode($data);
		  $newData = array();

		  if(isset($_POST["ciudad"]) && isset($_POST["tipo"]) && isset($_POST["from"]) && isset($_POST["to"])){
		 	 $ciudad = $_POST["ciudad"];
		 	 $tipo = $_POST["tipo"];
		 	 $from = $_POST["from"];
		 	 $to = $_POST["to"];

		 	 for($i=0; $i < count($dataArray); $i++){
		 		 $newPrecio = str_replace('$', '', str_replace(',', '', str_replace(' ', '', $dataArray[$i]->Precio)));
		 		 if($newPrecio >= $from && $newPrecio <= $to && $dataArray[$i]->Ciudad == $ciudad && $dataArray[$i]->Tipo == $tipo){
		 			 array_push($newData, $dataArray[$i]);
		 		 }else if($newPrecio >= $from && $newPrecio <= $to && $dataArray[$i]->Ciudad == $ciudad && $tipo == ""){
		 			 array_push($newData, $dataArray[$i]);
		 		 }else if($newPrecio >= $from && $newPrecio <= $to && $dataArray[$i]->Tipo == $tipo && $ciudad == ""){
		 			 array_push($newData, $dataArray[$i]);
		 		 }else if($newPrecio >= $from && $newPrecio <= $to && $ciudad == "" && $tipo == ""){
		 			 array_push($newData, $dataArray[$i]);
		 		 }
		 	 }
		 	// echo json_encode($newData);

			 $recRpta["estatus"] = 1;
				$recRpta["MensajeProcesado"] =  "Procesado ok (Con Filtros)";
				$recRpta["Datos"] = $newData;

		  }else if(isset($_POST["todos"])){
		 	// echo $data;
			 $recRpta["estatus"] = 1;
				$recRpta["MensajeProcesado"] =  "Procesado ok";
				$recRpta["Datos"] =  $dataArray;
		  }

		 // fclose($file);


	 }catch (Exception $e) {
		 $recRpta["estatus"] = -1;
		 $recRpta["message"] = $e->getMessage();
	 }


	 // $salida =  json_encode($recRpta);
		//echo($salida);


	 $_SESSION["rpta"] =   $recRpta;
	 return "showRpta.php";



			}



			public function consulta_Ciudades(){
		 try{

    /*
		$colores = array("rojo", "azul", "verde", "amarillo");
			// echo json_encode($newData);

			$recRpta["estatus"] = 1;
			 $recRpta["MensajeProcesado"] =  "Procesado ok (Con Filtros)";
			 $recRpta["Datos"] = $colores;

		*/

		 $data = file_get_contents("data-1.json");
		$dataArray = json_decode($data);
		$newData = array();

				$cadena = "";


		/*
		for($i=0; $i < count($dataArray); $i++){

				 if (in_array($dataArray[$i]->Ciudad, $newData)) {
				// echo "La ciudad  ya esta en el arreglo";
			}else{
			//	$cadena  = $cadena." - ".$dataArray[$i]->Ciudad;
				 array_push($newData, $dataArray[$i]->Ciudad);
			 }

		}
		*/

$valor = 0;

		for($i=0; $i < count($dataArray); $i++){
				 array_push($newData, $dataArray[$i]->Ciudad);
				 $valor  = $valor  + $i;
			 }

$resultado = array_unique($newData);



		$recRpta["estatus"] = 1;
		 $recRpta["MensajeProcesado"] =  "Procesado :".$valor ;
		 $recRpta["Datos"] = $resultado;


		 // fclose($file);


		 }catch (Exception $e) {
		 $recRpta["estatus"] = -1;
		 $recRpta["message"] = $e->getMessage();
		 }


		 // $salida =  json_encode($recRpta);
		 //echo($salida);


		 $_SESSION["rpta"] =   $recRpta;
		 return "showRpta.php";



		  }


	}
