import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button, Input } from '@/components/index'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  createStudent,
  fetchStudents,
} from '@/redux/actions/accounts/studentActions'
import { RootState, AppDispatch } from '@/redux/store'
import { useToast } from '@/hooks/use-toast'
import { DegreeChoices } from '@/redux/models/inventory'

const CreateStudentModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    control_number: '',
    degree: '',
  })
  const { toast } = useToast()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.student,
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createStudent(form))
  }

  useEffect(() => {
    if (detailCode === 'CREATE_STUDENT_SUCCESS') {
      toast({
        title: '¡Listo!',
        description: message,
      })
      dispatch(fetchStudents(1))
      setIsDialogOpen(false)
    } else if (detailCode === 'CREATE_STUDENT_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [detailCode, message, toast, dispatch])

  useEffect(() => {
    if (!isDialogOpen) {
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        control_number: '',
        degree: '',
      })
    }
  }, [isDialogOpen, dispatch])

  const handleDegreeChange = (value: string) => {
    setForm({ ...form, degree: value })
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear estudiante</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo estudiante</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear un nuevo estudiante.
          </DialogDescription>
          <form onSubmit={handleCreateStudent} className="mt-4">
            <div className="mb-4">
              <Input
                placeholder="Nombre"
                value={form.first_name}
                onChange={(e: any) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                required
              />
              {errors?.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.first_name[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Apellido"
                value={form.last_name}
                onChange={(e: any) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                required
              />
              {errors?.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.last_name[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Correo Electrónico"
                value={form.email}
                onChange={(e: any) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
              {errors?.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Número de Teléfono"
                value={form.phone_number}
                onChange={(e: any) =>
                  setForm({ ...form, phone_number: e.target.value })
                }
              />
              {errors?.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Número de Control"
                value={form.control_number}
                onChange={(e: any) =>
                  setForm({ ...form, control_number: e.target.value })
                }
                required
              />
              {errors?.control_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.control_number[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Select value={form.degree} onValueChange={handleDegreeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un grado" />
                </SelectTrigger>
                <SelectContent>
                  {DegreeChoices.map((choice) => (
                    <SelectItem key={choice.value} value={choice.value}>
                      {choice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.degree && (
                <p className="text-red-500 text-sm mt-1">{errors.degree[0]}</p>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="mr-2">
                Crear
              </Button>
              <DialogTrigger asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogTrigger>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateStudentModal
