import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface OwnProps {
  children: React.ReactNode;
  message: string;
}

type Props = OwnProps;

function RequireAuth(props: Props) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          path: location.pathname,
          alert: {
            message: props.message,
            type: "error",
          },
        }}
      />
    );
  }
  return <>{props.children}</>;
}

export default RequireAuth;
