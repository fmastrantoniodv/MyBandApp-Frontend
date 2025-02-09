import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export const PrivateViews = () => {
  const { sessionState } = useUser();

  return sessionState ? <Outlet /> : <Navigate to="/" replace />;
};