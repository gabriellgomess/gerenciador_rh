import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CadastroColaborador from "../components/CadastroColaborador";

const Colaborador = () => {

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
          <CadastroColaborador />
        </Box>
 
    )
}

export default Colaborador;