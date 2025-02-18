// Importando com (ESM)
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicacao use express como json(javascript object notation)
app.use(express.json());

const bancoDados = [];

app.get('hospedes', (registro, consulta,) => {

try {
    if(bancoDados.length === 0) {
        return consulta.status(200).json({ mensagem: "Hospede registrado" })
    }
    consulta.status(200).json(bancoDados);

} catch (error) {
    consulta.status(500).json({ mensagem: "erro ao buscar Hospede", erro: erro.message })

}
});

app.post('/hospedes', (registro, consulta) => {
    try {
        const  { id, hospede, quarto, dataChekin, dataCheckout, status } = requisicao.body;
        if (!id || !hospede || !quarto || !dataChekin || !dataCheckout || !status) {
          return consulta.status(200).json(
            {
              mensagem: "Todos os dados devem ser preenchidos corretamente"
            }
          )
        }
        const novoHospede = { id, hospede, quarto, dataChekin, dataCheckout, status };
    bancoDados.push(novoHospede);
    consulta.status(201).json({ mensagem: "Hospede cadastrado com sucesso" });
  } catch (error) { }
});

app.put("/hospede/:id", (registro, consulta) => {
    try {
      //localhost:3000/hospede/1
      const id = registro.params.id;
      const { novoNome, novoQuarto, novaDataChekin, novaDataChekout, novoStatus  } = registro.body
      if (!id) {
        return registro.status(404).json({
          mensagem: "informe um parametro!"
        })
      }
      const hospede = bancoDados.find(elemento => elemento.id === id)
      if (!hospede) {
        return registro.status(404).json({mensagem:"hospede nao encontrado"})
      }
      hospede.nome = novoNome || hospede.nome
      hospede.quarto = novoQuarto || hospede.quarto
      hospede.dataChekin = novaDataChekin || hospede.dataChekin
      hospede.dataCheckout = novaDataChekout || hospede.dataCheckout
      hospede.status = novoStatus || hospede.status
      consulta.status(200).json({ mensagem: "hospede atualizado com sucesso" })
    } catch (error) {
  
    }
  });

  app.delete("/hospede/:id", (registro, consulta) => {
    try {
     const id = registro.params.id
     const index = bancoDados.findIndex(elemento => elemento.id === id)
     if(index === -1){
       return registro.status(404).json({mensagem:"hospede nao encontrado"})
     }
     bancoDados.splice(index, 1)
     registro.status(200).json({mensagem:"hospede deletado com sucesso"})
    } catch (error) {
     registro.status(500).json({
       mensagem: "erro ao cadastrar hospede",
       erro: error.message,})
     
    }
   });

   app.get("/hospede/:id", (registro, consulta) => {
    try {
      const id = registro.params.id;
      const hospede = bancoDados.find(elemento => elemento.id === id);
      if(!hospede){
        return registro.status(404).json({mensagem:"hospede nao encontrado"})
      }
      consulta.status(200).json(hospede)
    } catch (error) {
      registro.status(500).json({mensagem: "erro a buscar hospede", erro: error.message}); 
    }
  });

  app.delete("/hospede", (registro, consulta) => {
    try {
      bancoDados.length = 0;
      consulta.status(200).json({mensagem: "Todos os hospedes deletados com sucesso!"})
    } catch (error) {
      consulta.status(500).json({
        mensagem: "Erro ao cadastrar hospede"
      })
    }
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    
  });

  

   