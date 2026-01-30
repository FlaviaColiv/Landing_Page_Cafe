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

