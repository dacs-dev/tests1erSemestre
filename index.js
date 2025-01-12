async function selectorTema(button){
    const container = button.closest('div[id')
    let location = ''
    console.log(button.id)
    console.log(container.id)
    const asignatura = container.id
    const tema = button.id
    let jsonFile = './'+asignatura+'/'+tema+'.json'
    const tests = await fetch(jsonFile).then((response) => {
        if (!response) {
            throw new Error(`Error al leer el archivo: ${response.statusText}`);
        }
        return response.json().then((data) => {
            return data
        });
    });
    console.log(tests)
    const preguntas = prompt(`Hay ${tests.length} preguntas, elije cuantas quieres en tu test:`);
    window.location.href = './test.html?asignatura='+asignatura+'&tema='+tema+'&preguntas='+preguntas
}