const estudiantes = [] // Arreglo para almacenar objetos estudiantes


class Estudiante {
    constructor (nombre, apellido, n1, n2, n3) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.aprobado = false;
        this.cerrado = false;
        this.promedio = 0;
    }

    promedioNotas() {
        return (this.n1 + this.n2 + this.n3) / 3;
    }

    estadoFinal () {
        return this.aprobado;
    }

    cerrarAsignatura() {
        this.promedio = (this.n1 + this.n2 + this.n3) / 3;
        if(this.promedio > 4)
            this.aprobado = true;
        else
            this.aprobado = false;
        this.cerrado = true;
    }

    estudianteCerrado() {
        return this.cerrado;
    }

    obtenerN1() {
        return this.n1;
    }

    obtenerN2() {
        return this.n2;
    }

    obtenerN3() {
        return this.n3;
    }

}


/* Solicita una nota para el estudiante */
function ingresarNota() {
    while(true) {
        let nota = parseFloat(prompt("Ingrese nota del estudiante: "));
        if(nota >= 1.0 && nota <= 7.0)
            return nota;
        else
            alert("Debe ingresar una nota válida (entre 1.0 y 7.0)!");
    }
}

/*Solicita nombre del estudiante */
function ingresarNombre(){
    while(true) {
        let nombre = prompt("Ingrese nombre del estudiante: ");
        if(nombre.length > 0)
            return nombre;
        else
            alert("El nombre debe tener como mínumo 1 caracter!");
    }
}

/*Solicita apellido del estudiante */
function ingresarApellido(){
    while(true) {
        let apellido = prompt("Ingrese apellido del estudiante: ");
        if(apellido.length > 0)
            return apellido;
        else
            alert("El apellido debe tener como mínumo 1 caracter!");
    }
}

/* Función que maneja el ingreso de un nuevo estudiante */
function nuevoEstudiante() {
    let nombre = ingresarNombre();
    let apellido = ingresarApellido();
    let n1 = ingresarNota();
    let n2 = ingresarNota();
    let n3 = ingresarNota();
    estudiantes.push(new Estudiante(nombre, apellido, n1, n2, n3));

}

/* Función que hace el calculo del promedio del estudiante y cierra su proceso */
function cerrarAsignatura(){
    // Procesar
    let n_estudiantes = 0
    if(estudiantes.length == 0)
    {
        alert("No hay estudiantes agregados para cerrar asignatura!")
    }
    else {
        for(const e of estudiantes) {
            e.cerrarAsignatura();
            n_estudiantes++;
        }
        alert("Asignatura cerradas para " + n_estudiantes + " estudiantes en total!");
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
                if (e.estadoFinal())
                    aprobados++;
                else
                    reprobados++;
                suma_notas = suma_notas + e.promedioNotas();
                n_estudiantes++;
        }            promedio_general = suma_notas / n_estudiantes;
        alert("Estadistica general\nNº Estudiantes Aprobados: " + aprobados + "\nNº Estudiantes Reprobados: " + reprobados + "\nPromedio general curso: " + promedio_general);
    }
}
    


/* PROGRAMA PRINCIPAL */
while(true) {
    let op = parseInt(prompt("Bienvenido a la aplicación:\n1. Ingresar estudiantes\n2. Cerrar asigantura\n3. Reportar estadístcas generales\n4. Salir"));
    if(op == 1) {
        nuevoEstudiante();    
    }
    else if (op == 2) {
        cerrarAsignatura();
    }
    else if (op == 3) {
        estadisticaGeneral();
    }
    else if (op == 4) {
        alert("Gracias por usar este programa!");
        break;
    }
    else {
        alert("Debe ingresar una opción válida del menú!");
    }
}


