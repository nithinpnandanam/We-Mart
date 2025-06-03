import { Box, Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useState } from "react";
import { userLogin } from "@/api/signIn.api";
import { useNavigate } from "react-router";
import paths from "@/router/routes";
import { Roles } from "@/contexts/AuthContext/AuthContext.types";
import { useAuthContext } from "@/contexts/AuthContext/AuthContext";
import { loginDataProps } from "./Login.types";
import img1 from "../../assets/Images/2.jpg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRole,login } = useAuthContext();
  // const {setLoggedInUser} = useUserContext()
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginData: loginDataProps = {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
      };
      userLogin(loginData).then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("role", Roles.MANAGER);
        setRole(Roles.MANAGER);
        navigate(paths.ROOT_PATH);
        login()
      });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <>
      <Box className="login-parent-container">
        <Box className="login-image-container">
          <img src={img1} alt="" />
        </Box>
        <Box className="login-text-container">
          <Box className="login-container-inner">
            <Typography variant="h3">Login</Typography>
            <Box className="email-pass-container">
              <TextField
                className="login-email"
                label="UserName"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="login-password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" onClick={() => handleLogin()}>
                Log In
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
