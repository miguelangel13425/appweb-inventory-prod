import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "@/hocs/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "@/modules/accounts/user/pages/Signin";
import Dashboard from "@/modules/accounts/user/pages/Dashboard";
import WarehouseList from "@/modules/inventory/warehouse/pages/WarehouseList";
import ProductList from "@/modules/inventory/product/pages/ProductList";
import ProductDetail from "@/modules/inventory/product/pages/ProductDetail";
import LocationList from "@/modules/inventory/location/pages/LocationList";
import LocationDetail from "@/modules/inventory/location/pages/LocationDetail";
import CategoryList from "@/modules/inventory/category/pages/CategoryList";
import CategoryDetail from "@/modules/inventory/category/pages/CategoryDetail";
import WarehouseDetail from "@/modules/inventory/warehouse/pages/WarehouseDetail";
import InventoryList from "@/modules/inventory/inventory/pages/InventoryList";
import TransactionList from "@/modules/inventory/transaction/pages/TransactionList";
import NotFound from "@/modules/base/pages/NotFound";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campus"
              element={
                <ProtectedRoute>
                  <WarehouseList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campus/:id"
              element={
                <ProtectedRoute>
                  <WarehouseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/productos/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ubicaciones"
              element={
                <ProtectedRoute>
                  <LocationList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ubicaciones/:id"
              element={
                <ProtectedRoute>
                  <LocationDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partidas"
              element={
                <ProtectedRoute>
                  <CategoryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partidas/:id"
              element={
                <ProtectedRoute>
                  <CategoryDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventarios"
              element={
                <ProtectedRoute>
                  <InventoryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transacciones"
              element={
                <ProtectedRoute>
                  <TransactionList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
