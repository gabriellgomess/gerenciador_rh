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
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { formatToCEP, isCEP, formatToCPFOrCNPJ, isCPFOrCNPJ, formatToPhone, isPhone } from 'brazilian-values';

const CadastroColaborador = () => {  

    const [cep, setCep] = useState('')
    const [cpf, setCpf] = useState('')
    const [testCpfOrCnpj, setTestCpfOrCnpj] = useState(false)
    const [testPhone, setTestPhone] = useState(false)
    const [endereco, setEndereco] = useState('')

    const handleFormatPhone = (event) => {
        var phone = event.target.value
        var phoneFormatado = formatToPhone(phone)
        event.target.value = phoneFormatado
        if(isPhone(phoneFormatado)){
          setTestPhone(true)
        }else{
          setTestPhone(false)
        }
      }
  
      const handleFormatCpf = (event) => {
        var cpf = event.target.value;
        var cpfFormatado = formatToCPFOrCNPJ(cpf);
        event.target.value = cpfFormatado;
        setCpf(cpfFormatado);
        if(isCPFOrCNPJ(cpfFormatado)){
          setTestCpfOrCnpj(true)
        }else{
          setTestCpfOrCnpj(false)
        }     
      };
  
      const handleFormatCep = (event) => {
        var cep = event.target.value
        var cepFormatado = formatToCEP(cep)
        event.target.value = cepFormatado
        setCep(cepFormatado)
        if(isCEP(cepFormatado)){
          buscaCep(cepFormatado)
        }
    }
  
    const buscaCep = (cep) => {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        console.log(response.data)
          setEndereco(response.data)
          // setClientes(response.data.data)
          console.log(endereco)
      })
      .catch((error) => {
          console.log(error);
      });
    }

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
        {label: 'Conta Corrente'},{label: 'Conta Salário'}, {label: 'Conta Poupança'},
    ]
    const situacao = [
        {label: 'Ativo'}, {label: 'Inativo'}, {label: 'Pendente'},
    ]

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.rua = endereco.logradouro || '';
        data.bairro = endereco.bairro || '';
        data.cidade = endereco.localidade || '';
        data.estado = endereco.uf ? handleSetEstado(endereco.uf) : '';
        console.log("Indo: ",data);
        axios.post('https://gabriellgomess.com/gerenciador_rh/insere.php', data)
        .then(res => {
            console.log(res);
            console.log("Retorno: ",res.data);
        })
        .then(res => {
            // window.location.reload();
        })
    };

    const handleFormatCurrency = (event) => {
        var valor = event.target.value.replace(/\D/g,"");
        valor = (valor/100).toFixed(2) + "";
        valor = valor.replace(".", ",");
        valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");
        event.target.value = valor === "0,00" ? "" : "R$ "+valor;
    }

    const handleSetEstado = (estado) => {
       switch (estado) {
        case 'AC': return 'Acre';
        case 'AL': return 'Alagoas';
        case 'AP': return 'Amapá';
        case 'AM': return 'Amazonas';
        case 'BA': return 'Bahia';
        case 'CE': return 'Ceará';
        case 'DF': return 'Distrito Federal';
        case 'ES': return 'Espírito Santo';
        case 'GO': return 'Goiás';
        case 'MA': return 'Maranhão';
        case 'MT': return 'Mato Grosso';
        case 'MS': return 'Mato Grosso do Sul';
        case 'MG': return 'Minas Gerais';
        case 'PA': return 'Pará';
        case 'PB': return 'Paraíba';
        case 'PR': return 'Paraná';
        case 'PE': return 'Pernambuco';
        case 'PI': return 'Piauí';
        case 'RJ': return 'Rio de Janeiro';
        case 'RN': return 'Rio Grande do Norte';
        case 'RS': return 'Rio Grande do Sul';
        case 'RO': return 'Rondônia';
        case 'RR': return 'Roraima';
        case 'SC': return 'Santa Catarina';
        case 'SP': return 'São Paulo';
        case 'SE': return 'Sergipe';
        case 'TO': return 'Tocantins';
        default: return 'Estado';
         }
    }      
    return (
        <Card >
            <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>                
                <Box sx={{width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>   
                    <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant='h6' color="text.primary" gutterBottom>
                            Dados Pessoais
                        </Typography>
                        {/* <Avatar sx={{width: 100, height: 100, marginRight: '50px'}} alt="" src="/static/images/avatar/3.jpg" /> */}
                    </Box>           
                    
                    <TextField {...register('matricula')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="matricula" label="Matrícula" variant="standard" />
                    <TextField {...register('nome')} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="nome" label="Nome" variant="standard" />
                    <TextField {...register('cpf')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cpf" label="CPF" variant="standard" color={testCpfOrCnpj === true ? "success" : ""} onKeyUp={(event)=>handleFormatCpf(event)} />
                    <TextField {...register('pis')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="pis" label="PIS" variant="standard" />
                    <TextField {...register('rg')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="rg" label="RG" variant="standard" />
                    <TextField {...register('nascimento')} sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} name="nascimento" label="Data de nascimento" variant="standard" type='date'  InputLabelProps={{ shrink: true }} />
                    <TextField {...register('telefone')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="telefone" label="Telefone" variant="standard" color={testPhone === true ? "success" : ""} onKeyUp={(event)=>handleFormatPhone(event)} />
                    <TextField {...register('celular')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="celular" label="Celular" variant="standard" color={testPhone === true ? "success" : ""} onKeyUp={(event)=>handleFormatPhone(event)} />
                    <TextField {...register('email')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="email" label="E-mail" variant="standard" />
                    <TextField {...register('cep')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cep" label="CEP" variant="standard" onKeyUp={(event)=>handleFormatCep(event)} />
                    <TextField {...register('rua')} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="rua" label="Rua" variant="standard" value={endereco.logradouro || ''} />
                    <TextField {...register('numero')} sx={{width: { xs: '30%', sm: '30%', md: '20%', lg: '10%', xl: '10%' } , margin: '5px'}} name="numero" label="Número" variant="standard" />
                    <TextField {...register('bairro')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="bairro" label="Bairro" variant="standard" value={endereco.bairro || ''} />
                    <TextField {...register('cidade')} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="cidade" label="Cidade" variant="standard" value={endereco.localidade || ''} />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="estado" value={endereco.uf?handleSetEstado(endereco.uf):''} options={estadosBrasileiros} 
                        renderInput={(params) => <TextField variant="standard" {...register('estado')} {...params} label="Estado"  />} />
                    <Divider sx={{width: '100%', margin: '10px'}} />
                    <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Dados da Contratação
                    </Typography>
                    <TextField onKeyUp={(event)=>handleFormatCurrency(event)} {...register('salario')} sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' } , margin: '5px'}} name="salario" label="Salário" variant="standard" />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '50%', xl: '50%' }}} name="cargo" options={cargos} renderInput={(params) => <TextField {...register('cargo')} variant="standard" {...params} label="Cargo" />}
                    />
                    <TextField {...register('cbo')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="registro" label="Registro" variant="standard" />
                    <TextField {...register('cbo')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cbo" label="CBO" variant="standard" />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' }}} name="ccusto" options={ccusto} renderInput={(params) => <TextField {...register('ccusto')} variant="standard" {...params} label="Centro de Custo" />}
                    />
                     <TextField {...register('admissao')} sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} name="admissao" label="Data de admissão" variant="standard" type='date'  InputLabelProps={{ shrink: true }} />
                     <Divider sx={{width: '100%', margin: '10px'}} />
                     <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Dados Bancários
                    </Typography>
                     <TextField {...register('agencia')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="agencia" label="Agência" variant="standard" />
                     <TextField {...register('conta')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="conta" label="Conta" variant="standard" />
                     <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="tipoConta" options={tipoConta} renderInput={(params) => <TextField {...register('tipoConta')} variant="standard" {...params} label="Tipo de conta" />}
                    />
                    <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="situacao" options={situacao} renderInput={(params) => <TextField {...register('situacao')} variant="standard" {...params} label="Situação" />}
                    />
                    <TextField {...register('descAgencia')} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="descAgencia" label="Descrição da agência" variant="standard" />
                    <Divider sx={{width: '100%', margin: '10px'}} />
                    <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Escala
                    </Typography>
                    <TextField {...register('escala')} sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="escala" label="Escala" variant="standard" />
                    <TextField {...register('cargaHoraria')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cargaHoraria" label="Carga Horária" variant="standard" />
                    <Divider sx={{width: '100%', margin: '10px'}} />
                    <Typography sx={{width: '100%'}} variant='h6' color="text.primary" gutterBottom>
                        Benefícios
                    </Typography>
                    <TextField {...register('linhaVT')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="linhaVT" label="Linha VT" variant="standard" />
                    <TextField {...register('quantidadeVT')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="quantidadeVT" label="Quantidade VT / dia" variant="standard" />
                    <TextField {...register('planoSaude')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="planoSaude" label="Plano de saúde" variant="standard" />
                    <TextField {...register('planoOdonto')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="planoOdonto" label="Plano Odonto" variant="standard" />
                    <TextField {...register('cestaBasica')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cestaBasica" label="Cesta Básica" variant="standard" />
                    <TextField {...register('refeitorio')} sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="refeitorio" label="Refeitório" variant="standard" />                   
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