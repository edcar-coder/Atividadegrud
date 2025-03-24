const  { pool }  = require('../../../config/database')

class HospedeModel {
    static async criar (id,hospede, quarto, dataCheckin, dataCheckout, status){
           const dados = [id, hospede, quarto, dataCheckin, dataCheckout, status]
           const consulta = `insert into reserva(id, hospede, quarto, dataCheckin, dataCheckout, status) values ($1, $2, $3, $4, $5, $6) returning *`
           const novoHospede = await pool.query(consulta, dados)
           return novoHospede.rows
    }
    static async editar(id, hospede, quarto, dataCheckin, dataCheckout, status){
         const dados = (id, hospede, quarto, dataCheckin, dataCheckout, status)
         const consulta = `update hospede set status = $2, datacheckin = $3, quarto  = $4 where id = $1 returning*`;
         const hospedeAtualizado = await pool.query(consulta, dados)
         return hospedeAtualizado.rows
    }
    static async listar(){
       const consulta = `select * from reserva`
       const hospedes = await pool.query(consulta)
       return hospedes.rows
    }
    static async listarPorid(id){
       const dados =[id]
       const consulta = `select * from reserva where id = $1`
       const hospede = await pool.query(consulta,dados)
       return hospede.rows

    }

    static async excluirPorid(id){
        const dados = [id]
        const consulta =  `delete from hospede where id = $1`
        await pool.query(consulta, dados)

    }
    static async excluirTodos(){
       const consulta = `delete from hospede`
       await pool.query(consulta)

    }

}

module.exports = HospedeModel;