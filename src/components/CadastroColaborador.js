import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { cargos, estadosBrasileiros, uf, ccusto, tipoConta, situacao, raca, estado_civil } from '../content-options.js';

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
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

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
      
        
          <Box sx={{width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center"}} >
            <Box sx={{ width: "100%" }}>             
                <Typography sx={{ width: "100%" }} variant="h6" color="text.primary" gutterBottom >CADASTRO DE COLABORADOR</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '12px', justifyContent: 'center' }}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Card elevation={3} sx={{width: '30%', minWidth: '380px', background: '#fff'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                            <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center' }} variant="h6" color="text.primary" gutterBottom >Dados Pessoais <PersonIcon /></Typography>
                            <TextField {...register("nome")} sx={{ width: '100%'}} name="nome" label="Nome" variant="outlined" size="small" required />
                            <TextField {...register("data_nascimento")} sx={{width: '100%'}} name="data_nascimento" label="Data de nascimento" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />
                            <FormControl component="fieldset">
                            <FormLabel sx={{fontSize: '12px',margin: '0'}} id="genero">Gênero</FormLabel>                    
                              <RadioGroup row aria-labelledby="sexo" name="sexo">
                                <FormControlLabel name="sexo" {...register("sexo")} value="feminino" control={<Radio />} label="Feminino" />
                                <FormControlLabel name="sexo" {...register("sexo")} value="masculino" control={<Radio />} label="Masculino" />
                                <FormControlLabel name="sexo" {...register("sexo")} value="outro" control={<Radio />} label="Outro" />
                              </RadioGroup>
                            </FormControl>
                            <TextField {...register("cpf")} name="cpf" label="CPF" variant="outlined" size="small" color={testCpfOrCnpj === true ? "success" : ""} onKeyUp={(event) => handleFormatCpf(event)} required />
 
                            <TextField {...register("nome_mae")}  ame="nome_mae" label="Nome da mãe" variant="outlined" size="small"  />
                            <TextField {...register("nome_pai")} name="nome_pai" label="Nome do pai" variant="outlined" size="small" />
                            <TextField {...register("naturalidade")} name="naturalidade" label="Naturalidade" variant="outlined" size="small" />

                            <Autocomplete size="small" disablePortal  name="estado_civil" options={estado_civil} renderInput={(params) => (   
                              <TextField {...register("estado_civil")} variant="outlined" size="small" {...params}  label="Estado Civil"   /> 
                            )} /> 
                             <Autocomplete size="small" disablePortal name="cor" options={raca} renderInput={(params) => (
                              <TextField {...register("cor")} variant="outlined" size="small" {...params} label="Raça / Cor" /> 
                            )} />
                        </CardContent>
                    </Card>
                    <Card elevation={3} sx={{width: '30%', minWidth: '380px', background: '#fff'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center'}} variant="h6" color="text.primary" gutterBottom >Documentação <ArticleIcon /></Typography>
                        <TextField {...register("rg")} name="rg" label="RG" variant="outlined" size="small" />
                            <Autocomplete size="small" disablePortal name="uf_rg" options={uf} renderInput={(params) => (
                                <TextField {...register("uf_rg")} variant="outlined" size="small" {...params} label="UF RG" />
                            )}/>
                            <TextField {...register("orgao_rg")}  name="orgao_rg" label="Orgão Emissor" variant="outlined" size="small" />
                            <TextField {...register("data_expedicao")}  name="data_expedicao" label="Data da Emissão" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />
                            <TextField {...register("pis")} name="pis" label="PIS" variant="outlined" size="small" />
                            <TextField {...register("cnh")}  name="cnh" label="CNH" variant="outlined" size="small"/>
                            <TextField {...register("cnh_categoria")} name="cnh_categoria" label="Cat. Habilit" variant="outlined" size="small" />
                            <TextField {...register("cnh_validade")} name="cnh_validade" label="Validade CNH" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }}/>
                            <TextField {...register("hab_emissao")}  name="hab_emissao" label="Emissão CNH" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />
                            <TextField {...register("titulo_eleitoral")}  name="titulo_eleitoral" label="Título Eleitoral" variant="outlined" size="small" />
                            <TextField {...register("zona_eleitoral")}  name="zona_eleitoral" label="Zona Eleitoral" variant="outlined" size="small" />
                            <TextField {...register("secao_eleitoral")}  name="secao_eleitoral" label="Sessão Eleitoral" variant="outlined" size="small" />
                            <TextField {...register("reservista")} name="reservista" label="Reservista" variant="outlined" size="small"/>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Card elevation={3} sx={{width: '30%', minWidth: '380px', background: '#fff'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                            <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center'}} variant="h6" color="text.primary" gutterBottom >Contato e Endereço <HomeIcon /></Typography>                            
                            <TextField {...register("telefone")} name="telefone" label="Telefone" variant="outlined" size="small" color={testPhone === true ? "success" : ""} onKeyUp={(event) => handleFormatPhone(event)} />
                            <TextField {...register("celular")} name="celular" label="Celular" variant="outlined" size="small" color={testPhone === true ? "success" : ""} onKeyUp={(event) => handleFormatPhone(event)} />
                            <TextField {...register("email")} name="email" label="E-mail" variant="outlined" size="small" />
                            <TextField {...register("cep")} name="cep" label="CEP" variant="outlined" size="small" onKeyUp={(event) => handleFormatCep(event)}/>
                            <TextField {...register("rua")} name="rua" label="Rua" variant="outlined" size="small" value={endereco.logradouro || ""} />
                            <TextField {...register("numero")} name="numero" label="Número" variant="outlined" size="small" />
                            <TextField {...register("bairro")} name="bairro" label="Bairro" variant="outlined" size="small" value={endereco.bairro || ""}/>
                            <TextField {...register("cidade")} name="cidade" label="Cidade" variant="outlined" size="small" value={endereco.localidade || ""}/>
                            <Autocomplete size="small" disablePortal name="estado" value={endereco.uf ? handleSetEstado(endereco.uf) : ""} options={estadosBrasileiros} renderInput={(params) => (
                                <TextField variant="outlined" {...register("estado")} {...params} label="Estado" />
                              )}/>
                            <TextField {...register("residencia_propria")} name="residencia_propria" label="Residência Própria" variant="outlined" size="small"/>
                            <TextField {...register("residencia_adquirida_fgts")} name="residencia_adquirida_fgts" label="Adquirido com FGTS" variant="outlined" size="small" />



                        </CardContent>
                    </Card>
                    <Card elevation={3} sx={{width: '30%', minWidth: '380px', background: '#fff'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                            <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center' }} variant="h6" color="text.primary" gutterBottom >Formação Acadêmica <SchoolIcon /></Typography>
                            <TextField {...register("grau_instrucao")} name="grau_instrucao" label="Grau de instrução" variant="outlined" size="small"  />
                            <TextField {...register("graduacao")} name="graduacao" label="Graduação" variant="outlined" size="small" />
                            <TextField {...register("registro")} name="registro" label="Registro" variant="outlined" size="small"/>

                        </CardContent>
                        </Card>
                        <Card elevation={3} sx={{width: '30%', minWidth: '380px', background: '#fff'}}>
                            <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center' }} variant="h6" color="text.primary" gutterBottom >Experiência Profissional <WorkHistoryIcon /></Typography>
                                <TextField {...register("experiencia_anterior")} name="experiencia_anterior" label="Experiência Anterior" variant="outlined" size="small"/>
                                <TextField {...register("tem_outro_emprego")} name="tem_outro_emprego" label="Tem outro emprego?" variant="outlined" size="small"/>
                                <TextField {...register("nome_outra_empresa")} name="nome_outra_empresa" label="Nome da outra empresa" variant="outlined" size="small"/>
                                <TextField {...register("aposentado")} name="aposentado" label="Aposentado" variant="outlined" size="small" />

                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Card elevation={3} sx={{width: '30%', minWidth: '380px', background: '#fff'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                          <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center' }} variant="h6" color="text.primary" gutterBottom >Dados do Contrato <BadgeIcon /></Typography>
                          <TextField {...register("admissao")} name="admissao" label="Data de admissão" variant="outlined" size="small" type="date" InputLabelProps={{shrink: true }} />
                          <Autocomplete size="small" disablePortal name="cargo" options={cargos} renderInput={(params) => (
                              <TextField {...register("cargo")} variant="outlined" size="small" {...params} label="Cargo"/>
                            )}/>
                          <TextField {...register("cod_cargo")} name="cod_cargo" label="Código do Cargo" variant="outlined" size="small" />


                          <TextField onKeyUp={(event) => handleFormatCurrency(event)} {...register("salario")} name="salario" label="Salário" variant="outlined" size="small"/>
                          <TextField {...register("contrato_experiencia")} name="contrato_experiencia" label="Contrato de Experiência" variant="outlined" size="small"/>
                          <Autocomplete size="small" disablePortal name="ccusto" options={ccusto} renderInput={(params) => (
                              <TextField {...register("ccusto")} variant="outlined" size="small" {...params} label="Centro de Custo" />
                            )}/>
                          <TextField {...register("cod_ccusto")} name="cod_ccusto" label="Código do Centro de Custo" variant="outlined" size="small"/>
                          <TextField {...register("cbo")} name="cbo" label="CBO" variant="outlined" size="small"/>
                          <FormControl component="fieldset">
                            <FormLabel sx={{fontSize: '12px',margin: '0'}} id="insalubridade">Adicional de insalubridade</FormLabel>
                            <RadioGroup row aria-labelledby="insalubridade" name="insalubridade">
                              <FormControlLabel name="insalubridade" {...register("insalubridade")} value="sim" control={<Radio />} label="Sim"/>
                              <FormControlLabel name="insalubridade" {...register("insalubridade")} value="nao" control={<Radio/>} label="Não"/>
                            </RadioGroup>
                          </FormControl>
                          <TextField {...register("pcd")} name="pcd" label="Portador de necessidades especiais " variant="outlined" size="small"/>
                          <TextField {...register("necessidade_especial")} name="necessidade_especial" label="Necessidade especial" variant="outlined" size="small"/>
                          <TextField {...register("escala")} name="escala" label="Escala" variant="outlined" size="small"/>
                          <TextField {...register("cargaHoraria")} name="cargaHoraria" label="Carga Horária" variant="outlined" size="small"/>
                          <TextField {...register("linhaVT")} name="linhaVT" label="Linha VT" variant="outlined" size="small"/>
                          <TextField {...register("quantidadeVT")} name="quantidadeVT" label="Quantidade VT / dia" variant="outlined" size="small" />
                          <TextField {...register("planoSaude")} name="planoSaude" label="Plano de saúde" variant="outlined" size="small"/>
                          <TextField {...register("planoOdonto")} name="planoOdonto" label="Plano Odonto" variant="outlined" size="small"/>


                          <TextField {...register("cestaBasica")} name="cestaBasica" label="Cesta Básica" variant="outlined" size="small"/>
                          <TextField {...register("refeitorio")} name="refeitorio" label="Refeitório" variant="outlined" size="small"/>
                        </CardContent>
                      </Card>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      <Card elevation={3} sx={{width: '30%', minWidth: '380px', background: '#fff'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                          <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center'}} variant="h6" color="text.primary" gutterBottom >Dados Bancários <AccountBalanceIcon /></Typography>
                          <TextField {...register("banco")} name="banco" label="Banco" variant="outlined" size="small"/>
                          <TextField {...register("agencia")} name="agencia" label="Agência" variant="outlined" size="small"/>
                          <TextField {...register("conta")} name="conta" label="Conta" variant="outlined" size="small"/>
                          <Autocomplete size="small" disablePortal name="tipo_conta" options={tipoConta} renderInput={(params) => (
                              <TextField {...register("tipo_conta")} variant="outlined" size="small" {...params} label="Tipo de conta"/>
                            )}/>
                          <Autocomplete size="small" disablePortal name="situacao" options={situacao} renderInput={(params) => (
                              <TextField {...register("situacao")} variant="outlined" size="small" {...params} label="Situação"/>
                            )}/>
                          <TextField {...register("descAgencia")} name="descAgencia" label="Descrição da agência" variant="outlined" size="small" />
                        </CardContent>
                      </Card>                      
                    </Box>
 
                </Box>

            </Box>
            <Box sx={{width: '90%', margin: '30px auto'}}>
              <Card elevation={3} sx={{width: '100%'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '8px', background: '#fff'}}>
                <Typography sx={{ width: "100%", display: 'flex', alignItems: 'center' }} variant="h6" color="text.primary" gutterBottom >Dependentes <FamilyRestroomIcon/></Typography>
                  {fields.map((field, index) => (
                    <Grid key={field.id} container spacing={2}>
                      <Grid item xs={4}>
                        <TextField {...register(`dependentes.${index}.nome`)} label="Nome" variant="outlined" fullWidth sx={{ margin: "5px" }} size="small"/>
                      </Grid>
                      <Grid item xs={1}>
                        <TextField {...register(`dependentes.${index}.data_nascimento`)} label="Data de nascimento" variant="outlined" fullWidth sx={{ margin: "5px" }} size="small" type="date" InputLabelProps={{ shrink: true }}/>
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
                </CardContent>
              </Card>
            </Box>
          </Box>
        
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </CardActions>
      
    </form>
  );
};

export default CadastroColaborador;
