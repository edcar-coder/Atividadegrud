// Importando com (ESM)
const express = require('express');
const {pool} = require('./src/config/database')
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicacao use express como json(javascript object notation)
app.use(express.json());



app.get('hospedes', async (registro, consulta,) => {
  // tratamento de excessoes
  try {
    const consulta = `select * from hospedes`
    const hospedes = await pool.query(consulta)
    if (hospedes.rows.length === 0) {
      return consulta.status(200).json({ mensagem: "Banco de dados vazio" })
    }
    consulta.status(200).json(hospedes.rows);

  } catch (error) {
    consulta.status(500).json({
      mensagem: "erro ao buscar Hospede",
      erro: error.message
    });
  }
});

app.post('/hospedes', async (registro, consulta) => {
  try {
    const { id, hospede, quarto, dataChekin, dataCheckout, status } = registro.body;
    if (!id || !hospede || !quarto || !dataChekin || !dataCheckout || !status) {
      return consulta.status(200).json({
        mensagem: "Todos os dados devem ser preenchidos corretamente!",
      });
    }
    const dados = [id, hospede, quarto, dataChekin, dataCheckout, status];
    const consulta = `nsert into hospede(id, hospede, quarto, dataChekin, dataCheckout, status)
                         values ($1, $2, $3) returning*`
    await pool.query(consulta, dados)
    consulta.status(201).json({ mensagem: "Hospede cadastrado com sucesso" });
  } catch (error) {
    consulta.status(500).json({
      mensagem: "erro ao cadastrar hospede",
      erro: error.message,
    })
  }
});

app.put("/hospede/:id", async (registro, consulta) => {
  try {
    //localhost:3000/hospede/1
    const id = registro.params.id;
    const {novoQuarto, novaDataChekin, novaDataChekout, novoStatus } = registro.body
    if (!id) {
      return consulta.status(404).json({
        mensagem: "informe um parametro!"
      })
    }
    const dados1 = [id]
    const consulta1 = `select * from hospede where id = $1`
    const resultado1 = await pool.query(consulta1, dados1)
    if (resultado1.rows.length === 0) {
      return consulta.status(404).json({ mensagem: "hospede nao encontrado" })
    }
    const dados2 = [id, novoQuarto, novaDataChekin, novaDataChekout, novoStatus]
    const consulta2 = `update hospede set nome = $2, preco =$3, 
                      quantidade = $4 where id = $1 returning *`
    await pool.query(consulta2, dados2)
    consulta.status(200).json({ mensagem: "hospede atualizado com sucesso" })
  } catch (error) {
    consulta.status(200).json({
      mensagem: "erro ao editar hospade",
      erro: error.mensage,
    })
  }
});

app.delete("/hospede/:id", async (registro, consulta) => {
  try {
    const id = registro.params.id
    const dados1 = [id]
    const consulta1 = `select * from hodpede where id = $1`
    const resultado1 = await pool.query(consulta1, dados1)
    if (resultado1.rows.length === 0) {
      return consulta.status(404).json({ mensagem: "hospede nao encontrado" })
    }
    const dados2 = [id]
    const consulta2 = `delete * from hospede where id = $1`
    await pool.query(consulta2, dados2)
    consulta.status(200).json({ mensagem: "hospede deletado com sucesso" })
  } catch (error) {
    consulta.status(500).json({
      mensagem: "erro ao excluir hospedes",
      erro: error.message,
    })

  }
});

app.get("/hospede/:id", async (registro, consulta) => {
  try {
    const id = registro.params.id;
    const dados1 = [id]
    const consulta1 = `select * from hospede where id = $1`
    const resultado1 = await pool.query(consulta1, dados1)
    if (resultado1.rows.length === 0) {
      return consulta.status(404).json({ mensagem: "hospdede nao encontrado" })
    }
    consulta.status(200).json(resultado1.rows[0])
  } catch (error) {
    consulta.status(500).json({
      mensagem: "erro ao buscar hospede",
      erro: error.message,
    });
  }
});

app.delete("/hospede", async (registro, consulta) => {
  try {
    const consulta = `delete  from hospede`
    await pool.query(consulta)
    bancoDados.length = 0;
    consulta.status(200).json({ mensagem: "Todos os hospedes deletados com sucesso!" })
  } catch (error) {
    consulta.status(500).json({
      mensagem: "Erro ao cadastrar hospede"
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);

})



