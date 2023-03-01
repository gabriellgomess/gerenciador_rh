import React from 'react';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Logo from '../assets/img/logo.png';
import { AutoAwesome } from '@mui/icons-material';
import Button from '@mui/material/Button';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDFGenerator = (props) => {
  const { colaborador } = props;

  const generatePDF = () => {
    const documentDefinition = {
      content: [
        
    ],
    styles: {
        header: {
          fontSize: 14,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true
        },        
        subheaderTop: {
          fontSize: 12,
          bold: true,
          marginTop: 20
        },
        simpleText: {
          fontSize: 10,
        },
        table: {
            width: '100%',
        },
      },
    };
    props.colaborador.forEach(colaborador => {
        documentDefinition.content.push(
        {
            table: {
                body: [
                    [
                        {
                            image: Logo,
                            width: 40,
                            style: { display: 'block', margin: '0 auto', position: 'fixed', top: 10, right: 10 },
                        },
                        [
                            {
                                "text": "Casa do Menino Jesus de Praga",
                                "style": "header",
                            },
                            {
                                "text": "Rua: Nelson Zang, 420 - Porto Alegre - Intercap - RS - CEP 91530-350 - Telefone: (51) 2165-1911",
                                "style": "simpleText",
                            },
                            ,
                            {
                                "text": "CNPJ: 89.621.767/0001-41",
                                "style": "simpleText",
                            },
                        ],                        
                    ],                                      
                ]                
            },
            style: 'table',
        },
        {
            text: 'Dados Pessoais\n\n',
            style: 'subheaderTop',
        },
        {
            text: `Matrícula: ${colaborador.matricula}`,
            style: 'simpleText',
        },
        {
          text: `Nome: ${colaborador.nome}`,
          style: 'simpleText',
        },
        {
          text: `CPF: ${colaborador.cpf} | PIS: ${colaborador.pis} | RG: ${colaborador.rg}`,
          style: 'simpleText',
        },
        {
            text: `Data de Nascimento: ${colaborador.nascimento.split('-').reverse().join('/')}`,
            style: 'simpleText',
        },
        {
            text: `Telefone: ${colaborador.telefone}`,
            style: 'simpleText',
        },
        {
            text: `Celular: ${colaborador.celular}`,
            style: 'simpleText',
        },
        {
            text: `E-mail: ${colaborador.email}`,
            style: 'simpleText',
        },
        {
            text: `CEP: ${colaborador.cep}`,
            style: 'simpleText',
        },
        {
            text: `Endereço: ${colaborador.rua}, ${colaborador.numero}`,
            style: 'simpleText',
        },        
        {
            text: `Bairro: ${colaborador.bairro}`,
            style: 'simpleText',
        },
        {
            text: `Cidade: ${colaborador.cidade}`,
            style: 'simpleText',
        },
        {
            text: `Estado: ${colaborador.estado}\n\n`,
            style: 'simpleText',
        },
        {
        columns: [
            [
                {
                    text: 'Dados Contratuais\n\n',
                    style: 'subheader',
                },
                {
                    text: `Salário: ${colaborador.salario}`,
                    style: 'simpleText',
                },
                {
                    text: `Cargo: ${colaborador.cargo}`,
                    style: 'simpleText',
                },
                {
                    text: `Registro: ${colaborador.registro}`,
                    style: 'simpleText',
                },
                {
                    text: `CBO: ${colaborador.cbo}`,
                    style: 'simpleText',
                },
                {
                    text: `Centro de Custo: ${colaborador.ccusto}`,
                    style: 'simpleText',
                },
                {
                    text: `Data da admissão: ${colaborador.admissao.split('-').reverse().join('/')}`,
                    style: 'simpleText',
                },
                {
                    text: `Data da demissão: ${colaborador.demissao != null ||  colaborador.demissao == '00000-00-00'? colaborador.demissao.split('-').reverse().join('/'): ''}`,
                    style: 'simpleText',
                },
                {
                    text: `Salário: ${colaborador.salario}\n\n`,
                    style: 'simpleText',
                },
            ],
            [
                {
                    text: 'Dados Bancários\n\n',
                    style: 'subheader',
                },
                {
                    text: `Agência: ${colaborador.agencia}`,
                    style: 'simpleText',
                },
                {
                    text: `Conta: ${colaborador.conta}`,
                    style: 'simpleText',
                },
                {
                    text: `Tipo de conta: ${colaborador.tipoConta}`,
                    style: 'simpleText',
                },
                {
                    text: `Situação: ${colaborador.situacao}`,
                    style: 'simpleText',
                },
                {
                    text: `Descrição da agência: ${colaborador.descAgencia}\n\n`,
                    style: 'simpleText',
                },
            ]
        ],
        },
        {
            text: 'Escala\n\n',
            style: 'subheader',
        },
        {
            text: `Escala: ${colaborador.escala}`,
            style: 'simpleText',
        },
        {
            text: `Carga Horária: ${colaborador.cargaHoraria}\n\n`,
            style: 'simpleText',
        },
        {
            text: 'Benefícios\n\n',
            style: 'subheader',
        },
        {
            text: `Linha VT: ${colaborador.linhaVT}`,
            style: 'simpleText',
        },
        {
            text: `Quantidade de VT / dia: ${colaborador.quantidadeVT}`,
            style: 'simpleText',
        },
        {
            text: `Plano de Saúde: ${colaborador.planoSaude}`,
            style: 'simpleText',
        },
        {
            text: `Plano Odontológico: ${colaborador.planoOdonto}`,
            style: 'simpleText',
        },
        {
            text: `Cesta Básica: ${colaborador.cestaBasica}`,
            style: 'simpleText',
        },
        {
            text: `Refeitório: ${colaborador.refeitorio}`,
            style: 'simpleText',
        },

       
        
        );
    });
  
    pdfMake.createPdf(documentDefinition).open();
  };

  return (
    
     <Button sx={{background: '#d32f2f', display: 'flex', alignItems: 'center'}} onClick={generatePDF} disabled={props.colaborador.length === 0? 'disabled':''}variant="contained" endIcon={<FontAwesomeIcon icon={faFilePdf} />}>
    Cadastro dos colaboradores
 </Button> 
  );
};

export default PDFGenerator;
