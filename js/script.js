const estudiantes = [] // Arreglo para almacenar objetos estudiantes



class Estudiante {
    constructor (nombre, apellido, nota1, nota2, nota3) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.notas = [nota1, nota2, nota3]
        this.estado = 0;
        this.promedio = 0; 
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
    {
        alert("No hay estudiantes agregados para cerrar asignatura!")
    }
    else {
        for(const estudiante of estudiantes) {
            estudiante.cerrarAsignatura();
            n_estudiantes++;
        }
        limpiarTabla();
        escribirTabla();
        //alert("Asignatura cerradas para " + n_estudiantes + " estudiantes en total!");
    }
}


/* Presenta estadísticas generales */
function estadisticaGeneral() {
    let suma_notas = 0;
    let n_estudiantes = 0;
    let promedio_general = 0;
    let aprobados = 0;
    let reprobados = 0;
    if(estudiantes.length == 0) {
        alert("No hay estudiantes para realizar la estadística!")
    }
    else {
        for(const e of estudiantes) {
                if (e.esAprobado())
                    aprobados++;
                else
                    reprobados++;
                suma_notas = suma_notas + e.promedioNotas();
                n_estudiantes++;
        }            promedio_general = suma_notas / n_estudiantes;
        alert("Estadistica general\nNº Estudiantes Aprobados: " + aprobados + "\nNº Estudiantes Reprobados: " + reprobados + "\nPromedio general curso: " + promedio_general);
    }
}
   

/* TEST ESCRIBE TABLA */
function escribirTabla() {

    let div_tabla_resultados = document.getElementById('cont-tabla-de-notas');
    let textoHTML = "";

    // TODO ESTO PASAR A MANIPUACION CON DOM
    // Primero construir cabecera de la tabla
    
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
    console.log(textoHTML);
    div_tabla_resultados.innerHTML = textoHTML;

}

/* DESARROLLADO SOLO PARA TESTEAR AGREGAR DATOS DE LA TABLA */
function datosEstudiantes() {

    // Agregamos estudiantes a los objetos.
    estudiantes.push(new Estudiante("Juan", "Perez", 4.3, 5.4, 6.0));
    estudiantes.push(new Estudiante("Pedro", "Pedro Pe", 3.0, 4.1, 2.7));
    estudiantes.push(new Estudiante("Alex", "Slater", 6.0, 6.0, 7.0));

    // Cerramos asignatuas

}

function limpiarTabla() {

    let tabla_resultados = document.getElementById('tbl-tabla-de-notas');
    tabla_resultados.remove();

}


function calcularPromedios() {
    
    // Recorrer la tabla para calcular todos los promedios de estudiantes.
    for(const e of estudiantes) {
        e.promediarNotas();
        console.log(e.promedio);
    }
        
    // Actualizar promedios de tabla
    limpiarTabla();
    escribirTabla();
   
}



/* funcion para ejecutar el programa principal */
function main()
{

    /* Añade el manejo de eventos mediante los botones */
    let btn_calcular_promedios = document.getElementById("calcular-promedios");
    btn_calcular_promedios.addEventListener("click", calcularPromedios);
    
    let btn_cerrar_estudiantes = document.getElementById("cerrar-estudiantes");
    btn_cerrar_estudiantes.addEventListener("click", cerrarEstudiantes);


    // Probando la función de escritura de tabla con DOM
    datosEstudiantes();
    escribirTabla();
    
}

main();
