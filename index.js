function selectorTema(button){
    const container = button.closest('div[id')
    let location = ''
    console.log(button.id)
    console.log(container.id)
    const asignatura = container.id
    const tema = button.id
    const preguntas = prompt("Numero de preguntas del test:");
    window.location.href = './test.html?asignatura='+asignatura+'&tema='+tema+'&preguntas='+preguntas
}