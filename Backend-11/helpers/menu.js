var colors = require ('colors');
const inquirer = require('inquirer');
const { guardarDB, leerDB } = require('./guardarArchivos')




const preguntas = [{  
    type: 'list',  
    name: 'options',  
    message: '¿Qué quieres hacer?',  
    choices: [  
        { value: '1', name: `${'1.'.red} Crear tarea`,},  
        { value: '2', name: `${'2.'.red} lista tareas`,},  
        { value: '3', name: `${'3.'.red} tareas completadas`,},  
        { value: '4', name: `${'4.'.red} tareas pendientes`,},  
        { value:'5',name:`${'4.'.red} completar tareas`,},
        { value:'6',name:`${'6.'.red} borrar tarea`,},
        { value: '0', name: '0. Salir' ,}  
    ]  
}
];  

const menu = async () => {  
    console.clear();  
    console.log('==========================================='.green);  
    console.log('=            Bienvenido al menú           ='.white);  
    console.log('==========================================='.green);  

    const { options } = await inquirer.prompt(preguntas);  
    return options; 
};


const pausa = async () => {  
    const question = [  
        {  
            type: 'input',  
            name: 'enter',  
            message: `Presione la tecla ${'enter'.green} para continuar`  
        }  
    ]
    console.log('\n');
    await inquirer.prompt(question); 
}

const leerInput =async (message)=> {
    const question =[
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length ===0){
                    return 'Ingresa un valor'
                }
                return true;
            }
        }
    ];
    const{desc}=await inquirer.prompt(question);
    return desc;
}
module.exports= {
    menu,
    pausa,
    leerInput,
    guardarDB,
};