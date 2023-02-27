import React, {useEffect, useState, useContext} from 'react';
import ContextAPI from '../ContextAPI/ContextAPI';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormDialog from './FormDialog';



const ListaColaboradores = () => {
    const {colaboradores, setColaboradores} = useContext(ContextAPI);

    const [open, setOpen] = React.useState(false);
    const [dialog, setDialog] = React.useState([]);
    const handleClickRow = (e) => {      
      setOpen(true);
      setDialog(e);
      console.log("Clicou, open = " + open);
  }

    const columns = [    
        { field: "matricula", 
          headerName: "Matricula", 
          width: 120,
          sortable: true
        },    
        {
          field: "nome",
          headerName: "Nome",
          width: 380,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true,
          
        },    
        {
          field: "cpf",
          headerName: "CPF",
          width: 170,
          cellClassName: 'cell-align-center',
          sortable: true
        },
        {
          field: "cargo",
          headerName: "Cargo",
          width: 230,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true
        },
        {
          field: "celular",
          headerName: "Celular",
          width: 150,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true
        },
        {
          field: "situacao",
          headerName: "Situação",
          width: 150,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true,
          renderCell: (params) => (
            <>
            {params.row.situacao == 'Ativo' ? <CheckCircleOutlineRoundedIcon sx={{color:'#388e3c', margin: '0 auto'}}/> : <NotInterestedRoundedIcon sx={{color:'#d32f2f', margin: '0 auto'}}/>}
            
            </>
             
          ),
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 120,
            sortable: false,
            renderCell: (params) => (
              <>
              {/* <DeleteForeverRoundedIcon sx={{cursor: 'pointer', color: '#d32f2f', margin: '0 auto'}} onClick={() => handleDeleteRow(params.row.cpf)} /> */}
              <Button variant='contained' sx={{cursor: 'pointer', margin: '0 auto'}} onClick={() => handleClickRow(params.row)} endIcon={<EditRoundedIcon   />}>
                Editar
              </Button>
              
              </>
               
            ),
          },
        
      ];
      let updatedFunc = colaboradores.map((row, index) => {
        return { ...row, id: index };
      })

     
  return (
    <>
    <Box sx={{ height: 650, width: '100%' }}>
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={updatedFunc}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    <FormDialog open={open} setOpen={setOpen} dialog={dialog} colaboradores={colaboradores} setColaboradores={setColaboradores} />    
    </>
    
  );
}

export default ListaColaboradores;