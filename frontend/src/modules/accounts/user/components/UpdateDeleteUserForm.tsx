import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { updateUser, deleteUser } from '@/redux/actions/accounts/userActions'
import { User } from '@/redux/models/accounts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button, Input, Label } from '@/components/index'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface UpdateDeleteUserFormProps {
  user: User
}

const UpdateDeleteUserForm: React.FC<UpdateDeleteUserFormProps> = ({
  user,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.user,
  )
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
  })

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  useEffect(() => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    })
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUser(user.id, formData))
  }

  const handleDelete = () => {
    setIsAlertDialogOpen(true)
  }

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteUser(user.id))
    toast({
      title: '¡Hecho!',
      description: '¡Usuario eliminado con éxito!',
    })
    setIsAlertDialogOpen(false)
    handleBack()
  }

  const handleBack = () => {
    navigate('/usuarios')
  }

  useEffect(() => {
    if (detailCode === 'UPDATE_USER_SUCCESS') {
      toast({
        title: '¡Muy bien!',
        description: message,
      })
    }
    if (detailCode === 'UPDATE_USER_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [dispatch, detailCode])

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Usuario</CardTitle>
        <CardDescription>Modifica los detalles del usuario.</CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="date_joined"
            className="block text-sm font-medium text-gray-700"
          >
            Última conexión el {user.date_joined}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrônico{' '}
            <strong className="text-gray-900">{user.email}</strong>
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="is_active"
            className="block text-sm font-medium text-gray-700"
          >
            Este usuario está{' '}
            <strong className="text-gray-900">
              {user.is_active ? 'activo' : 'desactivado'}
            </strong>
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </Label>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </Label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Administrador</SelectItem>
                <SelectItem value="EMPLOYEE">Empleado</SelectItem>
                <SelectItem value="VIEWER">Vista</SelectItem>
              </SelectContent>
            </Select>
            {errors?.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role[0]}</p>
            )}
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={handleBack}
              className="bg-vibrantCyan text-white"
            >
              Volver
            </Button>
            <div className="flex space-x-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" className="bg-smartRed text-white">
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará
                      permanentemente al usuario y sus datos asociados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" className="bg-sunnyYellow text-white">
                Actualizar
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdateDeleteUserForm
