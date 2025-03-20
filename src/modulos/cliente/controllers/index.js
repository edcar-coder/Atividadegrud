const ClienteModel = require('../models/index');

class ClienteModelController{
    static async criar(registro, consulta){
      try {
        const {id, cliente, quarto, dataChekin, dataCheckout, status} = registro.body
        if(!id || !cliente || !quarto || !dataChekin || !dataCheckout || !status){
          return  consulta.status(400).json({mensagem: "Todos os campos devem ser preenchidos."}); 
        }
        const novoAluno = await ClienteModel.criar(id, cliente, quarto, dataChekin, dataCheckout, status)
        consulta.status(201).json({mensagem: "Cliente criado com sucesso",cliente: novoCliente})
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao adicioanar novo cliente",erro: error.message});
      }
    }
    static async editar(registro, consulta){
      try {
        const id = registro.params.matricula
        const {nome, email, senha} = registro.body
        if(!nome || !email || !senha){
          return consulta.status(400).json({mensagem: "Todos os campos devem ser preenchidos"})
        }
        const aluno = await ClienteModel.editar(id, cliente, quarto,)
        if(aluno.length === 0){
          return resposta.status(400).json({mensagem: "Aluno não encontrado"})
        }
        consulta.status(200).json({mensagem: "Cliente editado com sucesso", cliente: cliente});
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao editar cliente"});
        
      }

    }
    static async listarTodos(registro, consulta){
        try {
            const alunos = await ClienteModel.listar()
            if(alunos.length === 0){
                return consulta.status(400).json({mensagem: "Não existe clientes a serem exibidos"});
              
            }
            consulta.status(200).json(alunos)
        } catch (error) {
            consulta.status(500).json({mensagem: "Erro ao listar os Clientes"});
            
        }
    }
    static async listarPorMatricula(registro, consulta){
       try {
        const matricula = registro.params.matricula
        const cliente = await AlunoModel.listarPorId(matricula)
        if(!cliente){
            return consulta.status(400).json({mensagem: "Cliente nao encontrado"});
        }
        consulta.status(200).json(cliente);
       } catch (error) {
         return  consulta.status(500).json({mensagem: "Erro ao buscar Cliente pela matricula"})
       }
    } 
    static async excluirTodos(registro, consulta){
      try {
        
        await ClienteModel.excluirTodos()
        consulta.status(200).json({mensagem: "Todos os clientes excluidos com sucesso"})
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao excluir todos Clientes"})
      }
    }
    static async excluirPorMatricula(registro, consulta){
      try {
        const matricula = registro.params.matricula
        const aluno = await ClienteModel.listarPorMatricula(matricula);
        if(aluno.length == 0) {
          return consulta.status(400).json({mensagem:"Aluno não encontrado"})
        }
        await ClienteModel.excluirPorMatricula(matricula)
        consulta.status(200).json({mensagem: "Cliente excluido com sucesso"})
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao exluir cliente", erro: error.message})
      }
    }
}

module.exports = ClienteController;