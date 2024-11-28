const Tarea = require('../models/tarea.js');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    // Método para crear una nueva tarea
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // Método para marcar una tarea como completada
    completarTarea(id) {
        if (this._listado[id]) {
            this._listado[id].completadoEn = new Date().toISOString();  // Establece la fecha de completado
            console.log(`Tarea "${this._listado[id].desc}" completada.`);
        } else {
            console.log('Tarea no encontrada');
        }
    }

    // Método para eliminar una tarea
    eliminarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];  // Elimina la tarea del listado
            console.log(`Tarea "${id}" eliminada.`);
        } else {
            console.log('Tarea no encontrada');
        }
    }

    // Método para obtener todas las tareas pendientes (completadoEn == null)
    tareasPendientes() {
        const pendientes = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        return pendientes;
    }

    // Método para obtener todas las tareas completadas (completadoEn != null)
    tareasCompletadas() {
        const completadas = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        return completadas;
    }
}

module.exports = Tareas;
