import React from 'react'
import {
  User,
  Users,
  Home,
  Archive,
  MapPin,
  Truck,
  Box,
  Bookmark,
} from '@geist-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import TecNMLogo from '@/assets/TecNM2021.png'

const Sidebar: React.FC<{
  sidebarOpen: boolean
}> = ({ sidebarOpen }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const isAdmin = user?.role === 'ADMIN'

  const handleWarehouse = () => {
    navigate('/campus')
  }

  const handleHome = () => {
    navigate('/')
  }

  const handleLocation = () => {
    navigate('/ubicaciones')
  }

  const handleProduct = () => {
    navigate('/productos')
  }

  const handleCategory = () => {
    navigate('/partidas')
  }

  const handleInventory = () => {
    navigate('/inventarios')
  }

  const handleTransaction = () => {
    navigate('/transacciones')
  }

  const handleUser = () => {
    navigate('/usuarios')
  }

  const handlePerson = () => {
    navigate('/personas')
  }

  return (
    <div
      className={`flex flex-col justify-between transform ${
        sidebarOpen ? 'translate-x-0 w-64' : 'translate-x-0 w-16'
      } transition-all duration-300 ease-in-out bg-impactBlue text-white shadow-lg`}
    >
      {/* Logo */}
      {sidebarOpen ? (
        <div
          className="p-4 flex justify-center items-center cursor-pointer"
          onClick={handleHome}
        >
          <img src={TecNMLogo} alt="TecNM Logo" className="h-16 w-auto" />
        </div>
      ) : null}

      {/* Navigation */}
      <nav className={`mt-4 flex-grow ${sidebarOpen ? 'px-4' : 'px-2'}`}>
        <ul className="space-y-2">
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleWarehouse}
          >
            <Home className="h-6 w-6 mr-2" />{' '}
            {sidebarOpen && <span>Campus</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleLocation}
          >
            <MapPin className="h-6 w-6 mr-2" />{' '}
            {sidebarOpen && <span>Ubicaciones</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleProduct}
          >
            <Box className="h-6 w-6 mr-2" />{' '}
            {sidebarOpen && <span>Productos</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleCategory}
          >
            <Bookmark className="h-6 w-6 mr-2" />{' '}
            {sidebarOpen && <span>Partidas</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleInventory}
          >
            <Archive className="h-6 w-6 mr-2" />{' '}
            {sidebarOpen && <span>Inventario</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleTransaction}
          >
            <Truck className="h-6 w-6 mr-2" />{' '}
            {sidebarOpen && <span>Transacciones</span>}
          </li>
          {isAdmin && (
            <li
              className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
              onClick={handleUser}
            >
              <Users className="h-6 w-6 mr-2" />{' '}
              {sidebarOpen && <span>Usuarios</span>}
            </li>
          )}
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handlePerson}
          >
            <User className="h-6 w-6 mr-2" />{' '}
            {sidebarOpen && <span>Personas</span>}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
