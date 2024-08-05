import axios from 'axios'

const HolaMundo = async (state) => {
    console.log("consumo la api GET");
    //const peticion = await axios.get('http://localhost:3100/api/users');
    var peticionChoclo = ["Juancito","Pepito"];
    //state(peticion.data.users);
    state(peticionChoclo);
}

const GuardarUser = (state) => {
    console.log("consumo la api POST");
    var nombreNuevo = 'Fred';
    var jsonConNombre = {
      nombre: nombreNuevo
    };
    
    const peticion = axios.post('http://localhost:3100/api/users', jsonConNombre)
    .then(console.log('aloja'))
    .catch(function (error) {
      console.log(error);
    });
    /*
    */
//   state(peticion);
}

function formatUpperFirstCase( param ){
  return param.charAt(0).toUpperCase()+param.substring(1);
}

//Si las collections que tengo disponibles tienen el campo "templateId" las muestro en la lista
export const setTemplates = ( collections ) => {
  const templates = [
    { key: "blank", value: "En blanco" }
  ]

  for (const collection of collections) {
    if ('templateId' in collection) {
      templates.push({ key: collection.templateId, value: collection.templateName })
    }
  }

  return templates
}


export default {
    HolaMundo,
    GuardarUser,
    formatUpperFirstCase
}