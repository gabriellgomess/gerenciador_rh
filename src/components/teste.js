const generatePDF = () => {
    const documentDefinition = {
      content: [
        {
          image: Logo,
          width: 40,
          style: { display: 'block', margin: '0 auto', position: 'fixed', top: 10, right: 10 },
        },
      ],
    };
  
    for (let i = 0; i < colaborador.length; i++) {
      const colaboradorAtual = colaborador[i];
      const colaboradorContent = [
        {        
            text: 'Dados do colaborador\n\n',        
            style: 'header',      
        },      
        // adicione aqui as informações do colaborador atual, usando colaboradorAtual em vez de props.colaborador[i]
      ];
  
      documentDefinition.content.push(...colaboradorContent);
    }
  
    pdfMake.createPdf(documentDefinition).open();
  };