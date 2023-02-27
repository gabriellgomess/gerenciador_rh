import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded';
import MedicationLiquidRoundedIcon from '@mui/icons-material/MedicationLiquidRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';


import BadgeIcon from '@mui/icons-material/Badge';

import { Routes, Route, Link } from "react-router-dom";

// pages
import Colaboradores from './pages/Colaboradores';
import Medicamentos from './pages/Medicamentos';
import Alimentacoes from './pages/Alimentacoes';
import Orientacoes from './pages/Orientacoes';
import Contatos from './pages/Contatos';
import Login from './pages/Login';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{display: 'flex', alignItems: 'center'}} variant="h6" noWrap component="div">
            Recursos Humanos e Departamento Pessoal <BadgeIcon sx={{marginLeft: '10px'}} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <Link to="/login" style={{ textDecoration: 'none' }}>
        <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LoginRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={'Login'} sx={{ opacity: open ? 1 : 0, color: 'grey' }} />
              </ListItemButton>
            </ListItem>
            </Link>
            <Link to="/gerenciador_rh" style={{ textDecoration: 'none' }}>
        <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PeopleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={'Colaboradores'} sx={{ opacity: open ? 1 : 0, color: 'grey' }} />
              </ListItemButton>
            </ListItem>
            </Link>
        </List>
        <Divider />
        {/* <List>
          
          <Link to="/medicamentos" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <VaccinesRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Medicamentos'} sx={{ opacity: open ? 1 : 0, color: 'grey' }} />
            </ListItemButton>
          </ListItem>
          </Link>
         
          <Link to="/alimentacoes" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MedicationLiquidRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Alimentações'} sx={{ opacity: open ? 1 : 0, color: 'grey' }} />
            </ListItemButton>
          </ListItem>
          </Link>
          
          <Link to="/orientacoes" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MenuBookRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Orientações'} sx={{ opacity: open ? 1 : 0, color: 'grey' }} />
            </ListItemButton>
          </ListItem>
          </Link>
          
          <Link to="/contatos" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PermContactCalendarRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Contatos'} sx={{ opacity: open ? 1 : 0, color: 'grey' }} />
            </ListItemButton>
          </ListItem>
          </Link>
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* CONTEÚDO DA PÁGINA AQUI */}
        <Routes >
          <Route path="/gerenciador_rh" element={<Colaboradores />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/alimentacoes" element={<Alimentacoes />} />
          <Route path="/orientacoes" element={<Orientacoes />} />
          <Route path="/contatos" element={<Contatos />} /> */}
        </Routes>
      </Box>
    </Box>
  );
}