import React from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CreateJWTForm from "../components/CreateJWTForm";

const Signin: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (isAuthenticated && user) {
    return <div>Already logged in</div>;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <CreateJWTForm />
    </div>
  );
};

export default Signin;
