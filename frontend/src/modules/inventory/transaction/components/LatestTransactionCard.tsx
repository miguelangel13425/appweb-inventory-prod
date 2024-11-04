import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { InventoryTransaction } from '@/redux/models/inventory'

interface LatestTransactionCardProps {
  transactions: InventoryTransaction[]
}

const LatestTransactionCard: React.FC<LatestTransactionCardProps> = ({
  transactions,
}) => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="shadow-lg rounded-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">
              Transaction ID: {transaction.id}
            </h3>
            <InfoItem
              label="Person"
              value={`${transaction.person?.first_name} ${transaction.person?.last_name}`}
            />
            <InfoItem label="Email" value={transaction.person?.email} />
            <InfoItem
              label="Product"
              value={transaction.inventory.product.name}
            />
            <InfoItem
              label="Category"
              value={transaction.inventory.product.category.name}
            />
            <InfoItem
              label="Location"
              value={transaction.inventory.location.name}
            />
            <InfoItem
              label="Warehouse"
              value={transaction.inventory.location.warehouse.name}
            />
            <InfoItem
              label="Quantity"
              value={transaction.quantity.toString()}
            />
            <InfoItem label="Movement" value={transaction.movement_display} />
            <InfoItem label="Type" value={transaction.type_display} />
            <InfoItem label="Created At" value={transaction.created_at} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between text-gray-600 mb-2">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
)

export default LatestTransactionCard
