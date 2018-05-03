

    document.getElementById('btnBuscar').addEventListener('click',validaDatos);
    document.getElementById('btnMostrarTodos').addEventListener('click',consulta_todos);


function load(){
  consulta_Ciudades();
  //fn_cargaColores();

}




function obtieneRango(num){
  var numero = num
  var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
  return newNumero
}


  function validaDatos(){

 console.log("ValidaDatos")
  var p_ciudad = $('form').find('select[id="selectCiudad"]').val()
  var p_tipo = $('form').find('select[id="selectTipo"]').val()
  var p_from = obtieneRango($('.irs-from').text())
  var p_to = obtieneRango($('.irs-to').text())

  if(p_ciudad == undefined && p_tipo  == undefined){
    consulta_todos();
  }else{
    consulta_filtros(p_ciudad, p_tipo, p_from, p_to);
  }

}


/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */


function consulta_filtros(ciudad, tipo, from, to){

 console.log("inicia filtros")
  var p_ciudad = ciudad;
  var p_tipo = tipo;
  var p_from = from;
  var p_to = to;



  console.log(p_ciudad);
  console.log(p_tipo);
  console.log(p_from);
  console.log(p_to);



  	var url = "Buscador.php";
  	var XHR = new XMLHttpRequest()
  	XHR.open("POST", url, true);



  	XHR.onreadystatechange = function(){
  		if (XHR.readyState == 4) {
  			if(XHR.status == 200) {
  				//var rpta =  eval( "(" + XHR.responseText + ")" );
  				var rpta = JSON.parse(XHR.responseText)
  				if( rpta.estatus == 1 ){


  				divResultado.innerHTML = "Loq ue sea";
  			     // divResultado.innerHTML = rpta.respueta_controller + ": " +rpta.MensajeProcesado;

     // Ejecutamos Callback
      var info =  rpta.Datos;
        ejecutaCallbacks(fn_eliminoElementos, fn_modificaestilo, fn_insertainfo, fn_ocultaelemento, info);


  				    // ================================


  				} else {
  					divError.innerHTML = "<p>" + rpta.MensajeProcesado + "</p>";
  				}
  			} else {
  				divError.innerHTML = "<p>" + XHR.statusText + "</p>";
  			}
  		}
  	}


  /*
  XHR.onreadystatechange = function()
    {
          var text = "";

        if (XHR.readyState == 4) {
           if (XHR.status == 200) {
               //Si la respuesta es satisfactoria == 200 trae los datos del servidor
             //var rpta = JSON.parse(XHR.responseText);
                 var rpta = XHR.responseText;
               // var rpta = "El servidor responde: " + XHR.responseText;
                 // text = rpta.MensajeProcesado;
                 text = rpta;
                  } else {
                         text = "Ha ocurrido un error: " + XHR.statusText;
                }
          }
        else {
            text = ""
                   text = "Num. Estado de petición (XHR:redystate) : " + XHR.readyState;
                 text += "\nEstatus Codigo Devuelto por el Servidor (XHR.status) : " + XHR.status;
                   text += "\nEstatus devuelto por del Servidor en forma de cadena (XHR.statusText): " + XHR.statusText;
        }

              alert(text);

    }
  */

    	XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	XHR.send("action=consulta_Info&ciudad=" + p_ciudad + "&tipo=" + p_tipo + "&from=" + p_from + "&to=" + p_to);
    }


/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */


    function consulta_todos(){

     console.log("inicia filtros todos");
    var p_todos = "";



      	var url = "Buscador.php";
      	var XHR = new XMLHttpRequest()
      	XHR.open("POST", url, true);

      	XHR.onreadystatechange = function(){
      		if (XHR.readyState == 4) {
      			if(XHR.status == 200) {
      				//var rpta =  eval( "(" + XHR.responseText + ")" );
      				var rpta = JSON.parse(XHR.responseText)
      				if( rpta.estatus == 1 ){


      				divResultado.innerHTML = "Loq ue sea";
      			     // divResultado.innerHTML = rpta.respueta_controller + ": " +rpta.MensajeProcesado;



         // Ejecutamos Callback
          var info =  rpta.Datos;
            ejecutaCallbacks(fn_eliminoElementos, fn_modificaestilo, fn_insertainfo, fn_ocultaelemento, info);


      				    // ================================


      				} else {
      					divError.innerHTML = "<p>" + rpta.message + "</p>";
      				}
      			} else {
      				divError.innerHTML = "<p>" + XHR.statusText + "</p>";
      			}
      		}
      	}



        	XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        	XHR.send("action=consulta_Info&todos=" + p_todos);
        }






  function consulta_Ciudades(){

  var url = "Buscador.php";
  var XHR = new XMLHttpRequest();
  XHR.open("POST", url, true);





XHR.onreadystatechange = function(){
  if (XHR.readyState == 4) {
    if(XHR.status == 200) {
      //var rpta =  eval( "(" + XHR.responseText + ")" );
      var rpta = JSON.parse(XHR.responseText)
      if( rpta.estatus == 1 ){

          var info =  rpta.Datos;

      fn_llenaCiudades(info);
     console.log(rpta.MensajeProcesado);
      } else {
        divError.innerHTML = "<p>" + rpta.MensajeProcesado + "</p>";
      }
    } else {
      divError.innerHTML = "<p>" + XHR.statusText + "</p>";
    }
  }
}



/*

            XHR.onreadystatechange = function()
              {
                    var text = "";

                  if (XHR.readyState == 4) {
                     if (XHR.status == 200) {
                         //Si la respuesta es satisfactoria == 200 trae los datos del servidor
                       //var rpta = JSON.parse(XHR.responseText);
                           var rpta = XHR.responseText;
                         // var rpta = "El servidor responde: " + XHR.responseText;
                           // text = rpta.MensajeProcesado;
                           text = rpta;
                            } else {
                                   text = "Ha ocurrido un error: " + XHR.statusText;
                          }
                    }
                  else {
                      text = ""
                             text = "Num. Estado de petición (XHR:redystate) : " + XHR.readyState;
                           text += "\nEstatus Codigo Devuelto por el Servidor (XHR.status) : " + XHR.status;
                             text += "\nEstatus devuelto por del Servidor en forma de cadena (XHR.statusText): " + XHR.statusText;
                  }

                        alert(text);

              }
*/


                	XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                	XHR.send("action=consulta_Ciudades");
                }


function ejecutaCallbacks(callback1, callback2, callback3, callback4, info){
  /* fn_modificaestilo */  callback1();
  /* fn_modificaestilo */  callback2();
  /* fn_insetainfo */      callback3(info);
  /* fn_ocultaelemento */  callback4();

}


function fn_eliminoElementos(){

    var  id_elem = "";
    var numElem = $('[id*=divinformacion]').length -1;  /*Menos uno para descartar el div principal*/
  console.log("No Elementos:" +numElem);

for(var i = 1; i <= numElem; i++){
 id_elem = "#divinformacion" + i;

  $(id_elem).remove();
  console.log("elemento eliminado:" + id_elem);

}

}


function fn_modificaestilo(){
  $("body").css("background", " silver");
  $("#divinformacion").removeAttr("style");
}


function fn_insertainfo(info){

     var id = "";
     var direccion  = "";
     var ciudad = "";
     var telefono  = "";
     var codigopostal = "";
     var tipo = "";
     var precio = "";

 /*Elemento consecutivo para incrementar a 1 los "id" de cada div creado*/
    var i_contador = 0;

    for(dato in info){

   /*Incrementamos contador*/
    i_contador = i_contador + 1;


     /* Asignamos los datos en variables*/
       id =    info[dato].Id;
       direccion = info[dato].Direccion;
       ciudad = info[dato].Ciudad;
       telefono = info[dato].Telefono;
       codigo_postal = info[dato].Codigo_Postal;
       tipo = info[dato].Tipo;
       precio = info[dato].Precio;




/*  ****************** Inica Creacion de elemntos de Elemento *****************************/

/*Clonamos el div principal (incluye elementos y datos)*/
var divx =  $("#divinformacion").clone();



/*Creacion de "Id" para los Divs*/
var  id_elem = "divinformacion" + i_contador;
var sid_elem = "#" + id_elem;

/*Creacion de "Id" de div anterior, Para hacer el insert sobre el ultimo div ingresado */
var id_elemAnt = i_contador - 1;
var sid_elemAnterior =  "#divinformacion" + id_elemAnt;

/*
console.log("id_elem: " + id_elem + " sid_elem: " + sid_elem + " id_elemAnt: " + id_elemAnt + " sid_elemAnterior: " + sid_elemAnterior + " direccion: " +  direccion)
*/


/* 2.- Removemos el "id" para no duplicarlo*/
$(divx).removeAttr("id");
/* 3.- asignamos un nuevo "id" */
$(divx).attr("id", id_elem);

/*  console.log("id de elemento: " +     $(divx).attr('id')) */

/*Si es el primer elemento lo insertamos despues del "div principal"*/
   if(i_contador == 1){
   /*4.- Lo insertamos despues del parrafo */
    $(divx).insertAfter("#divinformacion");


    //$(divx).find('span').eq(0).text(id);
    $(divx).find('span').eq(0).text(direccion);
    $(divx).find('span').eq(1).text(ciudad);
    $(divx).find('span').eq(2).text(telefono);
    $(divx).find('span').eq(3).text(codigo_postal);
    $(divx).find('span').eq(4).text(tipo);
    $(divx).find('span').eq(5).text(precio);

  }else{/* Si es un div diferente al primero insertamos aqui*/

  $(sid_elemAnterior).after(divx);


  //$(divx).find('span').eq(0).text(id);
  $(divx).find('span').eq(0).text(direccion);
  $(divx).find('span').eq(1).text(ciudad);
  $(divx).find('span').eq(2).text(telefono);
  $(divx).find('span').eq(3).text(codigo_postal);
  $(divx).find('span').eq(4).text(tipo);
  $(divx).find('span').eq(5).text(precio);

/*Nota como el div principal tiene la propiedad: display:none  con esta opcion lo mostramos*/
  $(divx).show();

  console.log("inserto registro correctamente");
  }
/* ********************Fin Creacion de elemento*************************************************/

};  /* termina for*/

    console.log("inserto Todo Correctamente");
}



/*fn_ocultaelemento funcion para ocultar el "div-principal" */
function fn_ocultaelemento(){
  $("#divinformacion").hide();

}

function fn_llenaCiudades(info){
  //  alert("hola");
  //$("#selectCiudad").append("<option id=”opcion1″ value=”Colima″ selected=”selected”>Colima</option>");

  //$("#selectCiudad").append("<option id=”opcion2″ value=”Nayarit″ selected=”selected”>Nayarit</option>");



  var resultado = "";
  var id_option = "";
  var elemento = "";

  var i = 0;
  for(ciudad in info){
    i = i +1;
  id_option = "id_option" + i;
  option = "<option  id="+ id_option + " value=" + info[ciudad] + ">" + info[ciudad] + "</option>";

  console.log("elemento insertado:" +option);
     $("#selectCiudad").append(option);

  };



  /*NOTA: material_select es una funcion que se encuentra en el archivo materialize.js*/

/* Una vez cargado los datos aplicamos esta funcion que es de */
  $('select').material_select();

}



function fn_cargaColores(){

  var lista_nombres =["Camilo", "Eduardo", "Natalia", "Juan", "Alberto", "Milton", "Guillermo", "Mateo", "Maria", "Pedro"];
  var resultado = "";
  var i = 0;
  for(nombre_tmp in lista_nombres){

    i = i +1;

  id_option = "id_option" + i;
  nombres =  lista_nombres[nombre_tmp];
  option = "<option  value=" +  id_option + ">" + nombres + "</option>";

  console.log("elemento insertado:" +option);
     $("#selectCiudad").append(option);

  };


    $('select').material_select();
}
