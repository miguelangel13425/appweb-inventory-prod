import React from 'react'
import { Button, Card, Avatar } from '@/components/index'
import { useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/solid'

const Forbidden: React.FC = () => {
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
            alt="403"
          />
          <h1 className="text-4xl font-bold text-impactBlue mb-4">403</h1>
          <h2 className="text-xl font-semibold mb-4">Acceso Prohibido</h2>
          <p className="text-gray-600 mb-8 text-center">
            Lo sentimos, pero no tienes permiso para acceder a esta página.
          </p>
          <Button
            variant="primary"
            className="flex items-center space-x-2"
            onClick={handleGoBack}
          >
            <LockClosedIcon className="h-5 w-5" />
            <span>Volver al inicio</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Forbidden
