const HospedeModel = require('../models/index');

class HospedeModelController{
    static async criar(registro, consulta){
      try {
        const { id, hospede, quarto, dataCheckin, dataCheckout, status} = registro.body
        if(!id|| !hospede || !quarto || !dataCheckin || !dataCheckout || !status){
          return  consulta.status(400).json({mensagem: "Todos os campos devem ser preenchidos."}); 
        }
        const novoHospede = await HospedeModel.criar(id, hospede, quarto, dataCheckin, dataCheckout, status)
        consulta.status(201).json({mensagem: "Hospede criado com sucesso",hospede: novoHospede})
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao adicioanar novo hospede",erro: error.message});
      }
    }
    static async editar(registro, consulta){
      try {
        const Id = registro.params.id
        const {id, hospede, dataCheckin} = registro.body
        if(!Id || !hospede || !dataCheckin){
          return consulta.status(400).json({mensagem: "Todos os campos devem ser preenchidos"})
        }
        const hospedes = await HospedeModel.editar(id, hospede)
        if(hospedes.length === 0){
          return consulta.status(400).json({mensagem: "Hospede não encontrado"})
        }
        consulta.status(200).json({mensagem: "Hospede editado com sucesso", hospede: hospede});
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao editar hospede",erro: error.message});
        
      }

    }
    static async listarTodos(registro, consulta){
        try {
            const hospedes = await HospedeModel.listar()
            if(hospedes.length === 0){
                return consulta.status(400).json({mensagem: "Não existe hospedes a serem exibidos"});
              
            }
            consulta.status(200).json(hospedes)
        } catch (error) {
            consulta.status(500).json({mensagem: "Erro ao listar os Hospedes", erro: error.message});
            
        }
    }
    static async listarPorid(registro, consulta){
       try {
        const id = registro.params.id
        const hospede = await HospedeModel.listarPorId(id)
        if(!hospede){
            return consulta.status(400).json({mensagem: "Hospede nao encontrado"});
        }
        consulta.status(200).json(hospede);
       } catch (error) {
         return  consulta.status(500).json({mensagem: "Erro ao buscar hospede pela id",erro: error.message})
       }
    } 
    static async excluirTodos(registro, consulta){
      try {
        
        await HospedeModel.excluirTodos()
        consulta.status(200).json({mensagem: "Todos os hospedes excluidos com sucesso"})
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao excluir todos hospedes",erro: error.message})
      }
    }
    static async excluirPorId(registro, consulta){
      try {
        const id = registro.params.id
        const hospede = await HospedeModel.listarPorId(id);
        if(hospede.length == 0) {
          return consulta.status(400).json({mensagem:"Hospede não encontrado"})
        }
        await HospedeModel.excluirPorId(id)
        consulta.status(200).json({mensagem: "Hospede excluido com sucesso"})
      } catch (error) {
        consulta.status(500).json({mensagem: "Erro ao exluir hospede", erro: error.message})
      }
    }
}

module.exports = HospedeModelController;