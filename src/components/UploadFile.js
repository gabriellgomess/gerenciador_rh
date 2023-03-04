import React, { useState } from "react";
import TypoGraphy from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from "axios";
import './UploadFile.css'

const UploadFile = (props) => {
  const [files, setFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...files];
    const droppedFiles = Array.from(event.dataTransfer.files);
    droppedFiles.forEach((file) => {
      newFiles.push(file);
    });
    setFiles(newFiles);
    setFileCount(newFiles.length);
  };

  const handleInputChange = (event) => {
    const newFiles = [...files];
    const uploadedFiles = Array.from(event.target.files);
    uploadedFiles.forEach((file) => {
      newFiles.push(file);
    });
    setFiles(newFiles);
    setFileCount(newFiles.length); // atualiza o número de arquivos
  };
  

  const handleRemove = (index) => {
    const newFiles = [...files];
    if (newFiles[index]) {
      newFiles.splice(index, 1);
      setFiles(newFiles);
      setFileCount(newFiles.length); // atualiza o número de arquivos
    }
  };
  
  

  const renderProgress = (file) => {
    if (file.progress >= 0 && file.progress < 100) {
      return <div>Progress: {file.progress}%</div>;
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    // adiciona o CPF ao formData
    formData.append('cpf', props.cpf);
    // adiciona os arquivos ao formData
    files.forEach((file) => {
      formData.append("files", file);
    });
    // envia o formData
    axios.post("https://gabriellgomess.com/gerenciador_rh/save_file.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const newFiles = [...files];
        const index = newFiles.findIndex((file) => file.name === progressEvent.target.name);
        newFiles[index].progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setFiles(newFiles);
      },
    }).then((response) => {
      console.log(response);
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
    {props.cpf == "" ? 
    <TypoGraphy>Selecione um CPF para enviar os arquivos</TypoGraphy> : 
    <>
     <TypoGraphy>{fileCount == 0?"Nenhum arquivo selecionado":fileCount+" arquivos selecionados"} </TypoGraphy>
    <div className="dropzone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="container-input-file">
           <TypoGraphy>Arraste e solte os arquivos aqui ou</TypoGraphy>
           <label className="upload-file"> Clique para selecionar os arquivos
                <input className="input-file" type="file" onChange={handleInputChange} multiple />
            </label> 
        </div>        
    </div>
    <Stack sx={{width: '100%', height: '200px', padding: '20px 0 0 0'}} direction="row" spacing={1}>
        {files.map((file, index) => (

          <Chip label={file.name} key={index} onDelete={() => handleRemove(index)}/>            
            
           
          
        ))}
      </Stack>
      <Button onClick={handleSubmit} variant="contained" endIcon={<UploadFileIcon />}>Enviar Arquivos</Button>
    </>}   
    </>
    
  );
};

export default UploadFile;
