import React, { useEffect, useState, useContext } from 'react';
import ContextAPI from '../ContextAPI/ContextAPI';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { format } from 'date-fns';
import { Typography } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';

const meses = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro',
};

function Aniversariantes() {
  const { colaboradores } = useContext(ContextAPI);
  const [aniversariantesPorMes, setAniversariantesPorMes] = useState(null);

  // Agrupando os aniversariantes por mês
  useEffect(() => {
    const aniversariantesPorMesTemp = {
      '01': [],
      '02': [],
      '03': [],
      '04': [],
      '05': [],
      '06': [],
      '07': [],
      '08': [],
      '09': [],
      '10': [],
      '11': [],
      '12': [],
    };

    colaboradores.forEach(objeto => {
      const mesDeNascimento = objeto.nascimento.substring(5, 7);
      aniversariantesPorMesTemp[mesDeNascimento]?.push(objeto);
    });

    setAniversariantesPorMes(aniversariantesPorMesTemp);
  }, [colaboradores]);

  // Renderizando a lista de aniversariantes para cada mês
  const ListaDeAniversariantes = ({ aniversariantes }) => (
    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
      {aniversariantes.map(aniversariante => (
        <Card sx={{padding: '10px', width: 'content', margin: '5px', background: '#4fc3f7'}} key={aniversariante.nome}>
          <Typography variant='h6'>{aniversariante.nome}</Typography>
          <Typography variant='p'>{(aniversariante.nascimento).split('-').reverse().join('/')}</Typography> 
        </Card>
      ))}
    </Box>
  );

  // Renderizando os aniversariantes por mês
  const AniversariantesPorMes = () => (
    <>
      {Object.entries(aniversariantesPorMes)
        .sort(([mes1], [mes2]) => mes1.localeCompare(mes2))
        .map(([mes, aniversariantes]) => (
          <div key={mes}>
            <h2>{meses[mes]}</h2>

          <ListaDeAniversariantes aniversariantes={aniversariantes} />
        </div>
      ))}
    </>
  );

  return (
    <div>
    <h1>Aniversariantes <CakeIcon /></h1>  
      {aniversariantesPorMes ? (
        <AniversariantesPorMes />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Aniversariantes;
