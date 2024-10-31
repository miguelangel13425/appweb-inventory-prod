import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '@/redux/store'
import { verify } from '@/redux/actions/accounts/authActions'
import TecNMLogo from '@/assets/TecNM2021.png'

const ActivateAccount: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { uid, token } = useParams<{ uid: string; token: string }>()
  const [verified, setVerified] = useState(false)

  const verifyAccount = () => {
    if (uid && token) {
      dispatch(verify(uid, token))
      setVerified(true)
    }
  }

  useEffect(() => {
    verifyAccount()
  }, [])

  if (verified) {
    navigate('/login')
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-8 md:mb-0 md:mr-8 flex flex-col items-center">
        <img src={TecNMLogo} alt="TecNM Logo" className="w-64 mb-4" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Activación</h1>
        <p className="mb-4">Por favor, espere mientras se verifica su cuenta</p>
      </div>
    </div>
  )
}

export default ActivateAccount
