import React from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Card, Badge } from '@/components/index'

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="p-6">
      <Card className="p-6 bg-gray-800 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-2">Información del Usuario</h2>
          </div>
          <div>
            <p>
              <strong>Nombre:</strong> {user?.first_name} {user?.last_name}
            </p>
          </div>
          <div>
            <p>
              <strong>Correo Electrónico:</strong> {user?.email}
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-bold mt-4 mb-2">Roles</h3>
            <div className="flex flex-wrap gap-2">
              {user?.role.map((role: string) => (
                <Badge key={role.id} className="bg-blue-600 text-white">
                  {role.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
