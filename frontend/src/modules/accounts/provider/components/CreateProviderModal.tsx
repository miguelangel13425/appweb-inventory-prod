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
  createProvider,
  fetchProviders,
} from '@/redux/actions/accounts/providerActions'
import { RootState, AppDispatch } from '@/redux/store'
import { useToast } from '@/hooks/use-toast'

const CreateProviderModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    RFC: '',
    NSS: '',
  })
  const { toast } = useToast()
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.provider,
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateProvider = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createProvider(form))
  }

  useEffect(() => {
    if (detailCode === 'CREATE_PROVIDER_SUCCESS') {
      toast({
        title: '¡Listo!',
        description: message,
      })
      dispatch(fetchProviders(1))
      setIsDialogOpen(false)
    } else if (detailCode === 'CREATE_PROVIDER_VALIDATION_ERROR') {
      toast({
        title: '¡Lo siento!',
        description: message,
      })
    }
  }, [status, message, toast, dispatch])

  useEffect(() => {
    if (!isDialogOpen) {
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        RFC: '',
        NSS: '',
      })
    }
  }, [isDialogOpen, dispatch])

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear proveedor</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo proveedor</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear un nuevo proveedor.
          </DialogDescription>
          <form onSubmit={handleCreateProvider} className="mt-4">
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
                placeholder="RFC"
                value={form.RFC}
                onChange={(e: any) => setForm({ ...form, RFC: e.target.value })}
                required
              />
              {errors?.RFC && (
                <p className="text-red-500 text-sm mt-1">{errors.RFC[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="NSS"
                value={form.NSS}
                onChange={(e: any) => setForm({ ...form, NSS: e.target.value })}
                required
              />
              {errors?.NSS && (
                <p className="text-red-500 text-sm mt-1">{errors.NSS[0]}</p>
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

export default CreateProviderModal
