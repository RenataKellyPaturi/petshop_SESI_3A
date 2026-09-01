const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o MySQL (Docker)
const db = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '1234',
  database: 'login',
  port: 3306,
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    const usuario = rows[0];

    if (usuario.senha !== senha) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro no banco de dados:', error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});