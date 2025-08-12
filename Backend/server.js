const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/meu-banco-de-dados')
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Não foi possível conectar...', err));

const userSchema = new mongoose.Schema({
  perfil: String,
  nome: String,
  email: String,
  documento: String,
  dataNascimento: Date,
  endereco: String,
  senha: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.send('O servidor está funcionando!');
});

app.post('/cadastro', async (req, res) => {
  try {
    const novoUsuario = new User(req.body);
    await novoUsuario.save();
    console.log('Usuário salvo no banco de dados:', novoUsuario);
    res.status(201).send('Cadastro realizado com sucesso e salvo no banco de dados!');
  } catch (error) {
    res.status(500).send('Erro ao salvar o usuário: ' + error.message);
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});