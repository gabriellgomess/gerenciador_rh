import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';



const ListaColaboradores = () => {
    const [colaboradores, setColaboradores] = useState([]);
   

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
            {/* {params.row.situacao == 'Ativo' ? } */}
            
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
              <Button variant='contained' sx={{cursor: 'pointer', margin: '0 auto'}} onClick={() => handleEdit()} endIcon={<EditRoundedIcon   />}>
                Editar
              </Button>
              
              </>
               
            ),
          },
        
      ];
      let updatedFunc = colaboradores.map((row, index) => {
        return { ...row, id: index };
      })

      const handleDeleteRow = (cpf) => {        
       axios.post('https://gabriellgomess.com/gerenciador_rh/delete.php', {cpf: cpf})
         .then((response) => {
              console.log(response.data);
              window.location.reload();            
            }
            )
            .catch((error) => {
                console.log(error);
                }
            )            
      };

      const handleEdit = () => {
        alert('Em desenvolvimento');
      }
    
    useEffect(() => {
        axios.get('https://gabriellgomess.com/gerenciador_rh/busca.php')
        .then((response) => {
            console.log(response.data);
            setColaboradores(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
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
    </>
    
  );
}

export default ListaColaboradores;