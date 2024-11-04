import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Inventory } from '@/redux/models/inventory'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface TopInventoryCardProps {
  inventories: Inventory[]
}

const TopInventoryCard: React.FC<TopInventoryCardProps> = ({ inventories }) => {
  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {inventories.map((inventory) => (
          <CarouselItem key={inventory.id} className="p-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>{inventory.product.name}</CardTitle>
                <CardDescription>
                  Category: {inventory.product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <InfoItem label="Location" value={inventory.location.name} />
                <InfoItem
                  label="Warehouse"
                  value={inventory.location.warehouse.name}
                />
                <InfoItem label="Quantity" value={inventory.quantity} />
                <InfoItem
                  label="Availability"
                  value={inventory.availability_display}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between text-gray-600">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
)

export default TopInventoryCard
