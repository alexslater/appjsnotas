
const estudiantes = [] // Arreglo para almacenar objetos estudiantes

class Estudiante {
    constructor (nombre, apellido, nota1, nota2, nota3, promedio = 0, estado = 0) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.notas = [nota1, nota2, nota3]
        this.estado = estado;
        this.promedio = promedio; 
    }

    promediarNotas() {
        let prom = (this.notas[0]+ this.notas[1] + this.notas[2]) / 3;
        this.promedio = parseFloat(prom.toFixed(1));
    }
    
    modificarEstado(estado) {
        this.estado = estado;
    }

    obtenerEstado() {
        switch(this.estado) {
            case 0:
                return "En curso";
            case 1:
                return "Aprobado";
            case 2:
                return "Reprobado";
        }
    }

    cerrarAsignatura() {
        if(this.promedio > 4)
            this.estado = 1;
        else
            this.estado = 2;
    }

    modificarPromedio(promedio) {
        this.promedio = promedio;
    }

}


/* Solicita una nota para el estudiante */
function ingresarNota(n_nota) {
    let nota = parseFloat(prompt("Ingrese NOTA " + n_nota + " del estudiante: "));
    if(nota >= 1.0 && nota <= 7.0)
        return nota;
    else
        alert("Debe ingresar una nota válida (entre 1.0 y 7.0)!");
    ingresarNota();

}

/*Solicita nombre del estudiante */
function ingresarDato(clave){
    let dato = prompt("Ingrese " + clave.toUpperCase() + " del estudiante: ");
    if(dato.length > 0)
        return dato;
    else
        alert("El " + clave.toUpperCase() + " debe tener como mínumo 1 caracter!");
    ingresarDato(clave);
}

/* Función que maneja el ingreso de un nuevo estudiante */
function nuevoEstudiante() {
    let nombre = ingresarDato("nombre");
    let apellido = ingresarDato("apellido");
    let n1 = ingresarNota(1);
    let n2 = ingresarNota(2);
    let n3 = ingresarNota(3);
    estudiantes.push(new Estudiante(nombre, apellido, n1, n2, n3));
}

/* Función que hace el calculo del promedio del estudiante y cierra su proceso */
function cerrarEstudiantes(){
    // Procesar
    let n_estudiantes = 0
    if(estudiantes.length == 0)
        alert("No hay estudiantes agregados para cerrar asignatura!");
    else if(!promediosCalculados())
        alert("Primero debe presionar calcular promedios antes de cerrar asignatura!");
    else {
        for(const estudiante of estudiantes) {
            estudiante.cerrarAsignatura();
            n_estudiantes++;
        }
        limpiarTabla();
        escribirTabla();
        guardarInformacion();
        //alert("Asignatura cerradas para " + n_estudiantes + " estudiantes en total!");
    }

}


function escribirTabla() {

    let div_tabla_resultados = document.getElementById('cont-tabla-de-notas');
    let textoHTML = "";

    // Creación del texto innerHTML
    textoHTML = `
    <table class="table" id="tbl-tabla-de-notas">
        <thead>
        <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Nota 1</th>
        <th scope="col">Nota 2</th>
        <th scope="col">Nota 3</th>
        <th scope="col">Promedio</th>
        <th scope="col">Estado</th>
        </tr>
        </thead>
        <tbody>
    `
    // Ahora iterar sobre estudiantes para ingresar los datos
    
    for(const e of estudiantes) {
       textoHTML = textoHTML + `
            <tr>
                <td>${e.nombre}</td>
                <td>${e.apellido}</td>
                <td>${e.notas[0]}</td>
                <td>${e.notas[1]}</td>
                <td>${e.notas[2]}</td>
                <td>${e.promedio}</td>
                <td>${e.obtenerEstado()}</td>
            </tr>
       `
    

    }

    // Finalmente cerrar la estructura de la tabla
    textoHTML = textoHTML + `
        </tbody>
    </table>
    `

    div_tabla_resultados.innerHTML = textoHTML;

}

function guardarInformacion() {

    localStorage.clear();
    let arreglo_estudiantes = []
    for(const e of estudiantes)
        arreglo_estudiantes.push(e);
    localStorage.setItem("estudiantes", JSON.stringify(arreglo_estudiantes));

}

function recuperarInformacion() {

    let ls_estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
    console.log(ls_estudiantes);
    for(const e in ls_estudiantes){
        const nombre = ls_estudiantes[e]['nombre'];
        const apellido = ls_estudiantes[e]['apellido'];
        const notas = ls_estudiantes[e]['notas'];
        console.log(ls_estudiantes[e]['notas']);
        const estado = ls_estudiantes[e]['estado'];
        const promedio = ls_estudiantes[e]['promedio'];
        console.log("ESTADO GUARDADO: ")
        console.log(ls_estudiantes[e]['estado'])
        console.log("PROMEDIO GUARDADO: ")
        console.log(ls_estudiantes[e]['promedio'])
        estudiantes.push(new Estudiante(nombre, apellido, notas[0], notas[1], notas[2], promedio, estado));
   
    }
        
}

function limpiarTabla() {

    let tabla_resultados = document.getElementById('tbl-tabla-de-notas');
    tabla_resultados.remove();

}

function calcularPromedios() {
    
    if(estudiantes.length == 0)
        alert("No hay estudiantes ingresados para calcular promedios!");
    else {
        // Recorrer la tabla para calcular todos los promedios de estudiantes.
        for(const e of estudiantes) {
            e.promediarNotas();
            console.log(e.promedio);
        }
   
         // Actualizar promedios de tabla
        limpiarTabla();
        escribirTabla();
        guardarInformacion();
    }
        
   
}

function limpiarCuadrosEntrada() {

    document.getElementById("nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("Nota 1").value = ""
    document.getElementById("Nota 2").value = ""
    document.getElementById("Nota 3").value = ""

}

function promediosCalculados() {

    let promedios_listos = false;

    for(const e of estudiantes) {
        if(e.promedio > 0)
            promedios_listos = true;
    }

    return promedios_listos
}

/* funcion para ejecutar el programa principal */
function main()
{

    /* Añade el manejo de eventos mediante los botones */
    let btn_calcular_promedios = document.getElementById("calcular-promedios");
    btn_calcular_promedios.addEventListener("click", calcularPromedios);
    
    let btn_cerrar_estudiantes = document.getElementById("cerrar-estudiantes");
    btn_cerrar_estudiantes.addEventListener("click", cerrarEstudiantes);

    /* Recuperar datos de localStorage y precargar */
    recuperarInformacion();
    escribirTabla();


    let btn_ingresar_estudiante = document.getElementById("ingresar-estudiante");
    btn_ingresar_estudiante.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value
        const apellido = document.getElementById("apellido").value

        const nota1 = parseFloat(document.getElementById("Nota 1").value)
        const nota2 = parseFloat(document.getElementById("Nota 2").value)
        const nota3 = parseFloat(document.getElementById("Nota 3").value)

        if(nota1 < 1 || nota1 > 7)
            alert("Una de las notas es inválida!")
        else if(nota2 < 1 || nota2 > 7)
            alert("Una de las notas es inválida!")
        else if(nota3 < 1 || nota3 > 7)
            alert("Una de las notas es inválida!")
        else {            
            console.log("Datos leidos")
            estudiantes.push(new Estudiante(nombre, apellido, nota1, nota2, nota3))
            escribirTabla();
            guardarInformacion();
            // Limpiar ahora
            limpiarCuadrosEntrada();
        }

    })

}

main();
