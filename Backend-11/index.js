const { menu, pausa, leerInput } = require('./helpers/menu');
const Tareas = require('./models/tareas');
const { guardarDB } = require('./helpers/guardarArchivos');
const inquirer = require('inquirer');  // Asegúrate de tener inquirer

const principal = async () => {
  let opt = '';
  const tareas = new Tareas();

  do {
    opt = await menu();

    switch (opt) {
      case '1':
        // Crear tarea
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        console.log(`Tarea "${desc}" creada.`);
        break;

      case '2':
        // Mostrar lista de tareas (solo descripción)
        console.log('Lista de Tareas:');
        tareas.listadoArr.forEach(tarea => {
          console.log(tarea.desc); // Solo muestra la descripción
        });
        break;

      case '3':
        // Mostrar tareas completadas
        console.log('Tareas Completadas:');
        const completadas = tareas.tareasCompletadas();
        completadas.forEach(tarea => {
          console.log(`- ${tarea.desc}`);
        });
        break;

      case '4':
        // Mostrar tareas pendientes
        console.log('Tareas Pendientes:');
        const pendientes = tareas.tareasPendientes();
        pendientes.forEach(tarea => {
          console.log(`- ${tarea.desc}`);
        });
        break;

      case '5':
        // Completar tarea con selección usando flechas
        const tareasPendientes = tareas.tareasPendientes();

        if (tareasPendientes.length === 0) {
          console.log('No hay tareas pendientes.');
          break;
        }

        const respuesta = await inquirer.prompt([{
          type: 'list',
          name: 'tareaId',
          message: 'Selecciona la tarea a completar:',
          choices: tareasPendientes.map(tarea => ({
            value: tarea.id,
            name: tarea.desc
          }))
        }]);

        // Completar la tarea seleccionada
        tareas.completarTarea(respuesta.tareaId);
        break;

      case '6':
        // Eliminar tarea con selección usando flechas
        const tareasPendientesEliminar = tareas.tareasPendientes();

        if (tareasPendientesEliminar.length === 0) {
          console.log('No hay tareas pendientes para eliminar.');
          break;
        }

        const tareaEliminar = await inquirer.prompt([{
          type: 'list',
          name: 'tareaId',
          message: 'Selecciona la tarea a eliminar:',
          choices: tareasPendientesEliminar.map(tarea => ({
            value: tarea.id,
            name: tarea.desc
          }))
        }]);

        // Eliminar la tarea seleccionada
        tareas.eliminarTarea(tareaEliminar.tareaId);
        console.log(`Tarea "${tareaEliminar.tareaId}" eliminada.`);
        break;

      default:
        break;
    }

    // Guardar el estado actual de las tareas
    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

principal();
