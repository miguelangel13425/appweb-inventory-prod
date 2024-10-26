import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Layout from '@/hocs/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from '@/modules/accounts/auth/pages/Signin'
import Dashboard from '@/modules/accounts/auth/pages/Dashboard'
import UserList from '@/modules/accounts/user/pages/UserList'
import StudentList from '@/modules/accounts/student/pages/StudentList'
import ProviderList from '@/modules/accounts/provider/pages/ProviderList'
import WarehouseList from '@/modules/inventory/warehouse/pages/WarehouseList'
import ProductList from '@/modules/inventory/product/pages/ProductList'
import ProductDetail from '@/modules/inventory/product/pages/ProductDetail'
import LocationList from '@/modules/inventory/location/pages/LocationList'
import LocationDetail from '@/modules/inventory/location/pages/LocationDetail'
import CategoryList from '@/modules/inventory/category/pages/CategoryList'
import CategoryDetail from '@/modules/inventory/category/pages/CategoryDetail'
import WarehouseDetail from '@/modules/inventory/warehouse/pages/WarehouseDetail'
import InventoryList from '@/modules/inventory/inventory/pages/InventoryList'
import TransactionList from '@/modules/inventory/transaction/pages/TransactionList'
import NotFound from '@/modules/base/pages/NotFound'
import store from './redux/store'
import './App.css'

const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/personal', element: <UserList /> },
  { path: '/estudiantes', element: <StudentList /> },
  { path: '/proveedores', element: <ProviderList /> },
  { path: '/campus', element: <WarehouseList /> },
  { path: '/campus/:id', element: <WarehouseDetail /> },
  { path: '/productos', element: <ProductList /> },
  { path: '/productos/:id', element: <ProductDetail /> },
  { path: '/ubicaciones', element: <LocationList /> },
  { path: '/ubicaciones/:id', element: <LocationDetail /> },
  { path: '/partidas', element: <CategoryList /> },
  { path: '/partidas/:id', element: <CategoryDetail /> },
  { path: '/inventarios', element: <InventoryList /> },
  { path: '/transacciones', element: <TransactionList /> },
]

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="login" element={<Login />} />
            {routes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{element}</ProtectedRoute>}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
