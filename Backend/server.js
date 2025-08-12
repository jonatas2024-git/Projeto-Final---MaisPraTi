const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

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
        const { perfil, nome, email, documento, 'data-nascimento': dataNascimento, endereco, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).send('Nome, e-mail e senha são obrigatórios.');
        }

        if (senha.length < 6) {
            return res.status(400).send('A senha deve ter no mínimo 6 caracteres.');
        }
        
        const novoUsuario = new User({
            perfil,
            nome,
            email,
            documento,
            dataNascimento,
            endereco,
            senha,
        });
        
        await novoUsuario.save();
        console.log('Usuário salvo no banco de dados:', novoUsuario);
        res.status(201).send('Cadastro realizado com sucesso e salvo no banco de dados!');
    } catch (error) {
        res.status(500).send('Erro ao salvar o usuário: ' + error.message);
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send('E-mail e senha são obrigatórios.');
        }

        const usuario = await User.findOne({ email: email });
        
        if (!usuario || usuario.senha !== senha) {
            return res.status(401).send('Credenciais inválidas.');
        }

        res.status(200).send('Login realizado com sucesso!');
        console.log(`Usuário ${usuario.email} logado com sucesso.`);

    } catch (error) {
        res.status(500).send('Erro ao tentar fazer login: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});