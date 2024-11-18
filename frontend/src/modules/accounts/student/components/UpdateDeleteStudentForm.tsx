import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import {
  updateStudent,
  deleteStudent,
} from '@/redux/actions/accounts/studentActions'
import { RootState, AppDispatch } from '@/redux/store'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Student } from '@/redux/models/accounts'
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

interface UpdateDeleteStudentFormProps {
  student: Student
}

const UpdateDeleteStudentForm: React.FC<UpdateDeleteStudentFormProps> = ({
  student,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.student,
  )
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    first_name: student.first_name,
    last_name: student.last_name,
    email: student.email,
    phone_number: student.phone_number,
    control_number: student.control_number,
    degree: student.degree,
  })

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  useEffect(() => {
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone_number: student.phone_number,
      control_number: student.control_number,
      degree: student.degree,
    })
  }, [student])

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
    dispatch(updateStudent(student.id, formData))
  }

  const handleDelete = () => {
    setIsAlertDialogOpen(true)
  }

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteStudent(student.id))
    toast({
      title: '¡Hecho!',
      description: '¡Estudiante eliminado con éxito!',
    })
    setIsAlertDialogOpen(false)
    handleBack()
  }

  const handleBack = () => {
    navigate('/personas')
  }

  useEffect(() => {
    if (detailCode === 'UPDATE_STUDENT_SUCCESS') {
      toast({
        title: '¡Muy bien!',
        description: message,
      })
    }
    if (detailCode === 'UPDATE_STUDENT_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [dispatch, detailCode])

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Estudiante</CardTitle>
        <CardDescription>Modifica los detalles del estudiante.</CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {student.created_at}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="is_active"
            className="block text-sm font-medium text-gray-700"
          >
            Este estudiante está{' '}
            <strong className="text-gray-900">
              {student.is_active ? 'activo' : 'desactivado'}
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
              htmlFor="control_number"
              className="block text-sm font-medium text-gray-700"
            >
              Número de Control
            </Label>
            <Input
              id="control_number"
              name="control_number"
              type="text"
              value={formData.control_number}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.control_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.control_number[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="degree"
              className="block text-sm font-medium text-gray-700"
            >
              Carrera
            </Label>
            <Input
              id="degree"
              name="degree"
              type="text"
              value={formData.degree}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.degree && (
              <p className="text-red-500 text-sm mt-1">{errors.degree[0]}</p>
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
                      permanentemente al estudiante y sus datos asociados.
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

export default UpdateDeleteStudentForm
