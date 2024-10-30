import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { fetchProvider } from '@/redux/actions/accounts/providerActions'
import { SkeletonCard } from '@/components'
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from '@/modules/base/index'
import UpdateDeleteProviderForm from '../components/UpdateDeleteProviderForm'

const ProviderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { provider, loading, error, status } = useSelector(
    (state: RootState) => state.provider,
  )

  useEffect(() => {
    dispatch(fetchProvider(id as string))
  }, [dispatch, id])

  if (loading)
    return <SkeletonCard headerRows={1} detailRows={2} actionRows={2} />

  if (error) {
    if (status === 401) return <Unauthorized />
    if (status === 403) return <Forbidden />
    if (status === 404) return <NotFound />
    if (status === 500) return <ServerError />
  }

  if (!provider) return null

  return (
    <div className="p-8">
      <UpdateDeleteProviderForm provider={provider} />
    </div>
  )
}

export default ProviderDetail
