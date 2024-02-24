//DECLARACIÓN DE VARIABLES

let containerFinal = document.getElementById("containerFinal");
let textareaFinal = document.getElementById("textareaFinal");
let containerImagen = document.getElementById("containerImagen");
let textoNuevoEncriptado = "";
let textoDesencriptado = "";

//BOTON ENCRIPTAR

function encriptar(textoIngresado){

  let textoNuevoEncriptado = ""; //Inicializa la variable en 0

//Este es un bucle for que se ejecutará desde i = 0 siempre que i sea menor que la longitud del texto ingresado. En cada iteración, i se incrementa en 1.
  for (let i = 0; i < textoIngresado.length; i++){ 

//En cada iteración del bucle, se toma el carácter en la posición i del texto ingresado y se almacena en la variable letra.
  let caracter = textoIngresado[i]; 

// Aquí comienza una estructura switch, que es utilizada para comparar el valor de caracter con diferentes casos.
  switch (caracter) {
    case 'e': textoNuevoEncriptado += 'enter';
    break;
    case 'a': textoNuevoEncriptado += 'ai';
    break;
    case 'i': textoNuevoEncriptado += 'imes';
    break;
    case 'o': textoNuevoEncriptado += 'ober';
    break;
    case 'u': textoNuevoEncriptado += 'ufat';
    break;
    default: textoNuevoEncriptado += caracter;
  }
}
return textoNuevoEncriptado;
}

//FUNCION DE COLOCAR TEXTO ENCRIPTADO EN LA TEXTAREAFINAL

function agregarTextoEncriptado() {
  let textoIngresado = document.getElementById("textareaOriginal").value;
  // Validar el texto antes de continuar
  if (!validarTexto(textoIngresado)) {
    return;
  }
  let textoActualizado = encriptar(textoIngresado);

  if (textoActualizado !== "") {
    document.getElementById("textareaFinal").value = textoActualizado;
    document.getElementById("containerFinal").style.display = "block";
    document.getElementById("containerImagen").style.display = "none";
  } else {
    document.getElementById("containerImagen").style.display = "block";
    document.getElementById("containerFinal").style.display = "none";
  }
}

//BOTÓN DESENCRIPTAR

function desencriptar(textoEncriptado) {
  // Verificar si el texto contiene alguna de las cadenas de encriptación
  const contieneEncriptacion = /ai|enter|imes|ober|ufat/.test(textoEncriptado);

  if (!contieneEncriptacion) {
    // Si no contiene ninguna de las cadenas, mostrar mensaje y no proceder con la desencriptación
    mostrarMensajeError("Su texto no se encuentra encriptado, por favor intentelo nuevamente.");
    return textoEncriptado; // Devolver el texto original sin cambios
  }

  // Si el texto sí contiene cadenas de encriptación, proceder con la desencriptación
  const reemplazos = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u",
  };

  let textoDesencriptado = textoEncriptado.replace(/ai|enter|imes|ober|ufat/g, match => reemplazos[match]);
  return textoDesencriptado;
}

 //FUNCION DE COLOCAR TEXTO DESENCRIPTADO EN LA TEXTAREAFINAL

function agregarTextoDesencriptado() {
  let textoEncriptado = document.getElementById("textareaOriginal").value;

  // Validar el texto encriptado antes de continuar
  if (!validarTexto(textoEncriptado)) {
    return;
  }

  let textoDesencriptado = desencriptar(textoEncriptado);

  if (textoDesencriptado !== "") {
    document.getElementById("textareaFinal").value = textoDesencriptado;
    document.getElementById("containerFinal").style.display = "block";
    document.getElementById("containerImagen").style.display = "none";
  } else {
    document.getElementById("containerImagen").style.display = "block";
    document.getElementById("containerFinal").style.display = "none";
  }
}
 //FUNCION MENSAJE DE ERROR


function mostrarMensajeError(mensaje) { // Define la función mostrarMensajeError que acepta un parámetro 'mensaje', el cual es el texto del mensaje de error que se mostrará.

  // Crea un div en HTML. Lo almacena en mensajeErrorContainer.
  const mensajeErrorContainer = document.createElement("div");

  // Asigna el ID 'mensajeErrorContainer' al nuevo div.
  mensajeErrorContainer.id = "mensajeErrorContainer";

  // Crea otro elemento div que servirá para mostrar el mensaje de error específico.
  const mensajeError = document.createElement("div");

  // Asigna el ID 'mensajeError' a este div para su identificación y estilización.
  mensajeError.id = "mensajeError";

  // Establece el contenido HTML del div mensajeError al valor del parámetro 'mensaje', que es el texto del error que se quiere mostrar.
  mensajeError.innerHTML = mensaje;

  // Crea un nuevo elemento span, que funcionará como un botón para cerrar el mensaje de error.
  const cerrarBtn = document.createElement("span");

  // Asigna el contenido HTML del botón cerrar a "&times;", que es un carácter que se parece a una X, comúnmente usado para botones de cierre.
  cerrarBtn.innerHTML = "&times;";

  // Asigna el ID 'cerrarBtn' al botón para poder referenciarlo y estilizarlo.
  cerrarBtn.id = "cerrarBtn";

  // Establece un manejador de eventos onclick para el botón cerrar, que al ser clickeado, eliminará el contenedor del mensaje de error del documento.
  cerrarBtn.onclick = () => mensajeErrorContainer.remove();

  // Agrega el botón cerrar como hijo del div mensajeError, lo que significa que el botón aparecerá dentro de este div.
  mensajeError.appendChild(cerrarBtn);

  // Luego, agrega el div mensajeError como hijo del div mensajeErrorContainer, formando así una estructura de elementos anidados.
  mensajeErrorContainer.appendChild(mensajeError);

  // Finalmente, agrega el div mensajeErrorContainer como hijo del cuerpo del documento, haciendo que el mensaje de error se muestre en la página.
  document.body.appendChild(mensajeErrorContainer);
}

 //FUNCION VALIDAR TEXTO

function validarTexto(textoIngresado) {
    // Verificar si hay mayúsculas
    if (/[A-ZÁÉÍÓÚÜÑ]/.test(textoIngresado)) {
      mostrarMensajeError(
        "No se permiten mayúsculas o letras con tildes. Por favor, ingrese solo minúsculas sin tildes."
      ); 
      return false;
    }
  
    // Verificar caracteres especiales
    if (/[^a-z\s]/i.test(textoIngresado)) {
      mostrarMensajeError(
        "No se permiten caracteres especiales. Por favor, ingrese solo letras minúsculas sin tildes."
      ); 
      return false; 
    } 
  
    // Devolver true si la validación es exitosa
    return true;
  }

 //FUNCION COPIAR

function copiar() {
    let textoIngresadoCopiado = document.getElementById("textareaFinal");
  
    // Selecciona el contenido del área de texto
    textoIngresadoCopiado.select();
  
    // Ejecuta el comando de copia en el documento
    document.execCommand("copy");
    alert("Texto copiado exitosamente");
    // Desselecciona el texto
    window.getSelection().removeAllRanges();
  }