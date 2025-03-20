const  { pool }  = require('../../../config/database')

class ClienteModel {
    static async criar(matricula, nome, email, senha){
           const dados = [matricula,nome,email,senha]
           const consulta = `insert into cliente(matricula,nome,email,senha) values ($1, $2, $3, $4) returning*`
           const novoCliente = await pool.query(consulta, dados)
           return novoCliente.rows
    }
    static async editar(matricula, nome, email, senha){
         const dados = (nome,email,senha,matricula)
         const consulta = `update cliente set nome = $2, email = $3, senha = $4 where matricula = $1 returning*`;
         const clienteAtualizado = await pool.query(consulta, dados)
         return clienteAtualizado.rows
    }
    static async listar(){
       const consulta = `select*from aluno`
       const clientes = await pool.query(consulta)
       return clientes.rows
    }
    static async listarPorMatricula(matricula){
       const dados =[matricula]
       const consulta = `select * from cliente where matricula = $1`
       const cliente = await pool.query(consulta,dados)
       return cliente.rows

    }

    static async excluirPorMatricula(matricula){
        const dados = [matricula]
        const consulta =  `delete from aluno where matricula = $1`
        await pool.query(consulta,dados)

    }
    static async excluirTodos(){
       const consulta = `delete from cliente `
       await pool.query(consulta)

    }

}

module.exports =    CclienteModel;