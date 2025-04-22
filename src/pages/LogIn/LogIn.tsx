import { Button } from "@mui/material";

import { UserLogin } from "../../api/signIn.api";

import { loginDataProps } from "./Login.types";

import { FC } from "react";

import { useNavigate } from "react-router-dom";
import { Roles } from "../../contexts/AuthContext/AuthContext.types";
import { useAuthContext } from "../../contexts/AuthContext/AuthContext";

const LogIn: FC = () => {
  const navigate = useNavigate()
  const {setRole} = useAuthContext()
  const loginData: loginDataProps = {
    username: "emilys",
    password: "emilyspass",
    expiresInMins: 30,
  };
  const handleLogin = () => {
    UserLogin(loginData).then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem('role',Roles.ADMIN)
      setRole(Roles.ADMIN); 
      navigate('/')
    });
  };

  return (
    <>
      <h1>LogIn Page</h1>
      <Button variant="outlined" onClick={() => handleLogin()}>
        Log In
      </Button>
    </>
  );
};

export default LogIn;
