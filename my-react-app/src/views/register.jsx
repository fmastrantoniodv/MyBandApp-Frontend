import React, { useState } from 'react'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import { routes, inputsRegister } from '../const/constants'
import { useNavigate } from 'react-router-dom'
import LottieAnimation from '../components/Register/LoadingAnimation';
import { createNewUser } from '../services/users/createNewUser'

export const LoadingScreen = ({ loading }) => { //TODO
    return (
        <div className="loading-screen" style={{ display: loading ? 'flex' : 'none' }}>
            <div className="loading-overlay">
                <LottieAnimation width={200} height={200} />
                Cargando...
            </div>
        </div>
    );
};

const Register = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleRegisterSubmit = async (data) => {
        setLoading(true)
        try {
            await createNewUser(data)
            setLoading(false)
            navigate(routes.login)
        } catch (error) {
            console.error('Error handleRegisterSubmit: ', error)
            setLoading(false)
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#262529'
        }}>
            <Header
                textPrimaryButton={'Iniciar sesión'}
                textSecondaryButton={'Volver a la página principal'}
                action1={() => navigate(routes.login)}
                action2={() => navigate(routes.home)}
            />
            <div className={'container'}>
                <LoadingScreen loading={loading} />
                <FormCard title={'Registrarse'} inputs={inputsRegister} onSubmit={handleRegisterSubmit}>
                    <div style={{
                        width: '100%',
                        gap: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '30px',
                        alignItems: 'center'
                    }}>
                        <FormButton text={'Crear usuario'} type={'primary'} />
                        <FormButton text={'Volver'} type={'secondary'} action={() => navigate(routes.login)} />
                    </div>
                </FormCard>
            </div>
        </div>
    )
}

export default Register