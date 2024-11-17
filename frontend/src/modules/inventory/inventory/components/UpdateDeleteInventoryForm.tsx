import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import {
  updateInventory,
  deleteInventory,
} from '@/redux/actions/inventory/inventoryActions'
import { fetchSimplifiedProducts } from '@/redux/actions/inventory/productActions'
import { fetchSimplifiedLocations } from '@/redux/actions/inventory/locationActions'
import { Inventory } from '@/redux/models/inventory'
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

interface UpdateDeleteInventoryFormProps {
  inventory: Inventory
}

const UpdateDeleteInventoryForm: React.FC<UpdateDeleteInventoryFormProps> = ({
  inventory,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.inventory,
  )
  const { simplifiedProducts } = useSelector(
    (state: RootState) => state.product,
  )
  const { simplifiedLocations } = useSelector(
    (state: RootState) => state.location,
  )
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    product: inventory.product.id,
    location: inventory.location.id,
  })

  const [productSearchTerm, setProductSearchTerm] = useState('')
  const [locationSearchTerm, setLocationSearchTerm] = useState('')
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  useEffect(() => {
    setFormData({
      product: inventory.product.id,
      location: inventory.location.id,
    })
    dispatch(fetchSimplifiedProducts('', inventory.product.id))
    dispatch(fetchSimplifiedLocations('', inventory.location.id))
  }, [inventory, dispatch])

  const handleProductChange = (value: string) => {
    setFormData({ ...formData, product: value })
  }

  const handleLocationChange = (value: string) => {
    setFormData({ ...formData, location: value })
  }

  const handleProductSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProductSearchTerm(e.target.value)
  }

  const handleProductSearchClick = () => {
    dispatch(fetchSimplifiedProducts(productSearchTerm))
  }

  const handleLocationSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLocationSearchTerm(e.target.value)
  }

  const handleLocationSearchClick = () => {
    dispatch(fetchSimplifiedLocations(locationSearchTerm))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateInventory(inventory.id, formData))
  }

  const handleDelete = () => {
    setIsAlertDialogOpen(true)
  }

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteInventory(inventory.id))
    toast({
      title: '¡Hecho!',
      description: '¡Inventario eliminado con éxito!',
    })
    setIsAlertDialogOpen(false)
    handleBack()
  }

  const handleBack = () => {
    navigate('/inventarios')
  }

  useEffect(() => {
    if (detailCode === 'UPDATE_INVENTORY_SUCCESS') {
      toast({
        title: '¡Muy bien!',
        description: message,
      })
    }
    if (detailCode === 'UPDATE_INVENTORY_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [dispatch, detailCode])

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Inventario</CardTitle>
        <CardDescription>Modifica los detalles del inventario.</CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {inventory.created_at}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="is_active"
            className="block text-sm font-medium text-gray-700"
          >
            Este inventario está{' '}
            <strong className="text-gray-900">
              {inventory.is_active ? 'vigente' : 'descontinuado'}
            </strong>
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Buscar producto"
              value={productSearchTerm}
              onChange={handleProductSearchChange}
            />
            <Button
              className="ml-2"
              type="button"
              onClick={handleProductSearchClick}
            >
              Buscar
            </Button>
          </div>
          <div className="mb-4">
            <Select
              value={formData.product}
              onValueChange={handleProductChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un producto" />
              </SelectTrigger>
              <SelectContent>
                {simplifiedProducts.map((product: any) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} {'('}
                    {product.category.name}
                    {' - '}
                    {product.category.code}
                    {')'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.product && (
              <p className="text-red-500 text-sm mt-1">{errors.product[0]}</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Buscar locación"
              value={locationSearchTerm}
              onChange={handleLocationSearchChange}
            />
            <Button
              className="ml-2"
              type="button"
              onClick={handleLocationSearchClick}
            >
              Buscar
            </Button>
          </div>
          <div className="mb-4">
            <Select
              value={formData.location}
              onValueChange={handleLocationChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una locación" />
              </SelectTrigger>
              <SelectContent>
                {simplifiedLocations.map((location: any) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name} - {location.warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location[0]}</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            {errors?.non_field_errors && (
              <p className="text-red-500 text-sm mt-1">
                {errors.non_field_errors[0]}
              </p>
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
                      permanentemente el inventario y sus datos asociados.
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

export default UpdateDeleteInventoryForm
