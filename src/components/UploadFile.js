import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from "axios";
import './UploadFile.css';

const UploadFile = ({ cpf }) => {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...files];
    const droppedFiles = Array.from(event.dataTransfer.files);
    droppedFiles.forEach((file) => {
      newFiles.push(file);
    });
    setFiles(newFiles);
  };

  const handleInputChange = (event) => {
    const newFiles = [...files];
    const uploadedFiles = Array.from(event.target.files);
    uploadedFiles.forEach((file) => {
      newFiles.push(file);
    });
    setFiles(newFiles);
  };

  const handleRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const renderProgress = (file) => {
    if (file.progress >= 0 && file.progress < 100) {
      return <div>Progress: {file.progress}%</div>;
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('cpf', cpf.replace(/[.-]/g, ''));
    files.forEach((file) => {
      formData.append("files", file);
    });
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    axios.post("https://gabriellgomess.com/gerenciador_rh/save_file.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // onUploadProgress: (progressEvent) => {
      //   const newFiles = [...files];
      //   const index = newFiles.findIndex((file) => file.name === progressEvent.target.name);
      //   newFiles[index].progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   setFiles(newFiles);
      // },
    }).then((response) => {
      console.log(response);      
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      {cpf !== "" ?
        <Typography>Selecione um CPF para enviar os arquivos</Typography> :
        <>
          <Typography>{files.length === 0 ? "Nenhum arquivo selecionado" : `${files.length} arquivos selecionados`}</Typography>
          <div className="dropzone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <div className="container-input-file">
              <Typography>Arraste e solte os arquivos aqui ou</Typography>
              <label className="upload-file">
                Clique para selecionar os arquivos
                <input className="input-file" name="files" type="file" onChange={handleInputChange} multiple />
              </label>
            </div>
          </div>
          <Stack sx={{width: '100%', height: '200px', padding: '20px 0 0 0'}} direction="row" spacing={1}>
            {files.map((file, index) => (
              <Chip label={file.name} key={index} onDelete={() => handleRemove(index)} />
            ))}
          </Stack>
          <Button onClick={handleSubmit} variant="contained" endIcon={<UploadFileIcon />}>Enviar Arquivos</Button>
        </>
      }
    </>
  );
};

export default UploadFile;
