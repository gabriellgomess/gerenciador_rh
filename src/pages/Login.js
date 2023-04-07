import React, { useState, useContext, useEffect } from "react";
import ContextAPI from "../ContextAPI/ContextAPI";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { useNavigate, Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.casadomenino.org.br/">
        Casa do Menino Jesus de Praga
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const { user, setUser } = useContext(ContextAPI);
  const [loggedOut, setLoggedOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (user) {
      navigate(`${process.env.REACT_APP_PATH}/colaboradores`);
    }
  }, [user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const checkToken = () => {
    const token = sessionStorage.getItem("token");
    const expiry_time = sessionStorage.getItem("expiry_time");
    if (token && expiry_time) {
      const currentTime = new Date().getTime();
      const expiryTimeMilliseconds = Number(expiry_time) * 1000;
      if (currentTime < expiryTimeMilliseconds) {
        setUser(true);
        navigate(`${process.env.REACT_APP_PATH}/colaboradores`, {
          replace: true,
        });
      } else {
        setUser(false);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("nome");
        sessionStorage.removeItem("matricula");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("expiry_time");
        sessionStorage.removeItem("nivelAcesso");
        setLoggedOut(true);
      }
    } else {
      setUser(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const passwordMd5 = CryptoJS.MD5(formData.password).toString();
    axios
      .post(`${process.env.REACT_APP_URL}/api/login/login.php`, {
        ...formData,
        password: passwordMd5,
      })
      .then((response) => {
        const token = response.data; // obtém o token de autenticação da resposta do servidor
        sessionStorage.setItem("token", token); // armazena o token localmente
        var decoded = jwt_decode(token); // decodifica o token
        sessionStorage.setItem("nome", decoded.user_name); // armazena o nome do usuário localmente
        sessionStorage.setItem("matricula", decoded.user_matricula); // armazena a matrícula do usuário localmente
        sessionStorage.setItem("email", decoded.user_email); // armazena o email do usuário localmente
        sessionStorage.setItem("expiry_time", decoded.expiry_time); // armazena o expiry_time do usuário localmente
        sessionStorage.setItem("nivelAcesso", decoded.user_nivelAcesso); // armazena o nivel de acesso do usuário localmente
        if (token) {
          setUser(true);
          navigate(`${process.env.REACT_APP_PATH}/colaboradores`);
        } else {
          console.log("erro");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      {loggedOut && (
        <Navigate to={`${process.env.REACT_APP_PATH}`} replace={true} />
      )}
      <Grid container component="main" sx={{ height: "80vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://onnerevista.com.br/images/news/1696_IMG_3526.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                onChange={(e) => handleInputChange(e)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Acessar
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}
