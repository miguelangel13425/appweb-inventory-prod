import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { fetchTransaction } from '@/redux/actions/inventory/inventoryTransactionActions'
import { SkeletonCard } from '@/components'
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from '@/modules/base/index'
import UpdateDeleteTransactionForm from '../components/UpdateDeleteTransactionForm'

const InventoryTransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { transaction, loading, error, status } = useSelector(
    (state: RootState) => state.inventoryTransaction,
  )

  useEffect(() => {
    dispatch(fetchTransaction(id as string))
  }, [dispatch, id])

  if (loading)
    return <SkeletonCard headerRows={1} detailRows={2} actionRows={2} />

  if (error) {
    if (status === 401) return <Unauthorized />
    if (status === 403) return <Forbidden />
    if (status === 404) return <NotFound />
    if (status === 500) return <ServerError />
  }

  if (!transaction) return null

  return (
    <div className="p-8">
      <UpdateDeleteTransactionForm transaction={transaction} />
    </div>
  )
}

export default InventoryTransactionDetail
