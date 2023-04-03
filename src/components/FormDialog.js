import React, { useState, useEffect, useContext } from "react";
import ContextAPI from "../ContextAPI/ContextAPI";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import axios from "axios";
// import './FormDialog.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  formatToCEP,
  isCEP,
  formatToCPFOrCNPJ,
  isCPFOrCNPJ,
  formatToPhone,
  isPhone,
} from "brazilian-values";


export default function FormDialog(props) {
  const [editValues, setEditValues] = useState();
  const [testPhone, setTestPhone] = useState(false)
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState('')
  const { reloadData, setReloadData } = useContext(ContextAPI);

// No carregamento do componente, seta os valores do cliente para o estado
useEffect(() => {
  // Valores a serem editados:
  // admissao, agencia, aposentado, bairro, banco, cargaHoraria, cargo, cbo, ccusto, celular, cep, cestaBasica, cidade, cnh, cnh_categoria, cnh_validade, cod_cargo, cod_ccusto, cod_esocial, conta, contrato_experiencia, cor, cpf, data_expedicao, data_nascimento, demissao, descAgencia, email, escala, estado, estado_civil, experiencia_anterior, graduacao, grau_instrucao, hab_emissao, id, insalubridade, linhaVT, matricula, motivo_demissao, naturalidade, necessidade_especial, nome, nome_mae, nome_outra_empresa, nome_pai, numero, orgao_rg, pcd, pis, planoOdonto, planoSaude, quantidadeVT, refeitorio, registro, reservista, residencia_adquirida_fgts, residencia_propria, rg, rua, salario, secao_eleitoral, sexo, situacao, telefone, tem_outro_emprego, tipo_conta, titulo_eleitoral, uf_rg, zona_eleitoral.
    setEditValues({
      id: props.dialog.id,
      admissao: props.dialog.admissao,
      demissao: props.dialog.demissao,
      agencia: props.dialog.agencia,
      bairro: props.dialog.bairro,
      cargaHoraria: props.dialog.cargaHoraria,
      cargo: props.dialog.cargo,
      cbo: props.dialog.cbo,
      ccusto: props.dialog.ccusto,
      celular: props.dialog.celular,
      cep: props.dialog.cep,
      cestaBasica: props.dialog.cestaBasica,
      cidade: props.dialog.cidade,
      conta: props.dialog.conta,
      contrato_experiencia: props.dialog.contrato_experiencia,
      cor: props.dialog.cor,
      cpf: props.dialog.cpf,
      data_expedicao: props.dialog.data_expedicao,
      data_nascimento: props.dialog.data_nascimento,
      descAgencia: props.dialog.descAgencia,
      email: props.dialog.email,
      escala: props.dialog.escala,
      estado: props.dialog.estado,
      estado_civil: props.dialog.estado_civil,
      experiencia_anterior: props.dialog.experiencia_anterior,
      graduacao: props.dialog.graduacao,
      grau_instrucao: props.dialog.grau_instrucao,
      hab_emissao: props.dialog.hab_emissao,
      insalubridade: props.dialog.insalubridade,
      linhaVT: props.dialog.linhaVT,
      matricula: props.dialog.matricula,
      motivo_demissao: props.dialog.motivo_demissao,
      naturalidade: props.dialog.naturalidade,
      necessidade_especial: props.dialog.necessidade_especial,
      nome: props.dialog.nome,
      nome_mae: props.dialog.nome_mae,
      nome_outra_empresa: props.dialog.nome_outra_empresa,
      nome_pai: props.dialog.nome_pai,
      numero: props.dialog.numero,
      orgao_rg: props.dialog.orgao_rg,
      pcd: props.dialog.pcd,
      pis: props.dialog.pis,
      planoOdonto: props.dialog.planoOdonto,
      planoSaude: props.dialog.planoSaude,
      quantidadeVT: props.dialog.quantidadeVT,
      refeitorio: props.dialog.refeitorio,
      registro: props.dialog.registro,
      reservista: props.dialog.reservista,
      residencia_adquirida_fgts: props.dialog.residencia_adquirida_fgts,
      residencia_propria: props.dialog.residencia_propria,
      rg: props.dialog.rg,
      rua: props.dialog.rua,
      salario: props.dialog.salario,
      secao_eleitoral: props.dialog.secao_eleitoral,
      sexo: props.dialog.sexo,
      situacao: props.dialog.situacao,
      telefone: props.dialog.telefone,
      tem_outro_emprego: props.dialog.tem_outro_emprego,
      tipo_conta: props.dialog.tipo_conta,
      titulo_eleitoral: props.dialog.titulo_eleitoral,
      uf_rg: props.dialog.uf_rg,
      zona_eleitoral: props.dialog.zona_eleitoral,      

    });
    
}, [props]);
  
const handleChangeValues = (values) => {
  setEditValues((prevValues) => ({
    ...prevValues,
    [values.target.id]: values.target.value,
  }));
};

  const handleClose = () => {
    props.setOpen(false);
    setReloadData(!reloadData);
  };

  const handleEditClient = () => {
    
    axios.put(`${process.env.REACT_APP_URL}/api/handleClass.php?p=4`, {
      id: editValues.id,
      admissao: editValues.admissao,
      demissao: editValues.demissao,
      agencia: editValues.agencia,
      bairro: editValues.bairro,
      cargaHoraria: editValues.cargaHoraria,
      cargo: editValues.cargo,
      cbo: editValues.cbo,
      ccusto: editValues.ccusto,
      celular: editValues.celular,
      cep: editValues.cep,
      cestaBasica: editValues.cestaBasica,
      cidade: editValues.cidade,
      conta: editValues.conta,
      contrato_experiencia: editValues.contrato_experiencia,
      cor: editValues.cor,
      cpf: editValues.cpf,
      data_expedicao: editValues.data_expedicao,
      data_nascimento: editValues.data_nascimento,
      descAgencia: editValues.descAgencia,
      email: editValues.email,
      escala: editValues.escala,
      estado: editValues.estado,
      estado_civil: editValues.estado_civil,
      experiencia_anterior: editValues.experiencia_anterior,
      graduacao: editValues.graduacao,
      grau_instrucao: editValues.grau_instrucao,
      hab_emissao: editValues.hab_emissao,
      insalubridade: editValues.insalubridade,
      linhaVT: editValues.linhaVT,
      matricula: editValues.matricula,
      motivo_demissao: editValues.motivo_demissao,
      naturalidade: editValues.naturalidade,
      necessidade_especial: editValues.necessidade_especial,
      nome: editValues.nome,
      nome_mae: editValues.nome_mae,
      nome_outra_empresa: editValues.nome_outra_empresa,
      nome_pai: editValues.nome_pai,
      numero: editValues.numero,
      orgao_rg: editValues.orgao_rg,
      pcd: editValues.pcd,
      pis: editValues.pis,
      planoOdonto: editValues.planoOdonto,
      planoSaude: editValues.planoSaude,
      quantidadeVT: editValues.quantidadeVT,
      refeitorio: editValues.refeitorio,
      registro: editValues.registro,
      reservista: editValues.reservista,
      residencia_adquirida_fgts: editValues.residencia_adquirida_fgts,
      residencia_propria: editValues.residencia_propria,
      rg: editValues.rg,
      rua: editValues.rua,
      salario: editValues.salario,
      secao_eleitoral: editValues.secao_eleitoral,
      sexo: editValues.sexo,
      situacao: editValues.situacao,
      telefone: editValues.telefone,
      tem_outro_emprego: editValues.tem_outro_emprego,
      tipo_conta: editValues.tipo_conta,
      titulo_eleitoral: editValues.titulo_eleitoral,
      uf_rg: editValues.uf_rg,
      zona_eleitoral: editValues.zona_eleitoral,      
    }).then(() => {
      props.setColaboradores(
        props.colaboradores?.map((value) => {
          return value.id === editValues.id
            ? {
              id: editValues.id,
              admissao: editValues.admissao,
              demissao: editValues.demissao,
              agencia: editValues.agencia,
              bairro: editValues.bairro,
              cargaHoraria: editValues.cargaHoraria,
              cargo: editValues.cargo,
              cbo: editValues.cbo,
              ccusto: editValues.ccusto,
              celular: editValues.celular,
              cep: editValues.cep,
              cestaBasica: editValues.cestaBasica,
              cidade: editValues.cidade,
              conta: editValues.conta,
              contrato_experiencia: editValues.contrato_experiencia,
              cor: editValues.cor,
              cpf: editValues.cpf,
              data_expedicao: editValues.data_expedicao,
              data_nascimento: editValues.data_nascimento,
              descAgencia: editValues.descAgencia,
              email: editValues.email,
              escala: editValues.escala,
              estado: editValues.estado,
              estado_civil: editValues.estado_civil,
              experiencia_anterior: editValues.experiencia_anterior,
              graduacao: editValues.graduacao,
              grau_instrucao: editValues.grau_instrucao,
              hab_emissao: editValues.hab_emissao,
              insalubridade: editValues.insalubridade,
              linhaVT: editValues.linhaVT,
              matricula: editValues.matricula,
              motivo_demissao: editValues.motivo_demissao,
              naturalidade: editValues.naturalidade,
              necessidade_especial: editValues.necessidade_especial,
              nome: editValues.nome,
              nome_mae: editValues.nome_mae,
              nome_outra_empresa: editValues.nome_outra_empresa,
              nome_pai: editValues.nome_pai,
              numero: editValues.numero,
              orgao_rg: editValues.orgao_rg,
              pcd: editValues.pcd,
              pis: editValues.pis,
              planoOdonto: editValues.planoOdonto,
              planoSaude: editValues.planoSaude,
              quantidadeVT: editValues.quantidadeVT,
              refeitorio: editValues.refeitorio,
              registro: editValues.registro,
              reservista: editValues.reservista,
              residencia_adquirida_fgts: editValues.residencia_adquirida_fgts,
              residencia_propria: editValues.residencia_propria,
              rg: editValues.rg,
              rua: editValues.rua,
              salario: editValues.salario,
              secao_eleitoral: editValues.secao_eleitoral,
              sexo: editValues.sexo,
              situacao: editValues.situacao,
              telefone: editValues.telefone,
              tem_outro_emprego: editValues.tem_outro_emprego,
              tipo_conta: editValues.tipo_conta,
              titulo_eleitoral: editValues.titulo_eleitoral,
              uf_rg: editValues.uf_rg,
              zona_eleitoral: editValues.zona_eleitoral,   
              }
            : value;
        })
      );
    });
    handleClose();
  };

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
console.log(props.dialog)
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle sx={{display: 'flex', alignItems: 'center'}} id="form-dialog-title">Editar dados do colaborador <ManageAccountsIcon sx={{marginLeft: '10px'}} /></DialogTitle>
        <DialogContent sx={{display: 'flex', flexWrap: 'wrap'}}>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '20%', lg: '10%', xl: '10%' }, margin: '5px'}} variant="standard" disabled margin="dense" id="matricula" label="Matricula" defaultValue={props.dialog.matricula} type="text" />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} variant="standard" autoFocus margin="dense" id="nome" label="Nome" defaultValue={props.dialog.nome} type="text" onChange={handleChangeValues} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cpf" label="CPF" variant="standard" defaultValue={props.dialog.cpf} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="pis" label="PIS" variant="standard" defaultValue={props.dialog.pis} onChange={handleChangeValues}/>  
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="rg" label="RG" variant="standard" defaultValue={props.dialog.rg} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="data_nascimento" label="Data de nascimento" variant="standard" type='date' defaultValue={props.dialog.data_nascimento} onChange={handleChangeValues} InputLabelProps={{ shrink: true }} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="telefone" label="Telefone" variant="standard" defaultValue={props.dialog.telefone} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="celular" label="Celular" variant="standard" defaultValue={props.dialog.celular} onChange={handleChangeValues} onKeyUp={(event)=>handleFormatPhone(event)} onClick={(event)=>handleFormatPhone(event)}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="email" label="E-mail" variant="standard" defaultValue={props.dialog.email} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cep" label="CEP" variant="standard" defaultValue={props.dialog.cep} onKeyUp={(event) => handleFormatCep(event)} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} id="rua" label="Rua" variant="standard" defaultValue={props.dialog.rua?endereco.logradouro:''} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '30%', sm: '30%', md: '20%', lg: '10%', xl: '10%' } , margin: '5px'}} id="numero" label="Numero" variant="standard" defaultValue={props.dialog.numero} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="bairro" label="Bairro" variant="standard" defaultValue={props.dialog.bairro} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} id="cidade" label="Cidade" variant="standard" defaultValue={props.dialog.cidade} onChange={handleChangeValues}/>
            <Autocomplete isOptionEqualToValue={(option, value) => option === value} disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="estado" value={props.dialog.estado} options={estadosBrasileiros} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Estado"  />} />
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' } , margin: '5px'}} id="salario" label="Salário" variant="standard" defaultValue={props.dialog.salario} onChange={handleChangeValues}/>            
            <Autocomplete isOptionEqualToValue={(option, value) => option === value} disablePortal sx={{width: { xs: '100%', sm: '48%', md: '48%', lg: '30%', xl: '30%' } , margin: '5px'}} id="cargo" value={props.dialog.cargo} options={cargos} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Cargo"  />} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="registro" label="Registro" variant="standard" defaultValue={props.dialog.registro} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cbo" label="CBO" variant="standard" defaultValue={props.dialog.cbo} onChange={handleChangeValues}/>
            <Autocomplete isOptionEqualToValue={(option, value) => option === value} disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="ccusto" value={props.dialog.ccusto} options={ccusto} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Centro de Custo"  />} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} id="admissao" label="Data de admissão" variant="standard" type='date' defaultValue={props.dialog.admissao} onChange={handleChangeValues} InputLabelProps={{ shrink: true }} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} id="demissao" label="Data de demissão" variant="standard" type='date' defaultValue={props.dialog.demissao} onChange={handleChangeValues} InputLabelProps={{ shrink: true }} />
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="agencia" label="Agência" variant="standard" defaultValue={props.dialog.agencia} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="conta" label="Conta" variant="standard" defaultValue={props.dialog.conta} onChange={handleChangeValues}/>
            <Autocomplete isOptionEqualToValue={(option, value) => option === value} disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="tipo_conta" value={props.dialog.tipoConta} options={tipoConta} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Tipo de Conta"  />} />
            <Autocomplete isOptionEqualToValue={(option, value) => option === value} disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="situacao" value={props.dialog.situacao} options={situacao} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Situação"  />} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} id="descAgencia" label="Descrição da Agência" variant="standard" defaultValue={props.dialog.descAgencia} onChange={handleChangeValues}/>
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} id="escala" label="Escala" variant="standard" defaultValue={props.dialog.escala} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '48%', lg: '48%', xl: '48%' } , margin: '5px'}} id="cargaHoraria" label="Carga Horária" variant="standard" defaultValue={props.dialog.cargaHoraria} onChange={handleChangeValues}/>
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="linhaVT" label="Linha VT" variant="standard" defaultValue={props.dialog.linhaVT} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="quantidadeVT" label="Quantidade VT / dia" variant="standard" defaultValue={props.dialog.quantidadeVT} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="planoSaude" label="Plano de Saúde" variant="standard" defaultValue={props.dialog.planoSaude} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="planoOdonto" label="Plano Odonto" variant="standard" defaultValue={props.dialog.planoOdonto} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cestaBasica" label="Cesta Básica" variant="standard" defaultValue={props.dialog.cestaBasica} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="refeitorio" label="Refeitório" variant="standard" defaultValue={props.dialog.refeitorio} onChange={handleChangeValues}/>
            
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="sexo" label="Sexo" variant="standard" defaultValue={props.dialog.sexo} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="nome_mae" label="Nome da Mãe" variant="standard" defaultValue={props.dialog.nome_mae} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="nome_pai" label="Nome do Pai" variant="standard" defaultValue={props.dialog.nome_pai} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cor" label="Cor" variant="standard" defaultValue={props.dialog.cor} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="estado_civil" label="Estado Civil" variant="standard" defaultValue={props.dialog.estado_civil} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="naturalidade" label="Naturalidade" variant="standard" defaultValue={props.dialog.naturalidade} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="escolaridade" label="Escolaridade" variant="standard" defaultValue={props.dialog.escolaridade} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="graduacao" label="Graduação" variant="standard" defaultValue={props.dialog.graduacao} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="residencia_propria" label="Residência Própria" variant="standard" defaultValue={props.dialog.residencia_propria} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="residencia_adquirida_fgts" label="Adquirido FGTS" variant="standard" defaultValue={props.dialog.residencia_adquirida_fgts} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="orgao_rg" label="RG Órgão Emissor" variant="standard" defaultValue={props.dialog.rg_orgao_emissor} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="data_expedicao" label="RG Data Emissão" variant="standard" defaultValue={props.dialog.rg_data_emissao} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="aposentado" label="Aposentado" variant="standard" defaultValue={props.dialog.aposentado} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cnh" label="CNH" variant="standard" defaultValue={props.dialog.cnh} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cnh_categoria" label="CNH Categoria" variant="standard" defaultValue={props.dialog.cnh_categoria} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="cnh_validade" label="CNH Validade" variant="standard" defaultValue={props.dialog.cnh_validade} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="hab_emissao" label="CNH Emissão" variant="standard" defaultValue={props.dialog.cnh_emissao} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="titulo_eleitoral" label="Título Eleitoral" variant="standard" defaultValue={props.dialog.titulo_eleitoral} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="zona_eleitoral" label="Zona Eleitoral" variant="standard" defaultValue={props.dialog.zona_eleitoral} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="secao_eleitoral" label="Seção Eleitoral" variant="standard" defaultValue={props.dialog.secao_eleitoral} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="reservista" label="Reservista" variant="standard" defaultValue={props.dialog.reservista} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="contrato_experiencia" label="Contrato Experiência" variant="standard" defaultValue={props.dialog.contrato_experiencia} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="insalubridade" label="Insalubridade" variant="standard" defaultValue={props.dialog.insalubridade} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="experiencia_anterior" label="Experiência Anterior" variant="standard" defaultValue={props.dialog.experiencia_anterior} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="tem_outro_emprego" label="Tem Outro Emprego" variant="standard" defaultValue={props.dialog.tem_outro_emprego} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="nome_outra_empresa" label="Nome da outra Empresa" variant="standard" defaultValue={props.dialog.nome_outra_empresa} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="pcd" label="PCD" variant="standard" defaultValue={props.dialog.pcd} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="necessidade_especial" label="Qual a necessidade especial" variant="standard" defaultValue={props.dialog.necessidade_especial} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} id="banco" label="Banco" variant="standard" defaultValue={props.dialog.banco} onChange={handleChangeValues}/>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>          
          <Button color="primary" onClick={() => handleEditClient()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>    
    </div>
  );
}

