import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { fetchInventory } from '@/redux/actions/inventory/inventoryActions'
import { SkeletonCard } from '@/components'
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from '@/modules/base/index'
import UpdateDeleteInventoryForm from '../components/UpdateDeleteInventoryForm'

const InventoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { inventory, loading, error, status } = useSelector(
    (state: RootState) => state.inventory,
  )

  useEffect(() => {
    dispatch(fetchInventory(id as string))
  }, [dispatch, id])

  if (loading)
    return <SkeletonCard headerRows={1} detailRows={2} actionRows={2} />

  if (error) {
    if (status === 401) return <Unauthorized />
    if (status === 403) return <Forbidden />
    if (status === 404) return <NotFound />
    if (status === 500) return <ServerError />
  }

  if (!inventory) return null

  return (
    <div className="p-8">
      <UpdateDeleteInventoryForm inventory={inventory} />
    </div>
  )
}

export default InventoryDetail
