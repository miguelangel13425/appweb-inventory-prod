import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/index'
import {
  NotFound,
  Unauthorized,
  Forbidden,
  ServerError,
} from '@/modules/base/index'
import { fetchDashboard } from '@/redux/actions/inventory/dashboardActions'
import TopInventoryCard from '@/modules/inventory/inventory/components/TopInventoryCard'
import LatestTransactionCard from '@/modules/inventory/transaction/components/LatestTransactionCard'

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { dashboard, loading, error, status } = useSelector(
    (state: RootState) => state.dashboard,
  )
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])

  if (error) {
    if (status === 401) return <Unauthorized />
    if (status === 403) return <Forbidden />
    if (status === 404) return <NotFound />
    if (status === 500) return <ServerError />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="p-6 bg-gray-100">
        {loading ? (
          <Spinner />
        ) : dashboard ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Estadísticas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <InfoCard
                title="Campus"
                value={dashboard.total_warehouses}
                onClick={() => navigate('/campus')}
              />
              <InfoCard
                title="Ubicaciones"
                value={dashboard.total_locations}
                onClick={() => navigate('/ubicaciones')}
              />
              <InfoCard
                title="Productos"
                value={dashboard.total_products}
                onClick={() => navigate('/productos')}
              />
              <InfoCard
                title="Inventarios"
                value={dashboard.total_inventories}
                onClick={() => navigate('/inventarios')}
              />
            </div>

            <Section title="Últimas transacciones">
              {dashboard.latest_transactions.length > 0 ? (
                <LatestTransactionCard
                  transactions={dashboard.latest_transactions}
                />
              ) : (
                <p className="text-gray-500">No transactions found.</p>
              )}
            </Section>

            <Section
              title="Productos populares"
              className="flex justify-center"
            >
              {dashboard.top_inventories.length > 0 ? (
                <TopInventoryCard inventories={dashboard.top_inventories} />
              ) : (
                <p className="text-gray-500 text-center">
                  No inventories found.
                </p>
              )}
            </Section>
          </>
        ) : (
          <p className="text-gray-500">No hay datos.</p>
        )}
      </Card>
    </div>
  )
}

const InfoCard: React.FC<{
  title: string
  value: number
  onClick: () => void
}> = ({ title, value, onClick }) => (
  <div
    className="bg-gray-50 rounded-lg shadow p-6 text-center cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-3xl font-bold text-indigo-600">{value}</p>
  </div>
)

const Section: React.FC<{
  title: string
  className?: string
  children: React.ReactNode
}> = ({ title, className, children }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
    <div className={className}>{children}</div>
  </div>
)

export default Dashboard
