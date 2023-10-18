import React, { useEffect, useState } from 'react';
import '../App.css';
import './studio';
import ProjectEditor from '../components/ProjectEditor';


const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [dataContext, setDataContext] = useState(null); // El estado del contexto

      useEffect(()=>{
        fetch("https://run.mocky.io/v3/387096b4-6ecf-40a1-a9d1-b111b4234455")
        .then(response => response.json())
        .then(json => {
          setDataContext(json)
        })
      },[])

      if(dataContext === null) return <h1>LOADING</h1>

    return(
        <>
          <div className='container'>
            <ProjectEditor dataContext={dataContext}/>
          </div>
        </>
    )
}

export default Studio;