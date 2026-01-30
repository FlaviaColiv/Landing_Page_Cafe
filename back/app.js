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

        const insertQuery = '
        INSERT INTO agendamentod (nome, procedimento, dia, hora)
        VALUEA (?,?,?,?);
        ';

        const [result] = await connection.execute(insert)insertQuery, [nome, procedimento, dia, hora] 
    } catch (err) {
        console.error('Erro ao processar o agendamento: ', err);
        res.status(500).send( { message: 'Erro interno ao salvar agendamento'});

        console.log('Agendamento salvo com sucesso! ID:${result.insertId}');

        const mensagem = 'Olá ${nome}, aguardamos você para realizar o seu procedimento ${dia} às ${hora} horas.'

        res.status(200).send({message: mensagem});

    }finally{
        if(connection){
            connection.end();
        }
    }
});

app.listen(PORT, ()=>{
    console.log('Servidor rodando em http://localhost:${PORT}');
})