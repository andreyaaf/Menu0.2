const fs = require ('fs');

const guardarDB = async ( data) => {

    const archivo ='./db/data.json'

    fs.writeFileSync(archivo,JSON.stringify(data));

}


module.exports ={
    guardarDB,
}