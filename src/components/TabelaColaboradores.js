import React, {useEffect, useState, useContext} from 'react';
import ContextAPI from '../ContextAPI/ContextAPI';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormDialog from './FormDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel, faLink } from '@fortawesome/free-solid-svg-icons';


import PDFGenerator from './DocPdf';
import DocExcel from './DocExcel';





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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 600; 

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
          sortable: true,
          hide: isSmallScreen,
        },
        {
          field: "cargo",
          headerName: "Cargo",
          width: 230,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true,
          hide: isSmallScreen,
        },
        {
          field: "celular",
          headerName: "Celular",
          width: 150,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true,
          hide: isSmallScreen,
        },
        {
          field: "demissao",
          headerName: "Status Contrato",
          width: 150,
          alignItems: 'center',
          cellClassName: 'cell-align-center',
          sortable: true,
          hide: isSmallScreen,
          renderCell: (params) => (
            <>
            {params.row.demissao === '0000-00-00' || params.row.demissao === '' ? <Tooltip title="Contrato ativo"><CheckCircleOutlineRoundedIcon sx={{color:'#388e3c', margin: '0 auto'}}/></Tooltip> : <Tooltip title={`Contrato encerrado em ${(params.row.demissao)?.split('-').reverse().join('/')}`}><NotInterestedRoundedIcon sx={{color:'#d32f2f', margin: '0 auto'}}/></Tooltip>}            
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
              <Button disabled={sessionStorage.getItem('nivelAcesso') === "gerencia"?false:true} variant='contained' sx={{cursor: 'pointer', margin: '0 auto'}} onClick={() => handleClickRow(params.row)} endIcon={<EditRoundedIcon   />}>
                Editar
              </Button>              
              </>               
            ),
          },
          {
            field: "link",
            headerName: "Link",
            width: 350,
            alignItems: 'center',
            cellClassName: 'cell-align-center',
            sortable: true,
            renderCell: (params) => (
              <a style={{textDecoration: 'none'}} href={params.row.link} target='blank'>
              <Button variant='outlined' sx={{cursor: 'pointer', margin: '0 auto'}} endIcon={<FontAwesomeIcon icon={faLink} />}>
                Página do Colaborador
              </Button>              
              </a>               
            ),
          }
        
      ];
      let updatedFunc = colaboradores.map((row, index) => {
        return { ...row, id: index };
      }).sort((a, b) => b.matricula - a.matricula);

      
      
      const handleSelectionModelChange = (selectionModel) => {
        const selectedRows = updatedFunc.filter((row) => selectionModel.includes(row.id));
        setSelectedRows(selectedRows);
        console.log(selectedRows);
      };
      
      

     
  return (
    <>
    <Box sx={{ height: 650, width: '100%' }}>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'end', marginBottom: '20px'}}>         
          <Box sx={{width: {xs: '100%', sm: '100%', md: '60%', lg: '45%', xl: '33%'}, display: 'flex', justifyContent: 'space-between', flexDirection: {xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row'} }}>
            <PDFGenerator colaborador={selectedRows} />
            <DocExcel selectedRows={selectedRows} />
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