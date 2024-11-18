import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Layout from '@/hocs/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from '@/modules/accounts/auth/pages/Signin'
import ResetPassword from '@/modules/accounts/auth/pages/ResetPassword'
import ResetPasswordConfirm from '@/modules/accounts/auth/pages/ResetPasswordConfirm'
import ActivateAccount from '@/modules/accounts/auth/pages/ActivateAccount'
import Dashboard from '@/modules/accounts/auth/pages/Dashboard'
import UserList from '@/modules/accounts/user/pages/UserList'
import UserDetail from './modules/accounts/user/pages/UserDetail'
import PersonList from '@/modules/accounts/person/pages/PersonList'
import StudentList from '@/modules/accounts/student/pages/StudentList'
import StudentDetail from '@/modules/accounts/student/pages/StudentDetail'
import ProviderList from '@/modules/accounts/provider/pages/ProviderList'
import ProviderDetail from '@/modules/accounts/provider/pages/ProviderDetail'
import WarehouseList from '@/modules/inventory/warehouse/pages/WarehouseList'
import ProductList from '@/modules/inventory/product/pages/ProductList'
import ProductDetail from '@/modules/inventory/product/pages/ProductDetail'
import LocationList from '@/modules/inventory/location/pages/LocationList'
import LocationDetail from '@/modules/inventory/location/pages/LocationDetail'
import CategoryList from '@/modules/inventory/category/pages/CategoryList'
import CategoryDetail from '@/modules/inventory/category/pages/CategoryDetail'
import WarehouseDetail from '@/modules/inventory/warehouse/pages/WarehouseDetail'
import InventoryList from '@/modules/inventory/inventory/pages/InventoryList'
import InventoryDetail from '@/modules/inventory/inventory/pages/InventoryDetail'
import TransactionList from '@/modules/inventory/transaction/pages/TransactionList'
import TransactionDetail from '@/modules/inventory/transaction/pages/TransactionDetail'
import NotFound from '@/modules/base/pages/NotFound'
import store from './redux/store'
import './App.css'

const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/usuarios', element: <UserList /> },
  { path: '/usuarios/:id', element: <UserDetail /> },
  { path: '/personas', element: <PersonList /> },
  { path: '/estudiantes', element: <StudentList /> },
  { path: '/estudiantes/:id', element: <StudentDetail /> },
  { path: '/proveedores', element: <ProviderList /> },
  { path: '/proveedores/:id', element: <ProviderDetail /> },
  { path: '/campus', element: <WarehouseList /> },
  { path: '/campus/:id', element: <WarehouseDetail /> },
  { path: '/productos', element: <ProductList /> },
  { path: '/productos/:id', element: <ProductDetail /> },
  { path: '/ubicaciones', element: <LocationList /> },
  { path: '/ubicaciones/:id', element: <LocationDetail /> },
  { path: '/partidas', element: <CategoryList /> },
  { path: '/partidas/:id', element: <CategoryDetail /> },
  { path: '/inventarios', element: <InventoryList /> },
  { path: '/inventarios/:id', element: <InventoryDetail /> },
  { path: '/transacciones', element: <TransactionList /> },
  { path: '/transacciones/:id', element: <TransactionDetail /> },
]

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
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
