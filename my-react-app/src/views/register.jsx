import React from 'react'
import {ButtonText, FormButton, FormCard, Header} from '../components/Register/Form'

const Register = () => {
    return (
        <>
            <Header>
                <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    position: 'relative',
                    left: '80%',
                    transform: 'translateX(-80%)'
                    }}
                >
                    <ButtonText type={'secondary'} text={'Volver a la página principal'}/>
                    <ButtonText type={'primary'} text={'Registrarse'}/>
                </div>
            </Header>
            <div class={'container'}>
                <FormCard title={'Iniciar sesión'}>
                        <FormButton text={'Ingresar'} type={'primary'}/>
                        <FormButton text={'Registrarse'} type={'secondary'}/>
                </FormCard>
            </div>
        </>
    )
}

export default Register