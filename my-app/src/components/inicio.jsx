import React,{useEffect, useState} from 'react'
import { HolaMundo, GuardarUser } from '../functions/functions'

const Inicio = () => {

    const [usuarios, setUsuarios] = useState(null);
    var contadorId = 0;

    
    useEffect(()=>{
        HolaMundo(setUsuarios)
    },[])

    const [newUser, setNewUser] = useState(null);

    useEffect(()=>{
        GuardarUser(newUser)
    },[])


    return (
        <>
        { usuarios != null ? (
            usuarios.map(usuario => (
                <div key={contadorId++}>
                    <span>{usuario.nombre}</span>
                </div>
            ))
        ) : ('No hay usuarios')}
        <div>
            <button >
                New user
            </button>
        </div>
        </>
    )
}

export default Inicio;