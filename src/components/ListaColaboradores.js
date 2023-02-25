import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';



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
          width: 230,
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
          width: 190,
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
            field: 'actions',
            headerName: 'Ações',
            width: 120,
            sortable: false,
            renderCell: (params) => (
              <DeleteForeverRoundedIcon sx={{cursor: 'pointer', color: '#d32f2f', margin: '0 auto'}} onClick={() => handleDeleteRow(params.row.cpf)} />
               
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
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={updatedFunc}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default ListaColaboradores;