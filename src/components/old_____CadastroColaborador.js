import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import UploadFile from './UploadFile';
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import {
  formatToCEP,
  isCEP,
  formatToCPFOrCNPJ,
  isCPFOrCNPJ,
  formatToPhone,
  isPhone,
} from "brazilian-values";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material/";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CadastroColaborador = () => {
  const [cep, setCep] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfDocs, setCpfDocs] = useState("");
  const [testCpfOrCnpj, setTestCpfOrCnpj] = useState(false);
  const [testPhone, setTestPhone] = useState(false);
  const [endereco, setEndereco] = useState("");

  const handleFormatPhone = (event) => {
    var phone = event.target.value;
    var phoneFormatado = formatToPhone(phone);
    event.target.value = phoneFormatado;
    if (isPhone(phoneFormatado)) {
      setTestPhone(true);
    } else {
      setTestPhone(false);
    }
  };

  const handleFormatCpf = (event) => {
    var cpf = event.target.value;
    setCpfDocs(cpf);
    var cpfFormatado = formatToCPFOrCNPJ(cpf);
    event.target.value = cpfFormatado;
    setCpf(cpfFormatado);
    if (isCPFOrCNPJ(cpfFormatado)) {
      setTestCpfOrCnpj(true);
    } else {
      setTestCpfOrCnpj(false);
    }
  };

  const handleFormatCep = (event) => {
    var cep = event.target.value;
    var cepFormatado = formatToCEP(cep);
    event.target.value = cepFormatado;
    setCep(cepFormatado);
    if (isCEP(cepFormatado)) {
      buscaCep(cepFormatado);
    }
  };

  const buscaCep = (cep) => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        console.log(response.data);
        setEndereco(response.data);
        // setClientes(response.data.data)
        console.log(endereco);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cargos = [
    { label: "Enfermeiro (a)" },
    { label: "Tecnico (a) de Enfermagem" },
    { label: "Encarregado de Estoque" },
    { label: "Farmaceutico (a)" },
    { label: "Auxiliar de Higienização" },
    { label: "Nutricionista" },
    { label: "Diretor Executivo" },
    { label: "Fisioterapeuta I" },
    { label: "Aux. de Cozinha" },
    { label: "Coordenador (a) de comunicação" },
    { label: "Assistente Social" },
    { label: "Assist. Administrativo (a)" },
    { label: "Fisioterapeuta III" },
    { label: "Medico Neurologista" },
    { label: "Tecnico de manutenção" },
    { label: "Médico Clínico" },
    { label: "Auxiliar de Farmacia" },
    { label: "Auxiliar de Cozinha" },
    { label: "Psicologo(a)" },
    { label: "Gerente de Atendimento" },
    { label: "Analista Administrativo" },
    { label: "Aux. de lavanderia" },
    { label: "Fisioterapeuta II" },
    { label: "Cozinheiro (a)" },
    { label: "Encarregado de Lavanderia" },
    { label: "Assistente de Relações Públicas" },
    { label: "Coordenador de RH" },
    { label: "Analista de Compras" },
    { label: "Administrador(a) Financeiro" },
    { label: "Motorista" },
    { label: "Auxiliar de Dieta" },
    { label: "Encarregado de Manutenção" },
  ];
  const estadosBrasileiros = [
    { label: "Acre" },
    { label: "Alagoas" },
    { label: "Amapá" },
    { label: "Amazonas" },
    { label: "Bahia" },
    { label: "Ceará" },
    { label: "Distrito Federal" },
    { label: "Espírito Santo" },
    { label: "Goiás" },
    { label: "Maranhão" },
    { label: "Mato Grosso" },
    { label: "Mato Grosso do Sul" },
    { label: "Minas Gerais" },
    { label: "Pará" },
    { label: "Paraíba" },
    { label: "Paraná" },
    { label: "Pernambuco" },
    { label: "Piauí" },
    { label: "Rio de Janeiro" },
    { label: "Rio Grande do Norte" },
    { label: "Rio Grande do Sul" },
    { label: "Rondônia" },
    { label: "Roraima" },
    { label: "Santa Catarina" },
    { label: "São Paulo" },
    { label: "Sergipe" },
    { label: "Tocantins" },
  ];
  const uf = [
    { label: "AC" },
    { label: "AL" },
    { label: "AP" },
    { label: "AM" },
    { label: "BA" },
    { label: "CE" },
    { label: "DF" },
    { label: "ES" },
    { label: "GO" },
    { label: "MA" },
    { label: "MT" },
    { label: "MS" },
    { label: "MG" },
    { label: "PA" },
    { label: "PB" },
    { label: "PR" },
    { label: "PE" },
    { label: "PI" },
    { label: "RJ" },
    { label: "RN" },
    { label: "RS" },
    { label: "RO" },
    { label: "RR" },
    { label: "SC" },
    { label: "SP" },
    { label: "SE" },
    { label: "TO" }  
  ]
  const ccusto = [
    { label: "Clinica" },
    { label: "Administrativo" },
    { label: "Geral-Obra" },
  ];
  const tipoConta = [
    { label: "Conta Corrente" },
    { label: "Conta Salário" },
    { label: "Conta Poupança" },
  ];
  const situacao = [
    { label: "Ativo" },
    { label: "Inativo" },
    { label: "Pendente" },
  ];
  const raca = [
    { label: "Branca" },
    { label: "Preta" },
    { label: "Parda" },
    { label: "Amarela" },
    { label: "Indigena" },
  ];
  const estado_civil = [
    { label: "Solteiro(a)" },
    { label: "Casado(a)" },
    { label: "Divorciado(a)" },
    { label: "Viúvo(a)" },
    { label: "Separado(a)" },
  ];
  const [dependentes, setDependentes] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { dependentes } });
  const onSubmit = (data) => {
    setDependentes(data.dependentes);
    data.rua = endereco.logradouro || "";
    data.bairro = endereco.bairro || "";
    data.cidade = endereco.localidade || "";
    data.estado = endereco.uf ? handleSetEstado(endereco.uf) : "";
    const jsonData = JSON.stringify(data);
    console.log("JSON: ", jsonData);
    axios.post(`${process.env.REACT_APP_URL}/api/handleClass.php?p=2`, data)
    .then(res => {
        console.log(res);
        console.log("Retorno: ",res.data);
    })
    .then(res => {
        // window.location.reload();
    })
  };

  const handleFormatCurrency = (event) => {
    var valor = event.target.value.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");
    event.target.value = valor === "0,00" ? "" : "R$ " + valor;
  };

  const handleSetEstado = (estado) => {
    switch (estado) {
      case "AC":
        return "Acre";
      case "AL":
        return "Alagoas";
      case "AP":
        return "Amapá";
      case "AM":
        return "Amazonas";
      case "BA":
        return "Bahia";
      case "CE":
        return "Ceará";
      case "DF":
        return "Distrito Federal";
      case "ES":
        return "Espírito Santo";
      case "GO":
        return "Goiás";
      case "MA":
        return "Maranhão";
      case "MT":
        return "Mato Grosso";
      case "MS":
        return "Mato Grosso do Sul";
      case "MG":
        return "Minas Gerais";
      case "PA":
        return "Pará";
      case "PB":
        return "Paraíba";
      case "PR":
        return "Paraná";
      case "PE":
        return "Pernambuco";
      case "PI":
        return "Piauí";
      case "RJ":
        return "Rio de Janeiro";
      case "RN":
        return "Rio Grande do Norte";
      case "RS":
        return "Rio Grande do Sul";
      case "RO":
        return "Rondônia";
      case "RR":
        return "Roraima";
      case "SC":
        return "Santa Catarina";
      case "SP":
        return "São Paulo";
      case "SE":
        return "Sergipe";
      case "TO":
        return "Tocantins";
      default:
        return "Estado";
    }
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const styles = {
    heightForm: {
      minHeight: "650px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dependentes",
  });
  console.log(dependentes);

  return (
    <form style={styles.heightForm} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Box sx={{width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center"}} >
            <Box sx={{ width: "100%" }}>             
                <Typography sx={{ width: "100%" }} variant="h6" color="text.primary" gutterBottom >Dados Pessoais</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '7px' }}>
                  
                    <TextField {...register("nome")} sx={{ width: {xs: "100%", sm: "100%", md: "66%", lg: "50%", xl: "50%", },  }} name="nome" label="Nome" variant="outlined" size="small" />
                    <TextField {...register("data_nascimento")} sx={{width: {xs: "100%",sm: "100%",md: "20%",lg: "24%",xl: "24%",}, }} name="data_nascimento" label="Data de nascimento" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />
                    <FormControl sx={{width: {xs: "100%",sm: "100%",md: "20%",lg: "24%",xl: "24%",}, }} component="fieldset" >                    
                      <RadioGroup row aria-labelledby="sexo" name="sexo">
                        <FormControlLabel name="sexo" {...register("sexo")} value="feminino" control={<Radio />} label="Feminino" />
                        <FormControlLabel name="sexo" {...register("sexo")} value="masculino" control={<Radio />} label="Masculino" />
                        <FormControlLabel name="sexo" {...register("sexo")} value="outro" control={<Radio />} label="Outro" />
                      </RadioGroup>
                    </FormControl>                                           
                  
                  <TextField {...register("nome_mae")} sx={{width: {xs: "100%",sm: "100%",md: "33%",lg: "35%",xl: "35%",}, }} name="nome_mae" label="Nome da mãe" variant="outlined" size="small"  />
                  <TextField {...register("nome_pai")} sx={{width: {xs: "100%",sm: "100%",md: "33%",lg: "35%",xl: "35%",},  }} name="nome_pai" label="Nome do pai" variant="outlined" size="small" />
                  <Autocomplete size="small" disablePortal sx={{width: {xs: "100%",sm: "100%",md: "33%",lg: "28%",  xl: "28%",}, }} name="cor" options={raca} renderInput={(params) => (
                    <TextField {...register("cor")} variant="outlined" size="small" {...params} label="Raça / Cor" /> 
                  )} />

                  <Autocomplete size="small" disablePortal sx={{width: {xs: "100%",sm: "48%",md: "48%",lg: "25%",xl: "24%",}, }} name="estado_civil" options={estado_civil} renderInput={(params) => (   
                  <TextField {...register("estado_civil")} variant="outlined" size="small" {...params}  label="Estado Civil"   /> 
                  )} />
                  <TextField {...register("naturalidade")} sx={{width: {xs: "100%",sm: "48%",md: "48%",lg: "25%",xl: "24%",}, }} name="naturalidade" label="Naturalidade" variant="outlined" size="small" />
                  <TextField {...register("grau_instrucao")} sx={{width: {xs: "100%",sm: "48%",md: "48%",lg: "25%",xl: "24%",}, }} name="grau_instrucao" label="Grau de instrução" variant="outlined" size="small"  />
                  <TextField {...register("graduacao")} sx={{width: {xs: "100%",sm: "48%",md: "48%",lg: "25%",xl: "24%",}, }} name="graduacao" label="Graduação" variant="outlined" size="small" />

                
                  <TextField {...register("cep")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",} }} name="cep" label="CEP" variant="outlined" size="small" onKeyUp={(event) => handleFormatCep(event)}/>
                  <TextField {...register("rua")} sx={{width: {xs: "100%",sm: "100%",md: "66%",lg: "50%",xl: "50%",} }} name="rua" label="Rua" variant="outlined" size="small" value={endereco.logradouro || ""} />
                  <TextField {...register("numero")} sx={{width: {xs: "30%",sm: "30%",md: "20%",lg: "10%",xl: "10%",} }} name="numero" label="Número" variant="outlined" size="small" />


                  <TextField {...register("bairro")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",} }} name="bairro" label="Bairro" variant="outlined" size="small" value={endereco.bairro || ""}/>
                  <TextField {...register("cidade")} sx={{width: {xs: "100%",sm: "100%",md: "66%",lg: "50%",xl: "50%",} }} name="cidade" label="Cidade" variant="outlined" size="small" value={endereco.localidade || ""}/>
                  <Autocomplete size="small" disablePortal sx={{width: {  xs: "100%",  sm: "48%",  md: "30%",  lg: "20%",  xl: "20%",} }} name="estado" value={endereco.uf ? handleSetEstado(endereco.uf) : ""} options=     {estadosBrasileiros} renderInput={(params) => (
                      <TextField variant="outlined" {...register("estado")} {...params} label="Estado" />
                    )}/>

                  <TextField {...register("residencia_propria")} sx={{width: {xs: "30%",sm: "30%",md: "20%",lg: "10%",xl: "10%",} }} name="residencia_propria" label="Residência Própria" variant="outlined" size="small"/>
                  <TextField {...register("residencia_adquirida_fgts")} sx={{width: {xs: "30%",sm: "30%",md: "20%",lg: "10%",xl: "10%",} }} name="residencia_adquirida_fgts" label="Adquirido com FGTS" variant="outlined" size="small" />
                  <TextField {...register("email")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",} }} name="email" label="E-mail" variant="outlined" size="small" />
                  <TextField {...register("telefone")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%", }}} name="telefone" label="Telefone" variant="outlined" size="small" color={testPhone === true ? "success" : ""} onKeyUp={(event) => handleFormatPhone(event)} />
                  <TextField {...register("celular")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",} }} name="celular" label="Celular" variant="outlined" size="small" color={testPhone === true ? "success" : ""} onKeyUp={(event) => handleFormatPhone(event)} />
                
                
                  <TextField {...register("cpf")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",} }} name="cpf" label="CPF" variant="outlined" size="small" color={testCpfOrCnpj === true ? "success" : ""} onKeyUp={(event) => handleFormatCpf(event)} />
                  <TextField {...register("rg")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",} }} name="rg" label="RG" variant="outlined" size="small" />
                  <Autocomplete size="small" disablePortal sx={{width: {xs: "20%",sm: "20%",md: "10%",lg: "5%",xl: "5%",} }} name="uf_rg" options={uf} renderInput={(params) => (
                      <TextField {...register("uf_rg")} variant="outlined" size="small" {...params} label="UF RG" />
                  )}/>
                  <TextField {...register("orgao_rg")} sx={{width: {xs: "20%",sm: "20%",md: "10%",lg: "5%",xl: "5%",} }} name="orgao_rg" label="Orgão Emissor" variant="outlined" size="small" />
                  <TextField {...register("data_expedicao")} sx={{width: {  xs: "100%",  sm: "100%",  md: "48%",  lg: "20%",  xl: "20%",} }} name="data_expedicao" label="Data da Emissão" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />
                  <TextField {...register("pis")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",} }} name="pis" label="PIS" variant="outlined" size="small" />


                  <TextField {...register("aposentado")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="aposentado" label="Aposentado" variant="outlined" size="small" />
                  <TextField {...register("cnh")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="cnh" label="CNH" variant="outlined" size="small"/>
                  <TextField {...register("cnh_categoria")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="cnh_categoria" label="Cat. Habilit" variant="outlined" size="small" />
                  <TextField {...register("cnh_validade")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",  xl: "20%",}}} name="cnh_validade" label="Validade CNH" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }}/>


                  <TextField {...register("hab_emissao")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="hab_emissao" label="Emissão CNH" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />
                  <TextField {...register("titulo_eleitoral")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="titulo_eleitoral" label="Título Eleitoral" variant="outlined" size="small" />
                  <TextField {...register("zona_eleitoral")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="zona_eleitoral" label="Zona Eleitoral" variant="outlined" size="small" />
                  <TextField {...register("secao_eleitoral")} sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="secao_eleitoral" label="Sessão Eleitoral" variant="outlined" size="small" />


                  <TextField {...register("reservista")} sx={{width: {xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="reservista" label="Reservista" variant="outlined" size="small"/>
                </Box>

                <Typography  sx={{ width: "100%" }} variant="h6" color="text.primary" gutterBottom >Dados da Contratação</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '7px' }}>


                  <TextField {...register("admissao")} sx={{width:{xs:"100%",sm:"100%",md:"48%",lg:"20%",xl:"20%",}}} name="admissao" label="Data de admissão" variant="outlined" size="small" type="date" InputLabelProps={{shrink: true }} />
                  <Autocomplete size="small" disablePortal sx={{width:{xs:"100%",sm:"100%",md:"48%",lg:"50%",xl:"50%",}}} name="cargo" options={cargos} renderInput={(params) => (
                      <TextField {...register("cargo")} variant="outlined" size="small" {...params} label="Cargo"/>
                    )}/>
                  <TextField {...register("cod_cargo")}sx={{width:{xs:"100%",sm:"100%",md:"48%",lg:"20%",xl:"20%",}}} name="cod_cargo" label="Código do Cargo" variant="outlined" size="small" />


                  <TextField onKeyUp={(event) => handleFormatCurrency(event)} {...register("salario")} sx={{width:{xs:"100%",sm:"100%",md:"48%",lg:"20%",xl:"20%",}}} name="salario" label="Salário" variant="outlined" size="small"/>
                  <TextField {...register("contrato_experiencia")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="contrato_experiencia" label="Contrato de Experiência" variant="outlined" size="small"/>
                  <Autocomplete size="small" disablePortal sx={{width: {xs: "100%",sm: "48%",md: "30%",lg: "20%",xl: "20%",}}} name="ccusto" options={ccusto} renderInput={(params) => (
                      <TextField {...register("ccusto")} variant="outlined" size="small" {...params} label="Centro de Custo" />
                    )}/>
                  <TextField {...register("cod_ccusto")} sx={{width:{xs:"100%",sm:"100%",md:"48%",lg:"20%",xl:"20%",}}} name="cod_ccusto" label="Código do Centro de Custo" variant="outlined" size="small"/>


                  <TextField {...register("registro")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="registro" label="Registro" variant="outlined" size="small"/>
                  <TextField {...register("cbo")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="cbo" label="CBO" variant="outlined" size="small"/>
                  <FormControl sx={{width:{xs:"100%",sm:"100%",md:"48%",lg:"20%",xl:"20%",}}} component="fieldset">
                    <FormLabel sx={{fontSize: '12px',margin: '0'}} id="insalubridade">Adicional de insalubridade</FormLabel>
                    <RadioGroup sx={{padding: '0', margin: '0', height: '12px'}} row aria-labelledby="insalubridade" name="insalubridade">
                      <FormControlLabel sx={{height: '20px'}} name="insalubridade" {...register("insalubridade")} value="sim" control={<Radio />} label="Sim"/>
                      <FormControlLabel sx={{height: '20px'}} name="insalubridade" {...register("insalubridade")} value="nao" control={<Radio/>} label="Não"/>
                    </RadioGroup>
                  </FormControl>
                  <TextField {...register("experiencia_anterior")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="experiencia_anterior" label="Experiência Anterior" variant="outlined" size="small"/>


                  <TextField {...register("tem_outro_emprego")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="tem_outro_emprego" label="Outro emprego" variant="outlined" size="small"/>
                  <TextField {...register("nome_outra_empresa")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="nome_outra_empresa" label="Nome da outra empresa" variant="outlined" size="small"/>
                  <TextField {...register("pcd")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="pcd" label="Portador de necessidades especiais " variant="outlined" size="small"/>
                  <TextField {...register("necessidade_especial")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="necessidade_especial" label="Necessidade especial" variant="outlined" size="small"/>
                </Box>
             
                <Typography sx={{ width: "100%" }} variant="h6" color="text.primary" gutterBottom>Dados Bancários</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '7px' }}>

                  <TextField {...register("banco")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="banco" label="Banco" variant="outlined" size="small"/>
                  <TextField {...register("agencia")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="agencia" label="Agência" variant="outlined" size="small"/>
                  <TextField {...register("conta")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="conta" label="Conta" variant="outlined" size="small"/>
                  <Autocomplete size="small" disablePortal sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="tipo_conta" options={tipoConta} renderInput={(params) => (
                      <TextField {...register("tipo_conta")} variant="outlined" size="small" {...params} label="Tipo de conta"/>
                    )}/>


                  <Autocomplete size="small" disablePortal sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="situacao" options={situacao} renderInput={(params) => (
                      <TextField {...register("situacao")} variant="outlined" size="small" {...params} label="Situação"/>
                    )}/>
                  <TextField {...register("descAgencia")} sx={{width:{xs:"100%",sm:"100%",md:"66%",lg:"50%",xl:"50%",}}} name="descAgencia" label="Descrição da agência" variant="outlined" size="small" />

                </Box>
             
                <Typography sx={{ width: "100%" }} variant="h6" color="text.primary" gutterBottom>Escala</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '7px' }}>

                  <TextField {...register("escala")} sx={{width:{xs:"100%",sm:"100%",md:"66%",lg:"50%",xl:"50%",}}} name="escala" label="Escala" variant="outlined" size="small"/>
                  <TextField {...register("cargaHoraria")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="cargaHoraria" label="Carga Horária" variant="outlined" size="small"/>

                </Box>
              
                <Typography sx={{ width: "100%" }} variant="h6" color="text.primary" gutterBottom>Benefícios</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '7px' }}>

                  <TextField {...register("linhaVT")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="linhaVT" label="Linha VT" variant="outlined" size="small"/>
                  <TextField {...register("quantidadeVT")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="quantidadeVT" label="Quantidade VT / dia" variant="outlined" size="small" />
                  <TextField {...register("planoSaude")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="planoSaude" label="Plano de saúde" variant="outlined" size="small"/>
                  <TextField {...register("planoOdonto")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="planoOdonto" label="Plano Odonto" variant="outlined" size="small"/>


                  <TextField {...register("cestaBasica")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="cestaBasica" label="Cesta Básica" variant="outlined" size="small"/>
                  <TextField {...register("refeitorio")} sx={{width:{xs:"100%",sm:"48%",md:"30%",lg:"20%",xl:"20%",}}} name="refeitorio" label="Refeitório" variant="outlined" size="small"/>
                </Box>
             
                <Typography sx={{ width: "100%" }} variant="h6" color="text.primary" gutterBottom>Dependentes</Typography>
                <Box>
                  {fields.map((field, index) => (
                    <Grid key={field.id} container spacing={2}>
                      <Grid item xs={4}>
                        <TextField {...register(`dependentes.${index}.nome`)} label="Nome" variant="outlined" fullWidth sx={{ margin: "5px" }} size="small"/>
                      </Grid>
                      <Grid item xs={1}>
                        <TextField {...register(`dependentes.${index}.data_nascimento`)} label="Data de nascimento" variant="outlined" fullWidth sx={{ margin: "5px" }} size="small" type="date"/>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField {...register(`dependentes.${index}.cpf`)} label="CPF" variant="outlined" fullWidth sx={{ margin: "5px" }} size="small"/>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField {...register(`dependentes.${index}.tipo`)} label="Tipo" variant="outlined" fullWidth sx={{ margin: "5px" }} size="small"/>
                      </Grid>
                      <Grid item xs={1}>
                        <Fab sx={{ width: "40px", height: "40px" }} onClick={() => remove(index)} color="error" aria-label="edit">
                          <PersonRemoveAlt1Icon />
                        </Fab>
                      </Grid>
                    </Grid>
                  ))}
                  <Box sx={{width:"100%",display:"flex",justifyContent:"end",}}>
                    <Fab color="primary" aria-label="add" onClick={() => append({ nome: "", data_nascimento: "", cpf: "", tipo: "" })}>
                      <AddIcon />
                    </Fab>
                  </Box>
                </Box>
              {/* </TabPanel> */}
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default CadastroColaborador;
