const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 3001;

const authRoutes = require('./src/authRoutes');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

const routes = require('./src/routes');
app.use('/data', routes);

//APENAS PRA TESTE DE FUNCIONAMENTO DA API
//app.get('/', (req, res) => {
//    res.send('API funcionando');
//});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT} `);
});
