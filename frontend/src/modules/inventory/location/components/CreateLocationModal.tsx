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
} from '@/components/ui/select' // Importa los componentes del nuevo Select
import {
  createLocation,
  fetchLocations,
} from '@/redux/actions/inventory/locationActions'
import { fetchSimplifiedWarehouses } from '@/redux/actions/inventory/warehouseActions' // Nueva acción para fetchSimplifiedWarehouses
import { createLocationFailure } from '@/redux/slices/inventory/locationSlice'
import { RootState, AppDispatch } from '@/redux/store'
import { useToast } from '@/hooks/use-toast'

const CreateLocationModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState({
    name: '',
    description: '',
    warehouse: '', // Nuevo campo para warehouse ID
  })
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.location,
  )
  const { simplifiedWarehouses } = useSelector(
    (state: RootState) => state.warehouse,
  ) // Obtener warehouses simplificados del estado global
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      dispatch(fetchSimplifiedWarehouses(searchTerm)) // Fetch warehouses simplificados cuando el dialog se abre
    }
  }, [isDialogOpen, searchTerm, dispatch])

  const handleCreateLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createLocation({ ...form })) // Enviar warehouse como string
  }

  useEffect(() => {
    if (detailCode === 'CREATE_LOCATION_SUCCESS') {
      toast({
        title: '¡Listo!',
        description: message,
      })
      dispatch(fetchLocations(1))
      setIsDialogOpen(false)
    } else if (detailCode === 'CREATE_LOCATION_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [detailCode, message, toast, dispatch])

  useEffect(() => {
    if (!isDialogOpen) {
      setForm({
        name: '',
        description: '',
        warehouse: '', // Reset warehouse ID
      })
      dispatch(
        createLocationFailure({ error: null, errors: null, status: null }),
      )
    }
  }, [isDialogOpen, dispatch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleWarehouseChange = (value: string) => {
    setForm({ ...form, warehouse: value })
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear ubicación</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nueva ubicación</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear una nueva ubicación.
          </DialogDescription>
          <form onSubmit={handleCreateLocation} className="mt-4">
            <div className="mb-4">
              <Input
                placeholder="Nombre"
                value={form.name}
                onChange={(e: any) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
              {errors?.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Descripción"
                value={form.description}
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              {errors?.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Buscar campus"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Select
                value={form.warehouse}
                onValueChange={handleWarehouseChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un campus" />
                </SelectTrigger>
                <SelectContent>
                  {simplifiedWarehouses.map((wh) => (
                    <SelectItem key={wh.id} value={wh.id}>
                      {wh.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.warehouse && errors.warehouse.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.warehouse[0]}
                </p>
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

export default CreateLocationModal
