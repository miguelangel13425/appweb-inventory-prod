import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/redux/store";
import {
  checkAuthenticated,
  getUser,
} from "@/redux/actions/accounts/authActions";
import { Spinner } from "@/components/others/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuthenticated());
    }
    if (isAuthenticated && !user) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, user]);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
