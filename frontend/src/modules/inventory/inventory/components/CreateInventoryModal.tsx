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
  createInventory,
  fetchInventories,
} from '@/redux/actions/inventory/inventoryActions'
import { fetchSimplifiedProducts } from '@/redux/actions/inventory/productActions'
import { fetchSimplifiedLocations } from '@/redux/actions/inventory/locationActions'
import { RootState, AppDispatch } from '@/redux/store'
import { useToast } from '@/hooks/use-toast'

const CreateInventoryModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState({
    location: '',
    product: '',
  })
  const [locationSearchTerm, setLocationSearchTerm] = useState('')
  const [productSearchTerm, setProductSearchTerm] = useState('')
  const { toast } = useToast()
  const { detailCode, message, errors } = useSelector(
    (state: RootState) => state.inventory,
  )
  const { simplifiedProducts } = useSelector(
    (state: RootState) => state.product,
  )
  const { simplifiedLocations } = useSelector(
    (state: RootState) => state.location,
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      dispatch(fetchSimplifiedProducts(productSearchTerm))
      dispatch(fetchSimplifiedLocations(locationSearchTerm))
    }
  }, [isDialogOpen, dispatch, productSearchTerm, locationSearchTerm])

  const handleCreateInventory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createInventory(form))
  }

  useEffect(() => {
    if (detailCode === 'CREATE_INVENTORY_SUCCESS') {
      toast({
        title: '¡Listo!',
        description: message,
      })
      dispatch(fetchInventories(1))
      setIsDialogOpen(false)
    } else if (detailCode === 'CREATE_INVENTORY_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [detailCode, message, toast, dispatch])

  useEffect(() => {
    if (!isDialogOpen) {
      setForm({
        product: '',
        location: '',
      })
    }
  }, [isDialogOpen, dispatch])

  const handleLocationSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLocationSearchTerm(e.target.value)
  }

  const handleLocationSearchClick = () => {
    dispatch(fetchSimplifiedLocations(locationSearchTerm))
  }

  const handleProductSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProductSearchTerm(e.target.value)
  }

  const handleProductSearchClick = () => {
    dispatch(fetchSimplifiedProducts(productSearchTerm))
  }

  const handleProductChange = (value: string) => {
    setForm({ ...form, product: value })
  }

  const handleLocationChange = (value: string) => {
    setForm({ ...form, location: value })
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear inventario</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo inventario</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear un nuevo inventario.
          </DialogDescription>
          <form onSubmit={handleCreateInventory} className="mt-4">
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
                value={form.location}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.location[0]}
                </p>
              )}
            </div>
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
              <Select value={form.product} onValueChange={handleProductChange}>
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
              {errors?.non_field_errors && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.non_field_errors[0]}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="mr-2"
                disabled={!form.location || !form.product}
              >
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

export default CreateInventoryModal
