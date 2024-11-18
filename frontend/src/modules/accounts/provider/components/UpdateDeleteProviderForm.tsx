import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import {
  updateProvider,
  deleteProvider,
} from '@/redux/actions/accounts/providerActions'
import { RootState, AppDispatch } from '@/redux/store'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Provider } from '@/redux/models/accounts'
import { Button, Input, Textarea, Label } from '@/components/index'
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

interface UpdateDeleteProviderFormProps {
  provider: Provider
}

const UpdateDeleteProviderForm: React.FC<UpdateDeleteProviderFormProps> = ({
  provider,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.provider,
  )
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    first_name: provider.first_name,
    last_name: provider.last_name,
    email: provider.email,
    phone_number: provider.phone_number,
    RFC: provider.RFC,
    NSS: provider.NSS,
  })

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  useEffect(() => {
    setFormData({
      first_name: provider.first_name,
      last_name: provider.last_name,
      email: provider.email,
      phone_number: provider.phone_number,
      RFC: provider.RFC,
      NSS: provider.NSS,
    })
  }, [provider])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateProvider(provider.id, formData))
  }

  const handleDelete = () => {
    setIsAlertDialogOpen(true)
  }

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteProvider(provider.id))
    toast({
      title: '¡Hecho!',
      description: '¡Proveedor eliminado con éxito!',
    })
    setIsAlertDialogOpen(false)
    handleBack()
  }

  const handleBack = () => {
    navigate('/personas')
  }

  useEffect(() => {
    if (detailCode === 'UPDATE_PROVIDER_SUCCESS') {
      toast({
        title: '¡Muy bien!',
        description: message,
      })
    }
    if (detailCode === 'UPDATE_PROVIDER_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [dispatch, detailCode])

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Proveedor</CardTitle>
        <CardDescription>Modifica los detalles del proveedor.</CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {provider.created_at}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="is_active"
            className="block text-sm font-medium text-gray-700"
          >
            Este proveedor está{' '}
            <strong className="text-gray-900">
              {provider.is_active ? 'activo' : 'desactivado'}
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700"
            >
              Número de Teléfono
            </Label>
            <Input
              id="phone_number"
              name="phone_number"
              type="text"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.phone_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone_number[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="RFC"
              className="block text-sm font-medium text-gray-700"
            >
              RFC
            </Label>
            <Input
              id="RFC"
              name="RFC"
              type="text"
              value={formData.RFC}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.RFC && (
              <p className="text-red-500 text-sm mt-1">{errors.RFC[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="NSS"
              className="block text-sm font-medium text-gray-700"
            >
              NSS
            </Label>
            <Input
              id="NSS"
              name="NSS"
              type="text"
              value={formData.NSS}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.NSS && (
              <p className="text-red-500 text-sm mt-1">{errors.NSS[0]}</p>
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
                      permanentemente al proveedor y sus datos asociados.
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

export default UpdateDeleteProviderForm
