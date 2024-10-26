import React from 'react'
import { Button, Card, Avatar } from '@/components/index'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

const ServerError: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="max-w-md w-full shadow-lg p-6 bg-white rounded-lg">
        <div className="flex flex-col items-center">
          <Avatar
            className="mb-4"
            src="https://via.placeholder.com/150"
            alt="500"
          />
          <h1 className="text-4xl font-bold text-impactBlue mb-4">500</h1>
          <h2 className="text-xl font-semibold mb-4">
            Error Interno del Servidor
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Lo sentimos, pero algo salió mal en nuestro servidor. Por favor,
            inténtalo de nuevo más tarde.
          </p>
          <Button
            variant="primary"
            className="flex items-center space-x-2"
            onClick={handleGoBack}
          >
            <ExclamationCircleIcon className="h-5 w-5" />
            <span>Volver al inicio</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ServerError
