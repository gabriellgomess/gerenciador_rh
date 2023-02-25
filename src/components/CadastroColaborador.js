import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CadastroColaborador = () => {  
    const cargos = [  
        {label: "Enfermeiro (a)"},  {label: "Tecnico (a) de Enfermagem"},  {label: "Encarregado de Estoque"},  {label: "Farmaceutico (a)"},  {label: "Auxiliar de Higienização"},  {label: "Nutricionista"},  {label: "Diretor Executivo"},  {label: "Fisioterapeuta I"},  {label: "Aux. de Cozinha"},  {label: "Coordenador (a) de comunicação"},  {label: "Assistente Social"},  {label: "Assist. Administrativo (a)"},  {label: "Fisioterapeuta III"},  {label: "Medico Neurologista"},  {label: "Tecnico de manutenção"},  {label: "Médico Clínico"},  {label: "Auxiliar de Farmacia"},  {label: "Auxiliar de Cozinha"},  {label: "Psicologo(a)"},  {label: "Gerente de Atendimento"},  {label: "Analista Administrativo"},  {label: "Aux. de lavanderia"},  {label: "Fisioterapeuta II"},  {label: "Cozinheiro (a)"},  {label: "Encarregado de Lavanderia"},  {label: "Assistente de Relações Públicas"},  {label: "Coordenador de RH"},  {label: "Analista de Compras"},  {label: "Administrador(a) Financeiro"},  {label: "Motorista"},  {label: "Auxiliar de Dieta"},  {label: "Encarregado de Manutenção"}
    ];
    const estadosBrasileiros = [
        { label: 'Acre' },{ label: 'Alagoas' },{ label: 'Amapá' },{ label: 'Amazonas' },{ label: 'Bahia' },{ label: 'Ceará' },{ label: 'Distrito Federal' },{ label: 'Espírito Santo' },{ label: 'Goiás' },{ label: 'Maranhão' },{ label: 'Mato Grosso' },{ label: 'Mato Grosso do Sul' },{ label: 'Minas Gerais' },{ label: 'Pará' },{ label: 'Paraíba' },{ label: 'Paraná' },{ label: 'Pernambuco' },{ label: 'Piauí' },{ label: 'Rio de Janeiro' },{ label: 'Rio Grande do Norte' },{ label: 'Rio Grande do Sul' },{ label: 'Rondônia' },{ label: 'Roraima' },{ label: 'Santa Catarina' },{ label: 'São Paulo' },{ label: 'Sergipe' },{ label: 'Tocantins' }
    ]      
    const ccusto = [
        {label: 'Clinica'},{label: 'Administrativo'},{label: 'Geral-Obra'}
    ]
    const tipoConta = [
        {label: 'Corrente'},{label: 'Salário'}, {label: 'Poupança'},
    ]
    const situacao = [
        {label: 'Ativo'}, {label: 'Inativo'}, {label: 'Pendente'},
    ]

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('https://gabriellgomess.com/gerenciador_rh/insere.php', data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    };



      
    return (
        <Card sx={{background: '#e3f2fd' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>                
                <Box sx={{width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>                    
                    <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Dados Pessoais
                    </Typography>
                    <TextField {...register('matricula', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="matricula" label="Matrícula" variant="standard" />
                    <TextField {...register('nome', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="nome" label="Nome" variant="standard" />
                    <TextField {...register('cpf', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cpf" label="CPF" variant="standard" />
                    <TextField {...register('pis', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="pis" label="PIS" variant="standard" />
                    <TextField {...register('rg', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="rg" label="RG" variant="standard" />
                    <TextField {...register('nascimento', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} name="nascimento" label="Data de nascimento" variant="standard" type='date'  InputLabelProps={{ shrink: true }} />
                    <TextField {...register('telefone', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="telefone" label="Telefone" variant="standard" />
                    <TextField {...register('celular', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="celular" label="Celular" variant="standard" />
                    <TextField {...register('email', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="email" label="E-mail" variant="standard" />
                    <TextField {...register('cep', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cep" label="CEP" variant="standard" />
                    <TextField {...register('rua', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="rua" label="Rua" variant="standard" />
                    <TextField {...register('numero', {required: true})} sx={{width: { xs: '30%', sm: '30%', md: '20%', lg: '10%', xl: '10%' } , margin: '5px'}} name="numero" label="Número" variant="standard" />
                    <TextField {...register('bairro', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="bairro" label="Bairro" variant="standard" />
                    <TextField {...register('cidade', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="cidade" label="Cidade" variant="standard" />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="estado" options={estadosBrasileiros} 
                        renderInput={(params) => <TextField variant="standard" {...register('estado', {required: true})} {...params} label="Estado" />} />
                    <Divider sx={{width: '100%', margin: '10px'}} />
                    <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Dados da Contratação
                    </Typography>
                    <TextField {...register('salario', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' } , margin: '5px'}} name="salario" label="Salário" variant="standard" />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '50%', xl: '50%' }}} name="cargo" options={cargos} renderInput={(params) => <TextField {...register('cargo', {required: true})} variant="standard" {...params} label="Cargo" />}
                    />
                    <TextField {...register('cbo', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cbo" label="CBO" variant="standard" />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' }}} name="ccusto" options={ccusto} renderInput={(params) => <TextField {...register('ccusto', {required: true})} variant="standard" {...params} label="Centro de Custo" />}
                    />
                     <TextField {...register('admissao', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} name="admissao" label="Data de admissão" variant="standard" type='date'  InputLabelProps={{ shrink: true }} />
                     <Divider sx={{width: '100%', margin: '10px'}} />
                     <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Dados Bancários
                    </Typography>
                     <TextField {...register('agencia', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="agencia" label="Agência" variant="standard" />
                     <TextField {...register('conta', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="conta" label="Conta" variant="standard" />
                     <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="tipoConta" options={tipoConta} renderInput={(params) => <TextField {...register('tipoConta', {required: true})} variant="standard" {...params} label="Tipo de conta" />}
                    />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="situacao" options={situacao} renderInput={(params) => <TextField {...register('situacao', {required: true})} variant="standard" {...params} label="Situação" />}
                    />
                    <TextField {...register('descAgencia', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="descAgencia" label="Descrição da agência" variant="standard" />
                    <Divider sx={{width: '100%', margin: '10px'}} />
                    <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Escala
                    </Typography>
                    <TextField {...register('escala', {required: true})} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="escala" label="Escala" variant="standard" />
                    <TextField {...register('cargaHoraria', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cargaHoraria" label="Carga Horária" variant="standard" />
                    <Divider sx={{width: '100%', margin: '10px'}} />
                    <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Benefícios
                    </Typography>
                    <TextField {...register('linhaVT', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="linhaVT" label="Linha VT" variant="standard" />
                    <TextField {...register('quantidadeVT', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="quantidadeVT" label="Quantidade VT / dia" variant="standard" />
                    <TextField {...register('planoSaude', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="planoSaude" label="Plano de saúde" variant="standard" />
                    <TextField {...register('planoOdonto', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="planoOdonto" label="Plano Odonto" variant="standard" />
                    <TextField {...register('cestaBasica', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cestaBasica" label="Cesta Básica" variant="standard" />
                    <TextField {...register('refeitorio', {required: true})} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="refeitorio" label="Refeitório" variant="standard" />                   
                </Box>
                
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                <Button type='submit' variant="contained">Salvar</Button>
            </CardActions>
            </form>
        </Card>
    );
}

export default CadastroColaborador;