import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import CreateJWTForm from '../components/CreateJWTForm'
import TecNMLogo from '@/assets/TecNM2021.png'

const Signin: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  )

  if (isAuthenticated && user) {
    navigate('/')
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-8 md:mb-0 md:mr-8 flex flex-col items-center">
        <img src={TecNMLogo} alt="TecNM Logo" className="w-64 mb-4" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        <p className="mb-4">Ingresa tus credenciales para acceder al sistema</p>
        <CreateJWTForm />
      </div>
    </div>
  )
}

export default Signin
