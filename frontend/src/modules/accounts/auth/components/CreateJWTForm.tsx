import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '@/redux/store'
import { login } from '@/redux/actions/accounts/authActions'
import { Button, Input, Label, Card } from '@/components/index'

const CreateJWTForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { error } = useSelector((state: RootState) => state.auth)

  const goToResetPassword = () => {
    navigate('/reset-password')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(formData.email, formData.password))
  }

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-md bg-gray-900 text-white">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            placeholder="Correo electrónico"
            className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
          />
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
            className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
          />
        </div>
        {error && <p className="text-red-500">{error.detail}</p>}
        <div className="flex justify-between items-center">
          <Button type="submit" variant="ghost">
            Iniciar Sesión
          </Button>
          <Button variant="ghost" onClick={goToResetPassword}>
            ¿Olvidé contraseña?
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateJWTForm
