import React from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

const DocExcel = (props) => {
    function exportExcel() {
        const worksheet = XLSX.utils.json_to_sheet(props.selectedRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabela');
        XLSX.writeFile(workbook, 'Colaboradores.xlsx');
      }
    return(
        <Button disabled={props.selectedRows.length === 0} onClick={exportExcel} sx={{ margin: '5px 0 5px 0', background: '#2e7d32', display: 'flex', alignItems: 'center'}} variant="contained" endIcon={<FontAwesomeIcon icon={faFileExcel} />}>
              Relatório geral
        </Button> 
    )
    
}

export default DocExcel;