import React from 'react'
import TecNMLogo from '@/assets/TecNM2021.png'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetPassword: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-8 md:mb-0 md:mr-8 flex flex-col items-center">
        <img src={TecNMLogo} alt="TecNM Logo" className="w-64 mb-4" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Restablecer Contraseña</h1>
        <p className="mb-4">
          Ingrese su correo electrónico para restablecer la contraseña
        </p>
        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default ResetPassword
