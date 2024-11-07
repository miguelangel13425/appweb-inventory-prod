import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button, Input, Switch, Label } from '@/components/index'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  createProduct,
  fetchProducts,
} from '@/redux/actions/inventory/productActions'
import { fetchSimplifiedCategories } from '@/redux/actions/inventory/categoryActions'
import { RootState, AppDispatch } from '@/redux/store'
import { useToast } from '@/hooks/use-toast'

const CreateProductModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState({
    name: '',
    description: '',
    unit: 'PC',
    category: '',
    is_single_use: false,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()
  const { detailCode, message, errors } = useSelector(
    (state: RootState) => state.product,
  )
  const { simplifiedCategories } = useSelector(
    (state: RootState) => state.category,
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      dispatch(fetchSimplifiedCategories(searchTerm))
    }
  }, [isDialogOpen, dispatch])

  const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createProduct(form))
  }

  useEffect(() => {
    if (detailCode === 'CREATE_PRODUCT_SUCCESS') {
      toast({
        title: '¡Listo!',
        description: message,
      })
      dispatch(fetchProducts(1))
      setIsDialogOpen(false)
    } else if (detailCode === 'CREATE_PRODUCT_VALIDATION_ERROR') {
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
        unit: 'PC',
        category: '',
        is_single_use: false,
      })
    }
  }, [isDialogOpen, dispatch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchClick = () => {
    dispatch(fetchSimplifiedCategories(searchTerm))
  }

  const handleCategoryChange = (value: string) => {
    setForm({ ...form, category: value })
  }

  const handleUnitChange = (value: string) => {
    setForm({ ...form, unit: value })
  }

  const handleSingleUseChange = (value: boolean) => {
    setForm({ ...form, is_single_use: value })
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear producto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo producto</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear un nuevo producto.
          </DialogDescription>
          <form onSubmit={handleCreateProduct} className="mt-4">
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
              <Select value={form.unit} onValueChange={handleUnitChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione una unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GAL">Galón</SelectItem>
                  <SelectItem value="PC">Pieza</SelectItem>
                  <SelectItem value="BOX">Caja</SelectItem>
                  <SelectItem value="M">Metro</SelectItem>
                  <SelectItem value="PKG">Paquete</SelectItem>
                </SelectContent>
              </Select>
              {errors?.unit && (
                <p className="text-red-500 text-sm mt-1">{errors.unit[0]}</p>
              )}
            </div>
            <div className="mb-4 flex items-center">
              <Input
                placeholder="Buscar categoría"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button
                className="ml-2"
                type="button"
                onClick={handleSearchClick}
              >
                Buscar
              </Button>
            </div>
            <div className="mb-4">
              <Select
                value={form.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {simplifiedCategories.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.code} - {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={form.is_single_use}
                  onCheckedChange={handleSingleUseChange}
                />
                <Label className="text-gray-500" htmlFor="is_single_use">
                  Consumible
                </Label>
              </div>
              {errors?.is_single_use && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.is_single_use[0]}
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

export default CreateProductModal
