import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button, Input, Label } from '@/components/index'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  createTransaction,
  fetchTransactions,
} from '@/redux/actions/inventory/inventoryTransactionActions'
import { fetchSimplifiedInventories } from '@/redux/actions/inventory/inventoryActions'
import { fetchSimplifiedStudents } from '@/redux/actions/accounts/studentActions'
import { RootState, AppDispatch } from '@/redux/store'
import { useToast } from '@/hooks/use-toast'

const CreateTransactionModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState({
    inventory: '',
    person: '',
    quantity: 0,
    movement: 'IN',
    type: 'PURCHASE',
    description: '',
  })
  const [inventorySearchTerm, setInventorySearchTerm] = useState('')
  const [studentSearchTerm, setStudentSearchTerm] = useState('')
  const { toast } = useToast()
  const { detailCode, message, errors } = useSelector(
    (state: RootState) => state.inventoryTransaction,
  )
  const { simplifiedInventories } = useSelector(
    (state: RootState) => state.inventory,
  )
  const { simplifiedStudents } = useSelector(
    (state: RootState) => state.student,
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      dispatch(fetchSimplifiedInventories(inventorySearchTerm))
      dispatch(fetchSimplifiedStudents(studentSearchTerm))
    }
  }, [isDialogOpen, dispatch, inventorySearchTerm, studentSearchTerm])

  const handleCreateTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createTransaction(form))
  }

  useEffect(() => {
    if (detailCode === 'CREATE_TRANSACTION_SUCCESS') {
      toast({
        title: '¡Listo!',
        description: message,
      })
      dispatch(fetchTransactions(1))
      setIsDialogOpen(false)
    } else if (detailCode === 'CREATE_TRANSACTION_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [detailCode, message, toast, dispatch])

  useEffect(() => {
    if (!isDialogOpen) {
      setForm({
        inventory: '',
        person: '',
        quantity: 0,
        movement: 'IN',
        type: 'PURCHASE',
        description: '',
      })
    }
  }, [isDialogOpen, dispatch])

  const handleInventorySearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInventorySearchTerm(e.target.value)
  }

  const handleInventorySearchClick = () => {
    dispatch(fetchSimplifiedInventories(inventorySearchTerm))
  }

  const handleStudentSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStudentSearchTerm(e.target.value)
  }

  const handleStudentSearchClick = () => {
    dispatch(fetchSimplifiedStudents(studentSearchTerm))
  }

  const handleInventoryChange = (value: string) => {
    setForm({ ...form, inventory: value })
  }

  const handleStudentChange = (value: string) => {
    setForm({ ...form, person: value })
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, quantity: parseInt(e.target.value) })
  }

  const handleMovementChange = (value: string) => {
    setForm({ ...form, movement: value })
  }

  const handleTypeChange = (value: string) => {
    setForm({ ...form, type: value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, description: e.target.value })
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear transacción</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nueva transacción</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear una nueva transacción.
          </DialogDescription>
          <form onSubmit={handleCreateTransaction} className="mt-4">
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
                value={form.inventory}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.inventory[0]}
                </p>
              )}
            </div>
            <div className="mb-4 flex items-center">
              <Input
                placeholder="Buscar estudiante"
                value={studentSearchTerm}
                onChange={handleStudentSearchChange}
              />
              <Button
                className="ml-2"
                type="button"
                onClick={handleStudentSearchClick}
              >
                Buscar
              </Button>
            </div>
            <div className="mb-4">
              <Select value={form.person} onValueChange={handleStudentChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un estudiante" />
                </SelectTrigger>
                <SelectContent>
                  {simplifiedStudents.map((student: any) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.first_name} {student.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.person && (
                <p className="text-red-500 text-sm mt-1">{errors.person[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Cantidad"
                type="number"
                value={form.quantity}
                onChange={handleQuantityChange}
                required
              />
              {errors?.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Select
                value={form.movement}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.movement[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Select value={form.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PURCHASE">Compra</SelectItem>
                  <SelectItem value="RETURN">Devolución</SelectItem>
                  <SelectItem value="SALE">Venta</SelectItem>
                  <SelectItem value="LOST">Perdido</SelectItem>
                  <SelectItem value="DAMAGED">Dañado</SelectItem>
                  <SelectItem value="LOAN">Préstamo</SelectItem>
                </SelectContent>
              </Select>
              {errors?.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Descripción"
                value={form.description}
                onChange={handleDescriptionChange}
              />
              {errors?.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description[0]}
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

export default CreateTransactionModal
