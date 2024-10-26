import React from 'react'
import SendResetPassForm from '../components/SendResetPassForm'

const ResetPassword = () => {
  return (
    <div>
      <h1>Recuperar contraseña</h1>
      <p>Ingresa tu correo electronico para recuperar tu contraseña</p>
      <SendResetPassForm />
    </div>
  )
}

export default ResetPassword
