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
import { MapPin } from '@geist-ui/icons'

interface TopInventoryCardProps {
  inventories: Inventory[]
}

const TopInventoryCard: React.FC<TopInventoryCardProps> = ({ inventories }) => {
  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent>
        {inventories.map((inventory, index) => (
          <CarouselItem
            key={inventory.id}
            className="basis-1/3 flex justify-center"
          >
            <Card className="shadow-lg rounded-lg bg-white w-full h-full flex flex-col justify-between">
              <CardHeader className="flex flex-col items-center text-center space-y-1">
                {/* Título y descripción centrados */}
                <CardTitle className="text-xl font-bold text-gray-800">
                  {inventory.product.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {inventory.product.category.code} -{' '}
                  {inventory.product.category.name}
                </CardDescription>
                <CardDescription className="text-2xl font-semibold text-orange-600">
                  {inventory.quantity} {inventory.product.unit_display}(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                {/* Ubicación a la izquierda */}
                <div className="flex items-center text-gray-500 text-sm space-x-2">
                  <MapPin size={20} className="text-blue-500" />
                  <span>
                    {inventory.location.name},{' '}
                    {inventory.location.warehouse.name}
                  </span>
                </div>
                {/* Índice en un círculo azul a la derecha */}
                <div className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white rounded-full font-bold">
                  {index + 1}
                </div>
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

export default TopInventoryCard
