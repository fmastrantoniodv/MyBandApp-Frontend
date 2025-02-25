import React from 'react'
import { routes } from "../../const/constants"
import { useNavigate } from 'react-router-dom'
import estudioImg from '../../img/estudio-img.png'

export const MainSection = () => {
    const navigate = useNavigate()
    
    return (
    <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 30px 30px 30px'
        }}>
            <h2 style={{
                display: 'block',
                width: '100%',
                flexWrap: 'wrap',
                textAlign: 'center',
                fontWeight: '400',
                color: '#fff'
            }}>Crea tus pistas en simples pasos con las mejores librerias.</h2>
            <div className='info-estudio'>
                <img src={estudioImg} alt='un home estudio' className='img-estudio-landing'/>
                <div className='info-estudio-wrapper'>
                    <span style={{
                        display: 'flex',
                        color: '#fff',
                        fontSize: '20px'
                    }}>Nuestro objetivo es que puedas crear el contenido musical que estás buscando en simples pasos. En nuestra librería de sonidos vas a encontrar eso que necesitas.</span>
                    <button
                        className={`form-btn secondary`}
                        style={{width: '200px', height: '50px', marginTop: '10px'}}
                        onClick={() => {navigate(routes.login)}}
                    >Ir a estudio</button>
                </div>
            </div>
        </div>
    </>
    )
}