import React, {useEffect, useState, useContext} from 'react';
import ContextAPI from '../ContextAPI/ContextAPI';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormDialog from './FormDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

import PDFGenerator from './DocPdf';





const TabelaColaboradores = () => {
    const {colaboradores, setColaboradores} = useContext(ContextAPI);

    const [open, setOpen] = React.useState(false);
    const [dialog, setDialog] = React.useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
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
          field: "demissao",
          headerName: "Status Contrato",
          width: 150,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true,
          renderCell: (params) => (
            <>
            {params.row.demissao === '0000-00-00' || params.row.demissao === '' ? <CheckCircleOutlineRoundedIcon sx={{color:'#388e3c', margin: '0 auto'}}/> : <NotInterestedRoundedIcon sx={{color:'#d32f2f', margin: '0 auto'}}/>}            
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
          }
        
      ];
      let updatedFunc = colaboradores.map((row, index) => {
        return { ...row, id: index };
      }).sort((a, b) => b.matricula - a.matricula);

      function exportExcel() {
        const worksheet = XLSX.utils.json_to_sheet(selectedRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabela');
        XLSX.writeFile(workbook, 'Colaboradores.xlsx');
      }
      
      const handleSelectionModelChange = (selectionModel) => {
        const selectedRows = updatedFunc.filter((row) => selectionModel.includes(row.id));
        setSelectedRows(selectedRows);
        console.log(selectedRows);
      };
      
      

     
  return (
    <>
    <Box sx={{ height: 650, width: '100%' }}>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'end', marginBottom: '20px'}}>         
          <Box sx={{width: '30%', display: 'flex', justifyContent: 'space-between'}}>
            <PDFGenerator colaborador={selectedRows} />
            <Button disabled={selectedRows.length === 0} onClick={exportExcel} sx={{background: '#2e7d32', display: 'flex', alignItems: 'center'}} variant="contained" endIcon={<FontAwesomeIcon icon={faFileExcel} />}>
              Relatório geral
          </Button> 
          </Box>
      </Box>
      
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={updatedFunc}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={handleSelectionModelChange}
      />
    </Box>
    
    <FormDialog open={open} setOpen={setOpen} dialog={dialog} colaboradores={colaboradores} setColaboradores={setColaboradores} />    
    </>
    
  );
}

export default TabelaColaboradores;