const estudiantes = [] // Arreglo para almacenar objetos estudiantes


class Estudiante {
    constructor (nombre, apellido, nota1, nota2, nota3) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.notas = [nota1, nota2, nota3]
        this.aprobado = false;
        this.promedio = 0; 
    }

    promedioNotas() {
        return (this.notas[0]+ this.notas[1] + this.notas[2]) / 3;
    }

    esAprobado () {
        return this.aprobado;
    }

    
       
    cerrarAsignatura() {
        this.promedio = this.promedioNotas();
        if(this.promedio > 4)
            this.aprobado = true;
        else
            this.aprobado = false;
    }

    obtenerNota(numeronota)
    {
        return this.notas[numeronota - 1];
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
function cerrarAsignatura(){
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
    
/* funcion para ejecutar el programa principal */
function main()
{
    let continuar = true
    while(continuar) {
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
            continuar = false;
            alert("Gracias por usar este programa!");
            break;
        }
        else {
            alert("Debe ingresar una opción válida del menú!");
        }
        
    }

}

main();
