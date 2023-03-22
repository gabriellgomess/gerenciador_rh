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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
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


import BadgeIcon from "@mui/icons-material/Badge";

import { Routes, Route, Link } from "react-router-dom";

// pages
import Colaboradores from "./pages/Colaboradores";
import Login from "./pages/Login";
import Aniversariantes from "./pages/Aniversariantes";
import ListaColaboradores from "./pages/ListaColaboradores";
import AddDoc from "./pages/AddDoc";
import CadastrarUsuario from "./pages/CadastrarUsuario";

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
  const [auth, setAuth] = useState(false);
  const [nomeLogin, setNomeLogin] = useState('');
  const [matriculaLogin, setMatriculaLogin] = useState('');
  const [expiry, setExpiry] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    if(auth && expiry > Date.now()){
    axios
      .get("https://gabriellgomess.com/gerenciador_rh/busca.php")
      .then((response) => {
        console.log(response.data);
        setColaboradores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      setAuth(false);
    }   
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    setAuth(false);
    window.location.href = '/gerenciador_rh';
  }

  return (
    <ContextAPI.Provider value={{ colaboradores, setColaboradores, nomeLogin, setNomeLogin, auth, setAuth, matriculaLogin, setMatriculaLogin, expiry, setExpiry }}>
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
              {(auth && expiry > Date.now()) && (
              <Box sx={{display: 'flex', alignItems: 'center', margin: '0 40px'}}>
                <Typography>Olá, {nomeLogin}</Typography>
                <Tooltip title="Alterar Senha">
                  <IconButton onClick={handleClick} aria-label="fingerprint">
                    <Fingerprint />
                  </IconButton>
                </Tooltip>
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
          {(auth && expiry > Date.now()) ? (
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
            <Link to="/gerenciador_rh" style={{ textDecoration: "none" }}>
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
            {(auth && expiry > Date.now()) && (
            <Link to="/gerenciador_rh/add_colaborador" style={{ textDecoration: "none" }}>
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
            )}
            {(auth && expiry > Date.now()) && (
            <Link to="/gerenciador_rh/add_doc" style={{ textDecoration: "none" }}>
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
            )}
            {(auth && expiry > Date.now()) && (
            <Link to="/gerenciador_rh/colaboradores" style={{ textDecoration: "none" }}>
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
            )}
            <Link to="/gerenciador_rh/aniversariantes" style={{ textDecoration: "none" }}>
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
            <Divider />
            {(auth && expiry > Date.now()) && (
            <Link to="/gerenciador_rh/cardastrar_usuario" style={{ textDecoration: "none" }}>
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
          </List>
          
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100%' }}>
          <DrawerHeader />
          {/* CONTEÚDO DA PÁGINA AQUI */}
          <Routes>
            <Route path="/gerenciador_rh" element={<Login />} />
            <Route path="/gerenciador_rh/aniversariantes" element={<Aniversariantes />} />
            {(auth && expiry > Date.now()) ? <Route path="/gerenciador_rh/add_colaborador" element={<Colaboradores />} /> : <Route to="/gerenciador_rh" /> }
            {(auth && expiry > Date.now()) ? <Route path="/gerenciador_rh/add_doc" element={<AddDoc />} /> : <Route to="/gerenciador_rh" /> }
            {(auth && expiry > Date.now()) ? <Route path="/gerenciador_rh/colaboradores" element={<ListaColaboradores />} /> : <Route to="/gerenciador_rh" /> }
            {(auth && expiry > Date.now()) ? <Route path="/gerenciador_rh/cardastrar_usuario" element={<CadastrarUsuario />} /> : <Route to="/gerenciador_rh" /> }
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
        <Box sx={{margin: '10px', display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h6' sx={{margin: '5px 0'}}>Alterar Senha</Typography>
            <TextField sx={{margin: '5px 0'}} size='small' label='Senha Atual'  />
            <TextField sx={{margin: '5px 0'}} size='small' label='Nova Senha'  />
            <TextField sx={{margin: '5px 0'}} size='small' label='Confirmar Senha'  />
            <Button sx={{margin: '5px 0'}} variant='contained' color='primary' size='small'>Alterar</Button>        
        </Box>
       
      </Menu>
    </ContextAPI.Provider>
  );
}
