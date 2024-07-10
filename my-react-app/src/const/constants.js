export const routes = {
    login: '/',
    register: '/register',
    home: '/home'
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^[a-zA-Z0-9]{8,}$/
const suscriptions = [
    { "key": "free", "value": "Free" },
    { "key": "trial", "value": "Trial" },
    { "key": "pro", "value": "Pro" }
]

export const inputsLogin = [
    {
        title: 'Correo electrónico',
        name: 'email',
        type: 'email',
        required: {
            value: true,
            message: 'Por favor ingrese su correo electrónico'
        },
        validate: (value) => emailRegex.test(value) || 'El formato del correo electrónico no es válido'
    },
    {
        title: 'Contraseña',
        name: 'password',
        type: 'password',
        required: {
            value: true,
            message: 'Por favor ingrese su contraseña'
        }
    }
];

export const inputsRegister = [
    {
        title: 'Nombre',
        name: 'name',
        type: 'text',
        required: {
            value: true,
            message: 'El campo nombre no puede ser vacío'
        }
    },
    {
        title: 'Correo electrónico',
        name: 'email',
        type: 'email',
        required: {
            value: true,
            message: 'El campo correo electrónico no puede ser vacío'
        },
        validate: (value) => emailRegex.test(value) || 'El formato del correo electrónico no es válido'
    },
    {
        title: 'Repita correo electrónico',
        name: 'repemail',
        type: 'email',
        required: {
            value: true,
            message: 'El campo correo electrónico no puede ser vacío'
        },
        validate: (value, watch) => value === watch('email') || 'Los correos electrónicos no coinciden'
    },
    {
        title: 'Contraseña',
        name: 'password',
        type: 'password',
        required: {
            value: true,
            message: 'El campo contraseña no puede ser vacío'
        },
        validate: (value) => passwordRegex.test(value) || 'La contraseña debe ser alfanumérica de al menos 8 caracteres'
    },
    {
        title: 'Repita Contraseña',
        name: 'reppassword',
        type: 'password',
        required: {
            value: true,
            message: 'Campo obligatorio'
        },
        validate: (value, watch) => value === watch('password') || 'Las contraseñas no coinciden'
    },
    {
        title: 'Suscripción',
        name: 'suscription',
        type: 'dropdown',
        options: suscriptions
    }
]