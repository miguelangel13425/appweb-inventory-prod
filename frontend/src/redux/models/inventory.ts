import { Base } from './base'
import { Person } from './accounts'

export interface Warehouse extends Base {
  name: string
  description?: string
}

export interface Location extends Base {
  name: string
  description?: string
  warehouse: Warehouse
}

export interface Category extends Base {
  code: number
  name: string
  description?: string
}

export interface Product extends Base {
  name: string
  description?: string
  unit_display: string
  category: Category
  is_single_use: boolean
}

export interface Inventory extends Base {
  product: Product
  location: Location
  quantity?: number
  availability_display?: string
}

export interface InventoryTransaction extends Base {
  inventory: Inventory
  person?: Person
  quantity: number
  movement_display: string
  type_display: string
  description?: string
}
