import React from 'react';
import { TextField, Autocomplete, Select, MenuItem, Box } from '@mui/material';

const names = [
  { label: 'Alice' },
  { label: 'Bob' },
  { label: 'Charlie' },
  // ...
];
const accessLevels = [
    { label: 'Gerência' },
    { label: 'Coordenação' },
    { label: 'Analista' },
    { label: 'Operacional' },
    // ...
    ];

export default function CadastrarUsuario() {
  const [name, setName] = React.useState(null);
  const [level, setLevel] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [accessLevel, setAccessLevel] = React.useState('');

  return (
    <Box sx={{width: '100%', maxWidth: '500px', padding: '10px'}}>
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Autocomplete
                sx={{width: '100%', margin: '5px'}}
                options={names}
                getOptionLabel={(option) => option.label}
                value={name}
                onChange={(event, newValue) => {
                setName(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Nome" />}
            />
            <TextField
                sx={{width: '100%', margin: '5px'}}
                label="Usuário"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '5px'}}>
            <TextField
                sx={{width: '49%'}}
                type="password"
                label="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
                sx={{width: '49%'}}
                type="password"
                label="Confirmar Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            </Box>
            
            <Autocomplete
                sx={{width: '100%', margin: '5px'}}
                options={accessLevels}
                getOptionLabel={(option) => option.label}
                value={accessLevels}
                onChange={(event, newValue) => {
                setLevel(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Nível de Acesso" />}
            />
        </form>
    </Box>
    
  );
}