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
import Card from "@mui/material/Card";
import axios from "axios";
import "./UploadFile.css";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from '@mui/icons-material/Description';

const UploadFile = ({ cpf }) => {
  const [files, setFiles] = useState([]);
  const { colaboradores, setColaboradores } = useContext(ContextAPI);
  const [arquivosUser, setArquivosUser] = useState([]);
  const [selectedNome, setSelectedNome] = useState(null);
  const [nomeInputValue, setNomeInputValue] = useState("");

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
    setSelectedNome(value);
    setNomeInputValue(value);
  };

  const nomes = colaboradores
    .map(
      (colaborador) =>
        `${colaborador.nome} - ${colaborador.cpf.replace(/[.-]/g, "")}`
    )
    .sort();
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
    if (selectedNome) {
      axios
        .post("https://gabriellgomess.com/gerenciador_rh/listar_arquivos.php", {
          cpf: selectedNome.split(" - ")[1],
        })
        .then((res) => {
          const retorno = res.data;
          console.log(retorno);
          if (retorno !== "Nenhum arquivo encontrado") {
            setArquivosUser(retorno);
          } else {
            setArquivosUser([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    const nome = data.nome.split(" - ")[0];
    const cpf = data.nome.split(" - ")[1];
    formData.append("nome", nome);
    formData.append("cpf", cpf);
    const uploadedFiles = files;
    Array.from(uploadedFiles).forEach((file) => {
      formData.append("file[]", file);
    });

    axios
      .post(
        "https://gabriellgomess.com/gerenciador_rh/save_file.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        // Limpar formulário
        setFiles([]);
        document.getElementById("nome").value = "";
      })
      .catch((err) => {
        console.log(err);
        buscaArquivos();
      });
  };

  useEffect(() => {
    buscaArquivos();
    console.log("useEffect");
  }, [selectedNome]);

  useEffect(() => {
    if (!nomeInputValue) {
      setArquivosUser([]);
    }
  }, [nomeInputValue]);

  const handleDelete = (file) => (event) => {
    axios
      .post("https://gabriellgomess.com/gerenciador_rh/delete_file.php", {
        file: file,
        cpf: selectedNome.split(" - ")[1],
      })
      .then((res) => {
        console.log(res);
        buscaArquivos();
      })
      .catch((err) => {
        console.log(err);
        buscaArquivos();
      });
  };
  const followLink = (link) => (event) => {
    // abrir nova janela com o link
    window.open(link, "_blank");
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: 'space-evenly' }}>
      <Card sx={{width: '100%', maxWidth: '750px', padding: '50px', marginTop: '40px', background: '#f0f0f0'}}>
        <form className="form-file" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            Selecione um colaborador para enviar arquivos
          </Typography>
          <Autocomplete
            size="small"
            disablePortal
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "50%",
                lg: "50%",
                xl: "50%",
              },
              marginBottom: "35px",
            }}
            name="nome"
            options={nomes}
            value={nomeInputValue}
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
          {selectedNome && (
            <>
          <Typography>
            {files.length === 0 ? (
              <Typography variant="caption">
                Nenhum arquivo selecionado
              </Typography>
            ) : (
              <Typography variant="caption">{`${files.length} arquivos selecionados`}</Typography>
            )}
          </Typography>
          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="container-input-file">
              <label className="upload-file">
                Arraste e solte os arquivos aqui ou clique para selecionar os
                arquivos
                <input
                  {...register("file")}
                  className="input-file"
                  name="file"
                  type="file"
                  onChange={handleInputChange}
                  multiple
                />
              </label>
            </div>
          </div>
          <Box
            sx={{ width: "100%", height: "200px", maxHeight: "200px", padding: "20px 0 0 0", margin: '10px 0', overflow: 'auto' }}
            direction="row"
            spacing={1}
          >
            {files.map((file, index) => (
              <Chip
              sx={{ margin: "5px" }}
                label={file.name}
                key={index}
                onDelete={() => handleRemove(index)}
              />
            ))}
          </Box>
          <Button
            type="submit"
            variant="contained"
            endIcon={<UploadFileIcon />}
          >
            Enviar Arquivos
          </Button>
          </>
          )}
        </form>
        
      </Card>
      <Card sx={{width: '100%', maxWidth: '750px', padding: '50px', marginTop: '40px', background: '#f0f0f0'}}>
        <Box
          sx={{
            margin: 3,
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            alignItems: "start",
            alignContent: "start",
            height: "600px", 
            overflow: "auto"  
          }}
        >
          <Typography variant="h5" sx={{width: '100%'}}>Documentos enviados</Typography>
          {arquivosUser.length > 0 ? (
            <>
              {arquivosUser.map((arquivo, index) => {
                let extensao = arquivo.nome.split(".")[1];
                // array de documentos por extensão
                let docs = ["doc", "docx", "odt", "pdf", "xls", "xlsx", "ods"];
                // array de imagens por extensão
                let imgs = ["jpg", "jpeg", "png", "gif", "svg"];
                // verifica se a extensão do arquivo está no array de documentos ou de imagens
                let isDoc = docs.includes(extensao);
                let isImg = imgs.includes(extensao);
                // se for documento, retorna o ícone de documento
                if (isDoc) {
                  // se for documento, retorna o ícone de documento
                  var iconFile = <DescriptionIcon />;
                  var colorFile = "error";
                }else if (isImg) {
                  // se for imagem, retorna o ícone de imagem
                  var iconFile = <ImageIcon />;
                  var colorFile = "info";
                } else {
                  // se não for nenhum dos dois, retorna o ícone de arquivo
                  var iconFile = <ArticleIcon />;
                }
                return (
                  <Chip
                    sx={{ margin: "5px" }}
                    key={index}
                    label={arquivo.nome}
                    clickable
                    onClick={followLink(arquivo.links)}
                    color={colorFile}
                    icon={iconFile}
                    onDelete={handleDelete(arquivo.nome)}
                    deleteIcon={<DeleteIcon />}
                  />
                );
              })}
            </>
          ) : (
            <Typography variant="h5" color="lightgrey" gutterBottom>
              Nenhum arquivo encontrado
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default UploadFile;
