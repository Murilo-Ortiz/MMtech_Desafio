const express = require('express');
const cors = require('cors');
const Datastore = require('nedb-promises');
const req = require('express/lib/request');
const app = express();
const PORT = 3001;

const db = Datastore.create({filename: './data.db', autoload: true });
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.get('/data', async(req, res)=> {
    try{
        const data = await db.find({}).sort({name:1});
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Erro ao carregar os dados', message: error.message});
    }
});

app.post('/data', async(req, res)=> {
    try {
        const {nome, email, telefone} = req.body;
        if(!nome){
            return res.status(400).json({error: 'o campo "Nome" é obrigatório'});
        }
         if(!email){
            return res.status(400).json({error: 'o campo "Email" é obrigatório'});
        }
         if(!telefone){
            return res.status(400).json({error: 'o campo "Telefone" é obrigatório'});
        }

        const newData = {nome: nome, email: email, telefone: telefone};

        const addData = await db.insert(newData);
        res.status(201).json(addData);
    } catch (error) {
         res.status(500).json({error:'Erro ao cadastrar novo contato', message: error.message});
    }
});

app.delete('/data/:id', async (req, res)=>{
    try {
        const idD = req.params.id;
        const deletado = await db.remove({_id: idD}, {});
        if(deletado==0){
            return res.status(404).json({error: 'O contato a ser deletado nao existe'})
        }
        return res.status(200).json('Contato deletado com sucesso!')
        
    } catch (error) {
        res.status(500).json({error: 'Erro ao deletar o contato', message: error.message})
    }
} );

app.put('/data/:id', async(req, res)=> {
    try {
        const idD = req.params.id;
        const { nome, email, telefone } = req.body;
        if (!nome || !email || !telefone) {
            return res.status(400).json({ error: 'Os campos nome, email e telefone são obrigatórios.' });
        }
        const updatedData = { nome, email, telefone };
        const numReplaced = await db.update({ _id: idD }, { $set: updatedData }, {});
        if (numReplaced === 0) {
            return res.status(404).json({ error: 'Contato não encontrado para atualização.' });
        }
        const updatedContact = await db.findOne({ _id: idD });
        res.status(200).json(updatedContact);

    } catch (error) {
        res.status(500).json({error: 'Erro ao atualizar os dados do contato', message: error.message})
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT} `);
});
