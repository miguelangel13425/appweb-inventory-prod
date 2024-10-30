import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '@/redux/store'
import { resetPasswordConfirm } from '@/redux/actions/accounts/authActions'
import { Button, Input, Label } from '@/components/index'

const ResetPasswordConfirmForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { uid, token } = useParams<{ uid: string; token: string }>()
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  })
  const [requestSent, setRequestSent] = useState(false)
  const { error } = useSelector((state: RootState) => state.auth)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (uid && token) {
      dispatch(
        resetPasswordConfirm(
          uid,
          token,
          formData.new_password,
          formData.re_new_password,
        ),
      )
      setRequestSent(true)
    }
  }

  if (requestSent) {
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-md bg-gray-900 text-white">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <Label htmlFor="new_password">Nueva Contraseña</Label>
          <Input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={onChange}
            required
            placeholder="Nueva Contraseña"
            className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="re_new_password">Confirmar Nueva Contraseña</Label>
          <Input
            type="password"
            name="re_new_password"
            value={formData.re_new_password}
            onChange={onChange}
            required
            placeholder="Confirmar Nueva Contraseña"
            className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
          />
        </div>
        {error && <p className="text-red-500">{error.detail}</p>}
        <div className="flex justify-between items-center">
          <Button type="submit" variant="ghost">
            Restablecer Contraseña
          </Button>
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordConfirmForm
