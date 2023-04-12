import React, { useState, useContext } from 'react';
import ContextAPI from "../ContextAPI/ContextAPI";
import { TextField, Autocomplete, Box, Typography, Switch, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Navigate, useNavigate } from 'react-router-dom';




const names = [
  { label: 'Alice' },
  { label: 'Bob' },
  { label: 'Charlie' },
  // ...
];
const accessLevels = [
    { label: 'Gerência', value: 'gerencia' },
    { label: 'Coordenação', value: 'coordenacao' },
    { label: 'Analista', value: 'analista' },
    { label: 'Operacional', value: 'operacional' },
    // ...
    ];


export default function CadastrarUsuario() {
  const [name, setName] = useState(null);
  const [level, setLevel] = useState(null);
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { colaboradores, setColaboradores } = useContext(ContextAPI);

  const nomes = colaboradores
  .filter(colaborador => colaborador.demissao === "0000-00-00")
  .map(colaborador => `${colaborador.nome} - ${colaborador.cpf.replace(/[.-]/g, "")}`)
  .sort();

  function validarSenhas() {
    if (senha.trim() !== confirmarSenha.trim()) {
      setErro('As senhas não coincidem');
      toast.error('As senhas não coincidem', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return false;
    }
    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres');
      toast.error('A senha deve ter pelo menos 8 caracteres', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return false;
    }
    if (!/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
      setErro('A senha deve conter letras e números');
      toast.error('A senha deve conter letras e números', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return false;
    }
    setErro('');
    return true;
  }
const handleShowPassword = () => {
    setShowPassword(!showPassword);
    };

  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const dados = data.nome.split(' - ');
        data.nome = dados[0];
        data.matricula = dados[1];
        // Converte a senha para md5
        data.senha = CryptoJS.MD5(data.senha).toString();
        
       
        if (validarSenhas()) {
          console.table(data);
            axios.post(`${process.env.REACT_APP_URL}/api/handleClass.php?p=3`, data)
            .then((response) => {
                console.log(response);
                if(response.data == 'Novo registro criado com sucesso') {
                toast.success('Usuário cadastrado com sucesso', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",                  
                    onClose: () => window.location.href = `${process.env.REACT_APP_PATH}/cadastrar_usuario`,
                    });
                } else if(response.data == 'Usuário já cadastrado') {
                    toast.error('Usuário já cadastrado', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => window.location.href = `${process.env.REACT_APP_PATH}/cadastrar_usuario`,
                    });
                }
                reset();
                
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro ao cadastrar usuário', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => window.location.href = `${process.env.REACT_APP_PATH}/cadastrar_usuario`,
                    });
            });

        }
    };

  return (
    <Box sx={{width: '100%', maxWidth: '500px', padding: '10px'}}>
        <Typography variant="h4" component="h1" gutterBottom>
            Cadastrar Usuário
        </Typography>
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} onSubmit={handleSubmit(onSubmit)}>
            <Autocomplete
                sx={{width: '100%', margin: '5px'}}
                options={nomes}
                value={name}
                name='nome'
                onChange={(event, newValue) => {
                setName(newValue);
                
                }}
                renderInput={(params) => <TextField {...register('nome')} {...params} label="Nome" />}
            />
            <TextField
                sx={{width: '100%', margin: '5px'}}
                label="E-mail"
                type="email"
                defaultValue={username}
                onChange={(event) => setUsername(event.target.value)}
                name='email'
                {...register('email')}
                autoComplete="off"
            />
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '5px'}}>
            <TextField
                {...register('senha')}
                sx={{ width: '49%' }}
                name='senha'
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                onChange={(event) => setSenha(event.target.value)}
                
                
                />
                <TextField
                sx={{ width: '49%' }}
                label="Confirmar Senha"
                type={showPassword ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                onBlur={validarSenhas}
                />
            </Box>
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: '5px'}}>
            <Box sx={{width: '40%'}}><Typography variant='caption'>Mostrar Senha</Typography> <Switch {...label} size="small" onChange={()=>handleShowPassword()} /></Box>
            <Box sx={{width: '60%'}}><Typography variant="caption">A senha deve ter pelo menos 8 caracteres e conter letras e números</Typography></Box>
            </Box>
            <Autocomplete
                sx={{width: '100%', margin: '5px'}}
                options={accessLevels}
                getOptionLabel={(option) => option.value}
                value={level}
                name='nivelAcesso'
                onChange={(event, newValue) => {
                setLevel(newValue);
                
                }}
                renderInput={(params) => <TextField {...register('nivelAcesso')} {...params} label="Nível de Acesso" />}
            />
            <Button sx={{width: '100%', margin: '5px'}} variant="contained" type='submit'>Cadastrar</Button>
        </form>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </Box>    
  );
}