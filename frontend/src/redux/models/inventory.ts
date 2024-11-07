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
  unit: string
  unit_display?: string
  category: Category
  is_single_use: boolean
}

export interface Inventory extends Base {
  product: Product
  location: Location
  quantity: number
  availability_display: string
}

export interface InventoryTransaction extends Base {
  inventory: Inventory
  person?: Person
  quantity: number
  movement_display: string
  type_display: string
  description?: string
}

export interface Dashboard {
  total_products: number
  total_locations: number
  total_warehouses: number
  total_inventories: number
  latest_transactions: InventoryTransaction[]
  top_inventories: Inventory[]
}

export const DegreeChoices = [
  { value: 'Architecture', label: 'Arquitectura' },
  { value: 'B.A. in Administration', label: 'Licenciatura en Administración' },
  { value: 'Public Accountant', label: 'Contador Público' },
  { value: 'Environmental Engineering', label: 'Ingeniería Ambiental' },
  { value: 'Biomedical Engineering', label: 'Ingeniería Biomedica' },
  { value: 'Civil Engineering', label: 'Ingeniería Civil' },
  { value: 'Industrial Design Eng.', label: 'Ingeniería de Diseño Industrial' },
  { value: 'Electronics Engineering', label: 'Ingeniería Electromecânica' },
  { value: 'Business Management Engineering', label: 'Ingeniería de Negocios' },
  { value: 'Logistics Engineering', label: 'Ingeniería Logística' },
  { value: 'Nanotechnology Engineering', label: 'Ingeniería Nanotécnica' },
  { value: 'Chemical Engineering', label: 'Ingeniería Química' },
  { value: 'Aeronautical Engineering', label: 'Ingeniería Aeronaúutica' },
  { value: 'Biochemical Engineering', label: 'Ingeniería Bioquímica' },
  { value: 'Electromechanical Engineering', label: 'Ingeniería Electromecánica' },
  { value: 'Computer Engineering', label: 'Ingeniería de Computación' },
  { value: 'Computer Systems Engineering', label: 'Ingeniería de Sistemas de Computación' },
  { value: 'Information Technology and Communications Engineering', label: 'Ingeniería de Telecomunicaciones y de la Información' },
  { value: 'Cybersecurity Engineering', label: 'Ingeniería de Seguridad Informática' },
  { value: 'Artificial Intelligence Engineering', label: 'Ingeniería de la Inteligencia Artificial' },
  { value: 'Industrial Engineering', label: 'Ingeniería Industrial' },
  { value: 'Mechanical Engineering', label: 'Ingeniería Mecánica' },
]

