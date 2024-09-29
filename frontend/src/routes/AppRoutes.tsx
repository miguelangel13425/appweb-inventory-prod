import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/hocs/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "@/modules/accounts/user/pages/Signin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
