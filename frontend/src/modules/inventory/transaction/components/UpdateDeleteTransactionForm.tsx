import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import {
  updateTransaction,
  deleteTransaction,
} from '@/redux/actions/inventory/inventoryTransactionActions'
import { fetchSimplifiedInventories } from '@/redux/actions/inventory/inventoryActions'
import { fetchSimplifiedStudents } from '@/redux/actions/accounts/studentActions'
import { fetchSimplifiedProviders } from '@/redux/actions/accounts/providerActions'
import { InventoryTransaction } from '@/redux/models/inventory'
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

interface UpdateDeleteTransactionFormProps {
  transaction: InventoryTransaction
}

const UpdateDeleteTransactionForm: React.FC<
  UpdateDeleteTransactionFormProps
> = ({ transaction }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.inventoryTransaction,
  )
  const { simplifiedInventories } = useSelector(
    (state: RootState) => state.inventory,
  )
  const { simplifiedStudents } = useSelector(
    (state: RootState) => state.student,
  )
  const { simplifiedProviders } = useSelector(
    (state: RootState) => state.provider,
  )
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    inventory: transaction.inventory.id,
    person: transaction.person?.id || '',
    quantity: transaction.quantity,
    movement: transaction.movement,
    type: transaction.type,
    description: transaction.description,
  })

  const [inventorySearchTerm, setInventorySearchTerm] = useState('')
  const [personSearchTerm, setPersonSearchTerm] = useState('')
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  useEffect(() => {
    setFormData({
      inventory: transaction.inventory.id,
      person: transaction.person?.id || '',
      quantity: transaction.quantity,
      movement: transaction.movement,
      type: transaction.type,
      description: transaction.description,
    })
    dispatch(fetchSimplifiedInventories('', transaction.inventory.id))
    dispatch(fetchSimplifiedProviders('', transaction.person?.id))
    dispatch(fetchSimplifiedStudents('', transaction.person?.id))
  }, [transaction, dispatch])

  const handleInventoryChange = (value: string) => {
    setFormData({ ...formData, inventory: value })
  }

  const handlePersonChange = (value: string) => {
    setFormData({ ...formData, person: value })
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, quantity: parseInt(e.target.value) })
  }

  const handleMovementChange = (value: string) => {
    setFormData({ ...formData, movement: value, person: '' }) // Reset person when movement changes
    setPersonSearchTerm('') // Reset search term when movement changes
    if (value === 'IN') {
      dispatch(fetchSimplifiedProviders(''))
    } else {
      dispatch(fetchSimplifiedStudents(''))
    }
  }

  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, description: e.target.value })
  }

  const handleInventorySearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInventorySearchTerm(e.target.value)
  }

  const handleInventorySearchClick = () => {
    dispatch(fetchSimplifiedInventories(inventorySearchTerm))
  }

  const handlePersonSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonSearchTerm(e.target.value)
  }

  const handlePersonSearchClick = () => {
    if (formData.movement === 'IN') {
      dispatch(fetchSimplifiedProviders(personSearchTerm))
    } else {
      dispatch(fetchSimplifiedStudents(personSearchTerm))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateTransaction(transaction.id, formData))
  }

  const handleDelete = () => {
    setIsAlertDialogOpen(true)
  }

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteTransaction(transaction.id))
    toast({
      title: '¡Hecho!',
      description: '¡Transacción eliminada con éxito!',
    })
    setIsAlertDialogOpen(false)
    handleBack()
  }

  const handleBack = () => {
    navigate('/transacciones')
  }

  useEffect(() => {
    if (detailCode === 'UPDATE_TRANSACTION_SUCCESS') {
      toast({
        title: '¡Muy bien!',
        description: message,
      })
    }
    if (detailCode === 'UPDATE_TRANSACTION_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [dispatch, detailCode, message, toast])

  const renderTypeOptions = () => {
    if (formData.movement === 'IN') {
      return (
        <>
          <SelectItem value="PURCHASE">Compra</SelectItem>
          <SelectItem value="RETURN">Devolución</SelectItem>
        </>
      )
    } else {
      return (
        <>
          <SelectItem value="SALE">Venta</SelectItem>
          <SelectItem value="LOST">Perdido</SelectItem>
          <SelectItem value="DAMAGED">Dañado</SelectItem>
          <SelectItem value="LOAN">Préstamo</SelectItem>
        </>
      )
    }
  }

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Transacción</CardTitle>
        <CardDescription>
          Modifica los detalles de la transacción.
        </CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {transaction.created_at}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Buscar inventario"
              value={inventorySearchTerm}
              onChange={handleInventorySearchChange}
            />
            <Button
              className="ml-2"
              type="button"
              onClick={handleInventorySearchClick}
            >
              Buscar
            </Button>
          </div>
          <div className="mb-4">
            <Select
              value={formData.inventory}
              onValueChange={handleInventoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un inventario" />
              </SelectTrigger>
              <SelectContent>
                {simplifiedInventories.map((inventory: any) => (
                  <SelectItem key={inventory.id} value={inventory.id}>
                    {inventory.product.name} - {inventory.location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.inventory && (
              <p className="text-red-500 text-sm mt-1">{errors.inventory[0]}</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <Input
              placeholder={`Buscar ${formData.movement === 'IN' ? 'proveedor' : 'estudiante'}`}
              value={personSearchTerm}
              onChange={handlePersonSearchChange}
            />
            <Button
              className="ml-2"
              type="button"
              onClick={handlePersonSearchClick}
            >
              Buscar
            </Button>
          </div>
          <div className="mb-4">
            <Select value={formData.person} onValueChange={handlePersonChange}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={`Seleccione un ${formData.movement === 'IN' ? 'proveedor' : 'estudiante'}`}
                />
              </SelectTrigger>
              <SelectContent>
                {(formData.movement === 'IN'
                  ? simplifiedProviders
                  : simplifiedStudents
                ).map((person: any) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.first_name} {person.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.person && (
              <p className="text-red-500 text-sm mt-1">{errors.person[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <Select
              value={formData.movement}
              onValueChange={handleMovementChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un movimiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IN">Entrada</SelectItem>
                <SelectItem value="OUT">Salida</SelectItem>
              </SelectContent>
            </Select>
            {errors?.movement && (
              <p className="text-red-500 text-sm mt-1">{errors.movement[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un tipo" />
              </SelectTrigger>
              <SelectContent>{renderTypeOptions()}</SelectContent>
            </Select>
            {errors?.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Cantidad"
              type="number"
              value={formData.quantity}
              onChange={handleQuantityChange}
              required
            />
            {errors?.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity[0]}</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <Input
              placeholder="Descripción"
              value={formData.description}
              onChange={handleDescriptionChange}
            />
            {errors?.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description[0]}
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
                      permanentemente la transacción y sus datos asociados.
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

export default UpdateDeleteTransactionForm
