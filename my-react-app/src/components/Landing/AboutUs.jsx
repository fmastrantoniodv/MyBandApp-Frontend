import React from 'react'

export const AboutUs = () => {
    
    return (
        <div style={{ 
            backgroundColor: '#000', 
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
            width: '100%'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h2 style={{
                    display: 'block',
                    width: '100%',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                    fontWeight: '400',
                    color: '#fff'
                }}>Sobre nosotros</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',      
                    }}
                >
                    <span style={{color: '#fff'}}>Autor: Franco Mastrantonio</span>
                    <span style={{color: '#fff'}}>Contacto: <strong>mybandapp.arg@gmail.com</strong></span>
                </div>
            </div>
        </div>    
    )
}