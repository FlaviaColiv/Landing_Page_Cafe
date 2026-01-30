import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

const dpConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'agendamento'
}

app.use(express.json());
app.use(cors());

app.post('/salvar-agendamento', async (req, res)=>{
    const { nome, procedimento, dia, hora } = req.body;

    let connection;
    
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao Bando MySQL')

        const insertQuery = 'INSERT INTO agendamentos (nome, procedimento, dia, hora) VALUES (?,?,?,?);';

        const [result] = await connection.execute(insertQuery, [nome, procedimento, dia, hora]);
        
        console.log('Agendamento salvo com sucesso! ID:${result.insertId}');

        const mensagem = 'Olá ${nome}, aguardamos você para realizar o seu procedimento ${procedimento} no dia ${dia} às ${hora} horas.';

        res.status(200).send({message: mensagem});

    } catch (err) {
        console.error('Erro ao processar o agendamento: ', err);
        res.status(500).send( { message: 'Erro interno ao salvar agendamento'});

    }finally{
        if(connection){
            connection.end();
        }
    }
});

app.listen(PORT, ()=>{
    console.log('Servidor rodando em http://localhost:3000');
})