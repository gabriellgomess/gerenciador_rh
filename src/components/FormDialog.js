import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import FormControl from "@mui/material/FormControl";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
// import './FormDialog.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { formatToCEP, isCEP, formatToCPFOrCNPJ, isCPFOrCNPJ, formatToPhone, isPhone } from 'brazilian-values';


export default function FormDialog(props) {
  const [editValues, setEditValues] = useState();
  const [testPhone, setTestPhone] = useState(false)

// No carregamento do componente, seta os valores do cliente para o estado
useEffect(() => {
    setEditValues({
        id: props.dialog.id,
        admissao: props.dialog.admissao,
        agencia: props.dialog.agencia,
        bairro: props.dialog.bairro,
        cargaHoraria: props.dialog.cargaHoraria,
        cargo: props.dialog.cargo,
        cbo: props.dialog.cbo,
        cccusto: props.dialog.cccusto,
        celular: props.dialog.celular,
        cep: props.dialog.cep,
        cestaBrasica: props.dialog.cestaBrasica,
        cidade: props.dialog.cidade,
        conta: props.dialog.conta,
        cpf: props.dialog.cpf,
        data_criacao: props.dialog.data_criacao,
        descAgencia: props.dialog.descAgencia,
        email: props.dialog.email,
        escala: props.dialog.escala,
        estado: props.dialog.estado,
        linhaVT: props.dialog.linhaVT,
        matricula: props.dialog.matricula,
        nascimento: props.dialog.nascimento,
        nome: props.dialog.nome,
        numero: props.dialog.numero,
        pis: props.dialog.pis,
        planoOdonto: props.dialog.planoOdonto,
        planoSaude: props.dialog.planoSaude,
        quantidadeVT: props.dialog.quantidadeVT,
        refeitorio: props.dialog.refeitorio,
        registro: props.dialog.registro,
        rg: props.dialog.rg,
        rua: props.dialog.rua,
        salario: props.dialog.salario,
        situacao: props.dialog.situacao,
        telefone: props.dialog.telefone,
        tipoConta: props.dialog.tipoConta
    });
    
}, [props]);



  
const handleChangeValues = (values) => {
  setEditValues((prevValues) => ({
    ...prevValues,
    [values.target.id]: values.target.value,
  }));
  console.log("HandleChangeValues: ",values.target.value);
};

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditClient = () => {
    
    axios.put(`https://gabriellgomess.com/gerenciador_rh/update.php`, {
        id: editValues.id,
        admissao: editValues.admissao,
        agencia: editValues.agencia,
        bairro: editValues.bairro,
        cargaHoraria: editValues.cargaHoraria,
        cargo: editValues.cargo,
        cbo: editValues.cbo,
        cccusto: editValues.cccusto,
        celular: editValues.celular,
        cep: editValues.cep,
        cestaBrasica: editValues.cestaBrasica,
        cidade: editValues.cidade,
        conta: editValues.conta,
        cpf: editValues.cpf,
        data_criacao: editValues.data_criacao,
        descAgencia: editValues.descAgencia,
        email: editValues.email,
        escala: editValues.escala,
        estado: editValues.estado,
        linhaVT: editValues.linhaVT,
        matricula: editValues.matricula,
        nascimento: editValues.nascimento,
        nome: editValues.nome,
        numero: editValues.numero,
        pis: editValues.pis,
        planoOdonto: editValues.planoOdonto,
        planoSaude: editValues.planoSaude,
        quantidadeVT: editValues.quantidadeVT,
        refeitorio: editValues.refeitorio,
        registro: editValues.registro,
        rg: editValues.rg,
        rua: editValues.rua,
        salario: editValues.salario,
        situacao: editValues.situacao,
        telefone: editValues.telefone,
        tipoConta: editValues.tipoConta
    }).then(() => {
      props.setColaboradores(
        props.colaboradores?.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                admissao: editValues.admissao,
                agencia: editValues.agencia,
                bairro: editValues.bairro,
                cargaHoraria: editValues.cargaHoraria,
                cargo: editValues.cargo,
                cbo: editValues.cbo,
                cccusto: editValues.cccusto,
                celular: editValues.celular,
                cep: editValues.cep,
                cestaBrasica: editValues.cestaBrasica,
                cidade: editValues.cidade,
                conta: editValues.conta,
                cpf: editValues.cpf,
                data_criacao: editValues.data_criacao,
                descAgencia: editValues.descAgencia,
                email: editValues.email,
                escala: editValues.escala,
                estado: editValues.estado,
                linhaVT: editValues.linhaVT,
                matricula: editValues.matricula,
                nascimento: editValues.nascimento,
                nome: editValues.nome,
                numero: editValues.numero,
                pis: editValues.pis,
                planoOdonto: editValues.planoOdonto,
                planoSaude: editValues.planoSaude,
                quantidadeVT: editValues.quantidadeVT,
                refeitorio: editValues.refeitorio,
                registro: editValues.registro,
                rg: editValues.rg,
                rua: editValues.rua,
                salario: editValues.salario,
                situacao: editValues.situacao,
                telefone: editValues.telefone,
                tipoConta: editValues.tipoConta
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
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} className="input--edit" variant="standard" autoFocus margin="dense" id="name" label="Nome" defaultValue={props.dialog.nome} type="text" onChange={handleChangeValues} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cpf" label="CPF" variant="standard" defaultValue={props.dialog.cpf} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="pis" label="PIS" variant="standard" defaultValue={props.dialog.pis} onChange={handleChangeValues}/>  
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="rg" label="RG" variant="standard" defaultValue={props.dialog.rg} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="nascimento" label="Data de nascimento" variant="standard" type='date' defaultValue={props.dialog.nascimento} onChange={handleChangeValues} InputLabelProps={{ shrink: true }} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="telefone" label="Telefone" variant="standard" defaultValue={props.dialog.telefone} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="celular" label="Celular" variant="standard" defaultValue={props.dialog.celular} onChange={handleChangeValues} onKeyUp={(event)=>handleFormatPhone(event)} onClick={(event)=>handleFormatPhone(event)}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="email" label="E-mail" variant="standard" defaultValue={props.dialog.email} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cep" label="CEP" variant="standard" defaultValue={props.dialog.cep} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="rua" label="Rua" variant="standard" defaultValue={props.dialog.rua} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '30%', sm: '30%', md: '20%', lg: '10%', xl: '10%' } , margin: '5px'}} name="numero" label="Numero" variant="standard" defaultValue={props.dialog.numero} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="bairro" label="Bairro" variant="standard" defaultValue={props.dialog.bairro} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="cidade" label="Cidade" variant="standard" defaultValue={props.dialog.cidade} onChange={handleChangeValues}/>
            <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="estado" value={props.dialog.estado} options={estadosBrasileiros} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Estado"  />} />
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' } , margin: '5px'}} name="salario" label="Salário" variant="standard" defaultValue={props.dialog.salario} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cargo" label="Cargo" variant="standard" defaultValue={props.dialog.cargo} onChange={handleChangeValues}/>
            <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="estado" value={props.dialog.estado} options={cargos} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Estado"  />} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="registro" label="Registro" variant="standard" defaultValue={props.dialog.registro} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cbo" label="CBO" variant="standard" defaultValue={props.dialog.cbo} onChange={handleChangeValues}/>
            <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="ccusto" value={props.dialog.ccusto} options={ccusto} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Centro de Custo"  />} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} name="admissao" label="Data de admissão" variant="standard" type='date' defaultValue={props.dialog.admissao} onChange={handleChangeValues} InputLabelProps={{ shrink: true }} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '48%', lg: '20%', xl: '20%' }, margin: '5px'}} name="demissao" label="Data de demissão" variant="standard" type='date' defaultValue={props.dialog.demissao} onChange={handleChangeValues} InputLabelProps={{ shrink: true }} />
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="agencia" label="Agência" variant="standard" defaultValue={props.dialog.agencia} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="conta" label="Conta" variant="standard" defaultValue={props.dialog.conta} onChange={handleChangeValues}/>
            <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="tipoConta" value={props.dialog.tipoConta} options={ccusto} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Tipo de Conta"  />} />
            <Autocomplete disablePortal sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="situacao" value={props.dialog.situacai} options={situacao} 
                        renderInput={(params) => <TextField variant="standard" {...params} label="Situação"  />} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="descAgencia" label="Descrição da Agência" variant="standard" defaultValue={props.dialog.descAgencia} onChange={handleChangeValues}/>
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '100%', md: '66%', lg: '50%', xl: '50%' }, margin: '5px'}} name="escala" label="Escala" variant="standard" defaultValue={props.dialog.escala} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cargaHoraria" label="Carga Horária" variant="standard" defaultValue={props.dialog.cargaHoraria} onChange={handleChangeValues}/>
            <Divider sx={{width: '100%', margin: '10px 0'}} />
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="linhaVT" label="Linha VT" variant="standard" defaultValue={props.dialog.linhaVT} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="quantidadeVT" label="Quantidade VT / dia" variant="standard" defaultValue={props.dialog.quantidadeVT} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="planoSaude" label="Plano de Saúde" variant="standard" defaultValue={props.dialog.planoSaude} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="planoOdonto" label="Plano Odonto" variant="standard" defaultValue={props.dialog.planoOdonto} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="cestaBasica" label="Cesta Básica" variant="standard" defaultValue={props.dialog.cestaBasica} onChange={handleChangeValues}/>
            <TextField sx={{width: { xs: '100%', sm: '48%', md: '30%', lg: '20%', xl: '20%' } , margin: '5px'}} name="refeitorio" label="Refeitório" variant="standard" defaultValue={props.dialog.refeitorio} onChange={handleChangeValues}/>
            




         
        {/* <FormControl>
            <FormLabel id="sexo">Gênero</FormLabel>
            <RadioGroup
                row
                aria-labelledby="sexo"
                defaultValue={props.dialog.sexo}
                name="sexo"
                id="sexo"
                onChange={handleChangeValues}
              >
                <FormControlLabel value="feminino" control={<Radio id="sexo"  />} label="Feminino" />
                <FormControlLabel value="masculino" control={<Radio id="sexo" />} label="Masculino" />
                <FormControlLabel value="outro" control={<Radio id="sexo" />} label="Outro" />
            </RadioGroup>
        </FormControl>      */}
          
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



