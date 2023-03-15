import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import ContextAPI from "../ContextAPI/ContextAPI";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import "./UploadFile.css";
import { AddBox } from "@mui/icons-material";


const UploadFile = ({ cpf }) => {
  const [files, setFiles] = useState([]);
  const { colaboradores, setColaboradores } = useContext(ContextAPI);
  const [arquivosUser, setArquivosUser] = useState([]);
  const [selectedNome, setSelectedNome] = useState(null);


  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...files];
    const droppedFiles = Array.from(event.dataTransfer.files);
    droppedFiles.forEach((file) => {
      newFiles.push(file);
    });
    setFiles(newFiles);
  };
  const handleNomeChange = (event, value) => {
    
    setSelectedNome(value); // atualizando estado com o valor selecionado

  };
  const nomes = colaboradores.map((colaborador) => `${colaborador.nome} - ${colaborador.cpf.replace(/[.-]/g, '')}`).sort(); 
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



const { register, handleSubmit } = useForm();

const buscaArquivos = () => {
  if(selectedNome) {
    axios.post("https://gabriellgomess.com/gerenciador_rh/listar_arquivos.php", {

    cpf: selectedNome.split(" - ")[1]
    }).then((res) => {
      const retorno = res.data;
      console.log(retorno);
      if(retorno !== "Nenhum arquivo encontrado"){
        setArquivosUser(retorno);
      }else{
        setArquivosUser([]);
      }
      
    }).catch((err) => {
      console.log(err);
    })
  };
  
  }

const onSubmit = (data) => {
  const formData = new FormData();
  const nome = data.nome.split(" - ")[0];
  const cpf = (data.nome.split(" - ")[1]);
  formData.append("nome", nome);
  formData.append("cpf", cpf);
  const uploadedFiles = files;
  Array.from(uploadedFiles).forEach((file) => {
    formData.append("file[]", file);
  });
  
  axios.post("https://gabriellgomess.com/gerenciador_rh/save_file.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    console.log(res);
    // Limpar formulário
    setFiles([]);
    document.getElementById("nome").value = "";
    buscaArquivos();    
    
  }).catch((err) => {
    console.log(err);
  });
};



  useEffect(() => {
  
      buscaArquivos();

  }, [selectedNome]);

  return (
    <Box sx={{display: 'flex',flexWrap: 'wrap' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
      size="small"
      disablePortal
      sx={{
        width: {xs: "100%", sm: "100%", md: "50%", lg: "40%", xl: "40%"},
        marginBottom: "35px",
      }}
      name="nome"
      options={nomes}
      onChange={handleNomeChange}
      renderInput={(params) => (
        <TextField
          {...register("nome")}
          variant="outlined"
          size="small"
          {...params}
          label="Funcionário - CPF"
        />
      )}
    />
        <Typography>
          {files.length === 0
            ? "Nenhum arquivo selecionado"
            : `${files.length} arquivos selecionados`}
        </Typography>
        <div className="dropzone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} >
          <div className="container-input-file">
            <Typography>Arraste e solte os arquivos aqui ou</Typography>
            <label className="upload-file">
              Clique para selecionar os arquivos
              <input {...register('file')} className="input-file" name="file" type="file" onChange={handleInputChange} multiple />
            </label>
          </div>
        </div>
        <Stack sx={{ width: "100%", height: "200px", padding: "20px 0 0 0" }} direction="row" spacing={1}>
          {files.map((file, index) => (
            <Chip label={file.name} key={index} onDelete={() => handleRemove(index)} />
          ))}
        </Stack>
        <Button type='submit' variant="contained" endIcon={<UploadFileIcon />}>Enviar Arquivos</Button>
      </form>
      <Box sx={{margin: 3, width: '50%', display: 'flex', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'start', height: 'fit-content' }} >
        {arquivosUser.map((arquivo, index) => {
          return (            
              <Chip sx={{margin: '5px'}} key={index} label={arquivo.nome} component="a" href={arquivo.links} clickable />              
            
          )
        })
      }
            
      </Box>
    </Box>
  );
};

export default UploadFile;
