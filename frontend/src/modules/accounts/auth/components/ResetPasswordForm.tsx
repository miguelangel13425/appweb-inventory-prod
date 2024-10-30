import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '@/redux/store'
import { resetPassword } from '@/redux/actions/accounts/authActions'
import { Button, Input, Label, Card } from '@/components/index'

const ResetPasswordForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [requestSent, setRequestSent] = useState(false)

  const { error } = useSelector((state: RootState) => state.auth)

  const goToLogin = () => {
    navigate('/login')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetPassword(email))
    setRequestSent(true)
  }

  if (requestSent) {
    navigate('/login')
  }

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-md bg-gray-900 text-white">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Correo electrónico"
            className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
          />
        </div>
        {error && <p className="text-red-500">{error.detail}</p>}
        <div className="flex justify-between items-center">
          <Button type="submit" variant="ghost">
            Enviar correo
          </Button>
          <Button variant="ghost" onClick={goToLogin}>
            Volver
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordForm
