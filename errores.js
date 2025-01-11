
let currentTest = null;
let tests = null;
const alphabet = "abcdefghijklmnñopqrstivwxyz";




function selectorTema(button){
    const container = button.closest('div[id')
    const temaSelectors = document.getElementsByClassName('tema_selector');
    const testError = document.getElementById('error_tests');
    const testMenu = document.getElementById('test_menu');
    const asignatura = container.id
    const tema = button.id

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
    printTest(currentTest);
}
function printTest(currentTest){
    currentTest.forEach((pregunta, preguntaIndex) => {
        const testError = document.getElementById('selected_test');
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
          const label = document.createElement("label");
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
    const testError = document.getElementById('selected_test');
    Array.from(temaSelectors).forEach(element => {
        element.style.display = 'flex';
    });
    testError.style.display = 'none'
}