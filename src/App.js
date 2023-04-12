import React, { useState, useEffect } from "react";
import ContextAPI from "./ContextAPI/ContextAPI";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CakeIcon from "@mui/icons-material/Cake";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Logotipo from "./assets/img/Logotipo.png";
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BadgeIcon from "@mui/icons-material/Badge";
import Switch from "@mui/material/Switch";

import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

// pages
import Colaboradores from "./pages/Colaboradores";
import Login from "./pages/Login";
import Aniversariantes from "./pages/Aniversariantes";
import FormColaborador from "./pages/FormColaborador";
import ListaColaboradores from "./pages/ListaColaboradores";
import AddDoc from "./pages/AddDoc";
import CadastrarUsuario from "./pages/CadastrarUsuario";


import PrivateRoute from "./components/PrivateRoute";

import env from "react-dotenv";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function App() {
  const [colaboradores, setColaboradores] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [ user, setUser ] = useState(false)
  const [erro, setErro] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [reloadData, setReloadData] = useState(false);


  



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/handleClass.php?p=1`)
      .then((response) => {
        console.log(response.data);
        setColaboradores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setUser(sessionStorage.getItem('token') !== null ? true : false)
  }, [reloadData]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nome');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('expiry_time');
    sessionStorage.removeItem('matricula');
    sessionStorage.removeItem('nivelAcesso');
    setUser(false);
    navigate(`${process.env.REACT_APP_PATH}`)
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // axios.post(`${process.env.REACT_APP_URL}/api/handleClass.php?p=2`, data)
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    console.table(data)
  }

  function validarSenhas() {
    if (senha.trim() !== confirmarSenha.trim()) {
      setErro('As senhas não coincidem');
      toast.error('As senhas não coincidem', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return false;
    }
    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres');
      toast.error('A senha deve ter pelo menos 8 caracteres', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return false;
    }
    if (!/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
      setErro('A senha deve conter letras e números');
      toast.error('A senha deve conter letras e números', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return false;
    }
    setErro('');
    return true;
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    };
  


  return (
    <ContextAPI.Provider value={{ colaboradores, setColaboradores, user, setUser, reloadData, setReloadData }}>
      <Box sx={{ display: "flex", height: '100%' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{display: 'flex', justifyContent: 'end', width: '100%', height: '100%', alignItems: 'center'}}>
              {user && (
              <Box sx={{display: 'flex', alignItems: 'center', margin: '0 40px'}}>
                <Typography>Olá, {(sessionStorage.getItem('nome')).split(" ")[0]}</Typography>
                {/* <Tooltip title="Alterar Senha">
                  <IconButton onClick={handleClick} aria-label="fingerprint">
                    <Fingerprint />
                  </IconButton>
                </Tooltip> */}
              </Box>)}	
              <img width='200px' src={Logotipo} alt="" />
            </Box>            
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
          {user ? (
            <>
                     
              <ListItem disablePadding sx={{ display: "block" }} onClick={()=>handleLogout()}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Sair"}
                    sx={{ opacity: open ? 1 : 0, color: "grey" }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
            <Link to={`${process.env.REACT_APP_PATH}`} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LoginRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Login"}
                    sx={{ opacity: open ? 1 : 0, color: "grey" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            </>
            
          )}
            {user && (
            <>
            <Link to={`${process.env.REACT_APP_PATH}/add_colaborador`} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Add Colaborador"}
                    sx={{ opacity: open ? 1 : 0, color: "grey" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>            
            <Link to={`${process.env.REACT_APP_PATH}/add_doc`} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Adicionar documentos"}
                    sx={{ opacity: open ? 1 : 0, color: "grey" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to={`${process.env.REACT_APP_PATH}/colaboradores`} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Colaboradores"}
                    sx={{ opacity: open ? 1 : 0, color: "grey" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            </>)}
            <Link to={`${process.env.REACT_APP_PATH}/aniversariantes`} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CakeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Aniversariantes"}
                    sx={{ opacity: open ? 1 : 0, color: "grey" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />          
            {(user && sessionStorage.getItem('nivelAcesso') === "gerencia" ) && (
            <Link to={`${process.env.REACT_APP_PATH}/cadastrar_usuario`} style={{ textDecoration: "none" }}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Cadastrar Usuário"}
                    sx={{ opacity: open ? 1 : 0, color: "grey" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            )} 
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100%' }}>
          <DrawerHeader />
          {/* CONTEÚDO DA PÁGINA AQUI */}
          <Routes>
            <Route path={`${process.env.REACT_APP_PATH}`} element={<Login />} />
            <Route path={`${process.env.REACT_APP_PATH}/add_colaborador`} element={<PrivateRoute><Colaboradores /></PrivateRoute>} />
            <Route path={`${process.env.REACT_APP_PATH}/add_doc`} element={<PrivateRoute><AddDoc /></PrivateRoute>} />
            <Route path={`${process.env.REACT_APP_PATH}/colaboradores`} element={<PrivateRoute><ListaColaboradores /></PrivateRoute> } />            
            <Route path={`${process.env.REACT_APP_PATH}/aniversariantes`} element={<Aniversariantes />} />
            <Route path={`${process.env.REACT_APP_PATH}/cadastrar_usuario`} element={<PrivateRoute><CadastrarUsuario /></PrivateRoute> } />         
          </Routes>
          {/* <Footer /> */}
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open2}
        onClose={handleClose}        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
           Profile
        </MenuItem> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{margin: '10px', display: 'flex', flexDirection: 'column'}}>
          <Typography variant='h6' sx={{margin: '5px 0'}}>Alterar Senha</Typography>
          
            <input type='hidden' {...register('matricula')} name='matricula' value={sessionStorage.getItem('matricula')} />
            <TextField {...register('senha_atual')} name='senha_atual' sx={{margin: '5px 0'}} size='small' label='Senha Atual' type={showPassword ? 'text' : 'password'}/>
            <TextField {...register('nova_senha')} name='nova_senha' sx={{margin: '5px 0'}} size='small' label='Nova Senha' type={showPassword ? 'text' : 'password'}
                onChange={(event) => setSenha(event.target.value)}   />
            <TextField {...register('confirma_nova_senha')} name='confirma_nova_senha' sx={{margin: '5px 0'}} size='small' label='Confirmar Senha' type={showPassword ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                onBlur={validarSenhas}  />
            <Button type='submit' sx={{margin: '5px 0'}} variant='contained' color='primary' size='small'>Alterar</Button>   
            <Box sx={{width: '40%'}}><Typography variant='caption'>Mostrar Senha</Typography> <Switch size="small" onChange={()=>handleShowPassword()} /></Box>
        </Box>
        </form>
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
       
      </Menu>
    </ContextAPI.Provider>
  );
}