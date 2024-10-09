import React from "react";
import {
  Users,
  Home,
  Archive,
  MapPin,
  Truck,
  Box,
  Bookmark,
} from "@geist-ui/icons";
import { useNavigate } from "react-router-dom";
import TecNMLogo from "@/assets/TecNM2021.png";

const Sidebar: React.FC<{
  sidebarOpen: boolean;
}> = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  const handleWarehouse = () => {
    navigate("/campus");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLocation = () => {
    navigate("/ubicaciones");
  };

  const handleProduct = () => {
    navigate("/productos");
  };

  const handleCategory = () => {
    navigate("/partidas");
  };

  const handleInventory = () => {
    navigate("/inventarios");
  };

  const handleTransaction = () => {
    navigate("/transacciones");
  };

  const handleUser = () => {
    navigate("/personal");
  };

  return (
    <div
      className={`flex flex-col justify-between transform ${
        sidebarOpen ? "translate-x-0 w-64" : "translate-x-0 w-16"
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
      <nav className={`mt-4 flex-grow ${sidebarOpen ? "px-4" : "px-2"}`}>
        <ul className="space-y-2">
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleWarehouse}
          >
            <Home className="h-6 w-6 mr-2" />{" "}
            {sidebarOpen && <span>Campus</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleLocation}
          >
            <MapPin className="h-6 w-6 mr-2" />{" "}
            {sidebarOpen && <span>Ubicaciones</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleProduct}
          >
            <Box className="h-6 w-6 mr-2" />{" "}
            {sidebarOpen && <span>Productos</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleCategory}
          >
            <Bookmark className="h-6 w-6 mr-2" />{" "}
            {sidebarOpen && <span>Partidas</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleInventory}
          >
            <Archive className="h-6 w-6 mr-2" />{" "}
            {sidebarOpen && <span>Inventario</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleTransaction}
          >
            <Truck className="h-6 w-6 mr-2" />{" "}
            {sidebarOpen && <span>Transacciones</span>}
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer"
            onClick={handleUser}
          >
            <Users className="h-6 w-6 mr-2" />{" "}
            {sidebarOpen && <span>Usuarios</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
