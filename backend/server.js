const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const routes = require('./src/routes');
app.use('/data', routes);

//APENAS PRA TESTE DE FUNCIONAMENTO DA API
//app.get('/', (req, res) => {
//    res.send('API funcionando');
//});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT} `);
});
