import React, { useState } from 'react';
import { Box, TextField, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Dependente = () => {
    return(
        <Box className="dependentes">
            <TextField {...register('dependente_nome')} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="dependente_nome" label="Nome" variant="outlined" size="small" />
            <TextField {...register('dependente_nascimento')} sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} name="dependente_nascimento" label="Data de nascimento" variant="outlined" size="small" type='date'  InputLabelProps={{ shrink: true }} />
            <TextField {...register('dependente_cpf')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="dependente_cpf" label="CPF" variant="outlined" size="small" color={testCpfOrCnpj === true ? "success" : ""} onKeyUp={(event) => handleFormatCpf(event)} />
            <TextField {...register('dependente_cidade_natal')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="dependente_cidade_natal" label="Cidade" variant="outlined" size="small" />
            <Autocomplete size="small" disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="dependente_estado" value={endereco.uf?handleSetEstado(endereco.uf):''} options={estadosBrasileiros} 
                renderInput={(params) => <TextField variant="outlined"  {...register('dependente_estado')} {...params} label="Estado" />} />
            <FormControl sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} component="fieldset">
            <FormLabel id="sexo">Gênero</FormLabel>
            <RadioGroup row aria-labelledby="dependente_sexo" name="dependente_sexo">
                <FormControlLabel name='dependente_sexo' {...register('dependente_sexo')} value="feminino" control={<Radio />} label="Feminino" />
                <FormControlLabel name='dependente_sexo' {...register('dependente_sexo')} value="masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel name='dependente_sexo' {...register('dependente_sexo')} value="outro" control={<Radio />} label="Outro" />
            </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default Dependente