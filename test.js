const alphabet = "abcdefghijklmnñopqrstivwxyz";



const testSelector = document.getElementById("test_menu");
const urlParams = new URLSearchParams(window.location.search);
const asignatura = urlParams.get('asignatura')
const tema = urlParams.get('tema')
const npreguntas = parseInt(urlParams.get('preguntas'))

let tests = null;
let currentTest = null;
let jsonFile = './'+asignatura+'/'+tema+'.json'
fetch(jsonFile).then((response) => {
  if (!response.ok) {
    throw new Error(`Error al leer el archivo: ${response.statusText}`);
  }
  return response.json().then((data) => {
    tests = data;
    currentTest = generarTest(tests, npreguntas)
    const selectedDiv = document.getElementById("selected_test");
    currentTest.forEach((element, preguntaIndex) => {
      const container = document.createElement("div");
      const enunciado = document.createElement("p");
      enunciado.className = "enunciado";
      enunciado.textContent = `${preguntaIndex +1}. ${element.question}`;
      selectedDiv.appendChild(enunciado);
      element.options = ordenarAleatoriamente(element.options)
      element.options.forEach((element, index) => {
        const answer = document.createElement("input");
        answer.type = "radio";
        answer.name = "question" + preguntaIndex ;
        answer.id = "question" + preguntaIndex + "answer" + index;
        answer.value = element;
        const label = document.createElement("label");
        label.textContent = `${alphabet[index]}) + ${element}`;
        label.htmlFor = "question" + preguntaIndex + "answer" + index;
        const respuestaContainer = document.createElement("div");
        respuestaContainer.className = "respuesta-container";
        respuestaContainer.appendChild(answer);
        respuestaContainer.appendChild(label);
        selectedDiv.appendChild(respuestaContainer);
      });
    });
  });
});

function ordenarAleatoriamente(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));  // Genera un índice aleatorio
    [array[i], array[j]] = [array[j], array[i]];    // Intercambia los elementos
  }
  return array;
}

function deleteme(){
  for (let i = 0; i < data.length; i++) {
    const button = document.createElement("button");
    button.textContent =
      (window.innerWidth > 768 ? "Test " : "") + (i + 1);
    button.id = i;
    button.onclick = buttonClick;
    testSelector.appendChild(button);
  }
}
function generarTest(preguntas, cantidad) {
  if (cantidad > preguntas.length) {
    console.error("La cantidad de preguntas solicitadas excede el número total de preguntas disponibles.");
    return [];
  }

  // Crear una copia del array para evitar modificar el original
  const copiaPreguntas = [...preguntas];

  // Barajar las preguntas aleatoriamente usando el algoritmo de Fisher-Yates
  for (let i = copiaPreguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiaPreguntas[i], copiaPreguntas[j]] = [copiaPreguntas[j], copiaPreguntas[i]];
  }

  // Seleccionar las primeras 'cantidad' preguntas
  return copiaPreguntas.slice(0, cantidad);
}

function buttonClick(event) {
  const selectedDiv = document.getElementById("selected_test");
  const testTitle = document.getElementById("test_title")
  while (selectedDiv.firstChild) {
    selectedDiv.removeChild(selectedDiv.firstChild);
  }
  currentTest = parseInt(event.target.id);
  testTitle.innerText = 'Test ' + (currentTest + 1)
  const test = tests[currentTest];
  test.preguntas.forEach((element, preguntaIndex) => {
    const container = document.createElement("div");
    const enunciado = document.createElement("p");
    enunciado.className = "enunciado";
    enunciado.textContent = element.enunciado;
    selectedDiv.appendChild(enunciado);
    element.respuestas.forEach((element, index) => {
      const answer = document.createElement("input");
      answer.type = "radio";
      answer.name = "question" + preguntaIndex ;
      answer.id = "question" + preguntaIndex + "answer" + index;
      answer.value = index;
      const label = document.createElement("label");
      label.textContent = `${alphabet[index]}) + ${element}`;
      label.htmlFor = "question" + preguntaIndex + "answer" + index;
      const respuestaContainer = document.createElement("div");
      respuestaContainer.className = "respuesta-container";
      respuestaContainer.appendChild(answer);
      respuestaContainer.appendChild(label);
      selectedDiv.appendChild(respuestaContainer);
    });
  });
}
function getAnswers(){
    const container = document.getElementById('selected_test')
    const inputs = container.getElementsByTagName('input')
    const selectedInputs = Array.from(inputs).filter(input => input.checked); // Filtras solo los 'checked'
    return selectedInputs
}
// Función para corregir el test
function corregirTest() {
   
    let puntuacion = 0;
    let errors = [];
    const respuestasUsuario = getAnswers()
    // Comparar las respuestas del usuario con las correctas
    currentTest.forEach((element, preguntaIndex) => {
      const respuestaUsuario = respuestasUsuario[preguntaIndex]// Verifica cuál radio está seleccionado
      if (respuestaUsuario && respuestaUsuario.value == element.correct_answer) {
      {
        puntuacion++;
        const label = document.querySelector(`label[for="${respuestaUsuario.id}"]`);
        label.className = 'ok_label'
        element.result = 'ok'
      } // IMPLEMENTAR FUNCION MOSTRAR BUENA RESPUESTA LABEL NARANJA
      }else{
        if(respuestaUsuario){
          const label = document.querySelector(`label[for="${respuestaUsuario.id}"]`);
          label.className = 'error_label'
          element.result = 'ko'
        }else{
          element.result = 'no_answer'
        }

        errors.push({question:preguntaIndex})
      }
      
    });
    const hechos = JSON.parse(localStorage.getItem(asignatura+tema)) ?? []
    hechos.push(currentTest);
    localStorage.setItem(asignatura+tema, JSON.stringify(hechos))
    // Mostrar el resultado
    alert(`Has acertado ${puntuacion} de ${npreguntas} preguntas`);
    return errors
  }
