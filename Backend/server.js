const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('O servidor está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${3000}`);
});