// En este archivo no utilizamos el evento "DOMContentLoaded", ya que se colocó el atributo "defer" en la importación del script,
// que nos soluciona el problema de los elementos no cargados del DOM. Más info => https://www.w3schools.com/tags/att_script_defer.asp

const DATA_URL = "json/data.json"; // URL que contiene los datos que queremos mostrar

const container = document.getElementById("container"); // "Traemos" utilizando el DOM el div de id "container" para colocar la información en él

/**
 * Función que recibe por parámetro un array con los datos que se mostrarán en el DOM
 * Los datos se mostrarán dentro del div de id "container" y por cada ítem se está creando un nuevo párrafo donde se
 * imprime el campo "name" y el campo "lastname" separados por un espacio
 */
function showData(dataArray) {
  // El for itera sobre los elementos del array
  for (const item of dataArray) {
    // En la siguiente línea se utilizan "backticks" para armar el String. Más info => https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals
    container.innerHTML += `<p> ${item.name} ${item.lastname} </p>`; // Se concatena cada párrafo de la manera que queremos mostrarlo al innerHTML del contenedor
  }
}

// Escribe el código necesario para realizar el fetch al archivo con los datos y mostrar los estudiantes con la función showData

// Fetch recibe el URL y las opciones (en este caso, get, para obtener los datos del JSON)
fetch(DATA_URL, {
  method: 'GET'
  //Fetch genera una promesa de respuesta "response", con la información en formato de objeto
}).then(response => {

  // Se verifica que la respuesta haya sido válida
  if(!response.status === 200 || response.ok === false) {

    // En caso de que suceda algún error con la solicitud en el Fetch, se muestra un alert y se cancela la ejecución
    alert("Error al procesar la solicitud");

    return;

  };

  // Se verifican los datos recibidos en la respuesta del Fetch
  console.log(response);

  // Se genera una nueva promesa para transformar los datos recibidos a JSON
  response.json().then(jsonRecibido =>{

    // Una vez recibidos los datos, se verifica que exita un campo "students" con datos.
    if(!jsonRecibido.students) {

      // En caso de que "students" no exista o no contenga información, se muestra un alert
      alert("No se encontraron los estudiantes")

      // También se muestran en consola todos los datos que contiene el JSON recibido, para poder verificar qué se está recibiendo
      console.log(jsonRecibido);

    };

    // Se crea una constante para utilizar el mismo nombre de variable como parámetro.
    const dataArray = jsonRecibido.students;

    // Se ejecuta la función para mostrar los nombres de los estudiantes.
    showData(dataArray);

  })

  // Se crea un catch como contról de errores.
}).catch(error => error);