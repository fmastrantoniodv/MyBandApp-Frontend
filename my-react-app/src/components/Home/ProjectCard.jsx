import React from 'react'
import deleteIcon from '../../img/deleteIcon.svg'
import projectImg from '../../img/projectImg.svg'
import openIcon from '../../img/openIcon.svg'

export const ProjectCard = ({ name, savedDate, onDelete, onOpen }) => {

    const fecha = new Date(savedDate);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString().padStart(4, '0');
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    const fechaFormateada = `${dia}-${mes}-${anio} ${hora}:${minutos}:${segundos}`;

    return (
        <div className='project-card'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img style={{ width: '81px', height: '85px' }} src={projectImg} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button className='project-btn delete' style={{ backgroundImage: `url(${deleteIcon})` }} onClick={onDelete} />
                    <button className='project-btn open' style={{ backgroundImage: `url(${openIcon})` }} onClick={onOpen} />
                </div>
            </div>
            <span className='project-name'>{name}</span>
            <span className='project-last-change'>Último cambio: {fechaFormateada}</span>
        </div>
    )
}