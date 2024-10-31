import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '@/redux/store'
import { signup } from '@/redux/actions/accounts/authActions'
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
import { toast } from '@/hooks/use-toast'

const CreateUserModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
    role: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { error, message } = useSelector((state: RootState) => state.auth)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      signup(
        formData.email,
        formData.first_name,
        formData.last_name,
        formData.password,
        formData.re_password,
      ),
    )
  }

  useEffect(() => {
    setIsDialogOpen(false)
  }, [navigate])

  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
        role: '',
      })
    }
  }, [isDialogOpen])

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear usuario</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo usuario</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear un nuevo usuario.
          </DialogDescription>
          <form onSubmit={onSubmit} className="mt-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <div className="mb-4">
                  <Label htmlFor="first_name">Nombre</Label>
                  <Input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={onChange}
                    required
                    placeholder="Nombre"
                  />
                  {error?.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {error.first_name[0]}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <Label htmlFor="last_name">Apellido</Label>
                  <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={onChange}
                    required
                    placeholder="Apellido"
                  />
                  {error?.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {error.last_name[0]}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <Label htmlFor="role">Rol</Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="EMPLOYEE">Empleado</SelectItem>
                      <SelectItem value="VIEWER">Vista</SelectItem>
                    </SelectContent>
                  </Select>
                  {error?.role && (
                    <p className="text-red-500 text-sm mt-1">{error.role[0]}</p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                    placeholder="Correo electrónico"
                  />
                  {error?.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {error.email[0]}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    required
                    placeholder="Contraseña"
                  />
                  {error?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {error.password[0]}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <Label htmlFor="re_password">Confirmar Contraseña</Label>
                  <Input
                    type="password"
                    name="re_password"
                    value={formData.re_password}
                    onChange={onChange}
                    required
                    placeholder="Confirmar Contraseña"
                  />
                  {error?.re_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {error.re_password[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {error && <p className="text-red-500">{error.detail}</p>}
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

export default CreateUserModal
