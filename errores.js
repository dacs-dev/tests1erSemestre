
let currentTest = null;
let tests = null;
const alphabet = "abcdefghijklmnñopqrstivwxyz";
let currentTestPos = null;
let asignatura = null;
let tema = null;


function selectorTema(button){
    const container = button.closest('div[id')
    const temaSelectors = document.getElementsByClassName('tema_selector');
    const testError = document.getElementById('error_tests');
    const testMenu = document.getElementById('test_menu');
    asignatura = container.id
    tema = button.id

    Array.from(temaSelectors).forEach(element => {
        element.style.display = 'none';
    });
    testError.style.display = 'flex'
    tests = localStorage.getItem(asignatura+tema) ? JSON.parse(localStorage.getItem(asignatura+tema)) : [];
    console.log(tests)
    while (testMenu.firstChild) {
        testMenu.removeChild(testMenu.firstChild);
    }
    if(tests.length > 0){
        tests.forEach((element, index) => {
            const button = document.createElement("button");
            button.id = index;
            button.textContent = `Test ${index +1}`;
            button.onclick = changeTest;
            testMenu.appendChild(button);
        });
    }
}

function changeTest(event){
    currentTest = tests[event.target.id];
    currentTestPos = event.target.id;
    printTest(currentTest);
}
function printTest(currentTest){
    const testError = document.getElementById('selected_test');
    while (testError.firstChild) {
        testError.removeChild(testError.firstChild);
    }
    currentTest.forEach((pregunta, preguntaIndex) => {
        const enunciado = document.createElement("p");
        enunciado.className = "enunciado";
        enunciado.textContent = `${preguntaIndex +1}. ${pregunta.question}`;
        if (pregunta.result == 'ko'){
            enunciado.className = 'error'
          }else if (pregunta.result == 'ok'){
            enunciado.className = 'ok'
          }else{
            enunciado.className = 'unanswered'
          }
        testError.appendChild(enunciado);
        pregunta.options.forEach((element, index) => {
          const answer = document.createElement("input");
          answer.type = "radio";
          answer.name = "question" + preguntaIndex ;
          answer.id = "question" + preguntaIndex + "answer" + index;
          answer.value = element;
          answer.disabled = true;
          const label = document.createElement("label");
          if (pregunta.correct_answer == element){
            label.className = 'ok'
          }
          label.textContent = `${alphabet[index]}) + ${element}`;
          label.htmlFor = "question" + preguntaIndex + "answer" + index;
          const respuestaContainer = document.createElement("div");
          respuestaContainer.className = "respuesta-container";
          respuestaContainer.appendChild(answer);
          respuestaContainer.appendChild(label);
          testError.appendChild(respuestaContainer);
        });
      });
}

function closeTest(){
    const temaSelectors = document.getElementsByClassName('tema_selector');
    const testError = document.getElementById('error_tests');
    Array.from(temaSelectors).forEach(element => {
        element.style.display = 'flex';
    });
    testError.style.display = 'none'
}

function redoTest(event) {
    
    if (!currentTest){
        alert('No hay test seleccionado')
        return
    }
    
    console.log('Redo test')
    
    console.log(event.target.id)
    const selectedDiv = document.getElementById("selected_test");
    const testTitle = document.getElementById("test_title")
    while (selectedDiv.firstChild) {
      selectedDiv.removeChild(selectedDiv.firstChild);
     
    }
    
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
    
  }
  function getAnswers(){
      const container = document.getElementById('selected_test')
      const inputs = container.getElementsByTagName('input')
      const selectedInputs = Array.from(inputs).filter(input => input.checked); // Filtras solo los 'checked'
      return selectedInputs
  }
  // Función para corregir el test
  function corregirTest() {
     
      if(!currentTest){
        alert('No hay test seleccionado')
        return
      }
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
      hechos[currentTestPos] = currentTest;
      localStorage.setItem(asignatura+tema, JSON.stringify(hechos))
      tests = hechos;
      
      // Mostrar el resultado
      alert(`Has acertado ${puntuacion} de ${currentTest.length} preguntas`);
      return errorstests.forEach((element, index) => {
        const button = document.createElement("button");
        button.id = index;
        button.textContent = `Test ${index +1}`;
        button.onclick = changeTest;
        testMenu.appendChild(button);
    }); 
    }