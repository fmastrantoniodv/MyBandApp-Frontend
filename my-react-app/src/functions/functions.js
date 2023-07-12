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


export default {
    HolaMundo,
    GuardarUser
}