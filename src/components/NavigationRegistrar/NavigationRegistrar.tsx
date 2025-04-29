// src/components/NavigationRegistrar.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "@/utils/navigationHelper";

const NavigationRegistrar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null; 
};

export default NavigationRegistrar;

// It returns null because it renders nothing in the UI.
// useEffect ensures that setNavigator() runs only after the component has mounted, i.e., React Router is ready and navigate is available.
// if setNavigator(navigate) directly in the component body (i.e., outside useEffect), it would run on every render, not just once.

