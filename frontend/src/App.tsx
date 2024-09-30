import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "@/hocs/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "@/modules/accounts/user/pages/Signin";
import Dashboard from "@/modules/accounts/user/pages/Dashboard";
import WarehouseList from "@/modules/inventory/warehouse/pages/WarehouseList";
import WarehouseDetail from "@/modules/inventory/warehouse/pages/WarehouseDetail";
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
              path="/warehouses"
              element={
                <ProtectedRoute>
                  <WarehouseList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/warehouses/:id"
              element={
                <ProtectedRoute>
                  <WarehouseDetail />
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
