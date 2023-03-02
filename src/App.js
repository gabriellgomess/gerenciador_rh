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
import CakeIcon from "@mui/icons-material/Cake";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import BadgeIcon from "@mui/icons-material/Badge";

import { Routes, Route, Link } from "react-router-dom";

// pages
import Colaboradores from "./pages/Colaboradores";
import Login from "./pages/Login";
import Aniversariantes from "./pages/Aniversariantes";
import FormColaborador from "./pages/FormColaborador";
import ListaColaboradores from "./pages/ListaColaboradores";

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

  useEffect(() => {
    axios
      .get("https://gabriellgomess.com/gerenciador_rh/busca.php")
      .then((response) => {
        console.log(response.data);
        setColaboradores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ContextAPI.Provider value={{ colaboradores, setColaboradores }}>
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
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="h6"
              noWrap
              component="div"
            >
              Recursos Humanos e Departamento Pessoal{" "}
              <BadgeIcon sx={{ marginLeft: "10px" }} />
            </Typography>
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
          </List>
          <Divider />  
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100%' }}>
          <DrawerHeader />
          {/* CONTEÚDO DA PÁGINA AQUI */}
          <Routes>
            <Route path="/gerenciador_rh" element={<Login />} />
            <Route path="/gerenciador_rh/add_colaborador" element={<Colaboradores />} />
            <Route path="/gerenciador_rh/colaboradores" element={<ListaColaboradores /> } />            
            <Route path="/gerenciador_rh/aniversariantes" element={<Aniversariantes />} />           
          </Routes>
          {/* <Footer /> */}
        </Box>
      </Box>
    </ContextAPI.Provider>
  );
}
