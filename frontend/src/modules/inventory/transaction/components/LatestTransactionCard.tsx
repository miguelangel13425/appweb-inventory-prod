import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/index'
import { InventoryTransaction } from '@/redux/models/inventory'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MapPin } from '@geist-ui/icons'

interface LatestTransactionCardProps {
  transactions: InventoryTransaction[]
}

const LatestTransactionCard: React.FC<LatestTransactionCardProps> = ({
  transactions,
}) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Compra':
      case 'Devolución':
        return 'bg-green-400'
      case 'Venta':
      case 'Perdido':
      case 'Daño':
      case 'Préstamo':
        return 'bg-red-400'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="shadow-lg rounded-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {transaction.inventory.product.name}
              </h3>
              <span className="text-lg font-semibold text-blue-500">
                {transaction.quantity}{' '}
                {transaction.inventory.product.unit_display}(s)
              </span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarFallback className="bg-yellow-200">
                  {transaction.person?.first_name[0]}
                  {transaction.person?.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-gray-800 font-semibold">
                  {transaction.person?.first_name}{' '}
                  {transaction.person?.last_name}
                </p>
                <p className="text-gray-600 text-sm">
                  {transaction.created_at}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm space-x-1">
                <MapPin size={20} className="text-blue-500" />
                <span>
                  {transaction.inventory.location.name},{' '}
                  {transaction.inventory.location.warehouse.name}
                </span>
              </div>
              <Badge
                className={`px-2 py-1 text-white ${getBadgeColor(transaction.type_display)}`}
              >
                {transaction.type_display}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default LatestTransactionCard
