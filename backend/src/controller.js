const { errorMonitor } = require('nedb-promises');
const db = require('../config/database');

// GET /data  -- retorna todos os contatos 
exports.getAllData = async (req, res) => { 
    try{
        const data = await db.find({}).sort({nome:1});
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Erro ao carregar os dados', message: error.message});
    }
};

//GET /data/:id  -- retorna o json de um id especifico
exports.getbyId = async (req, res) => { 
    try{
        const id = req.params.id;
        const data = await db.find({_id: id});
        if(data==0){
            res.status(404).json({error: 'O contato nao existe'});
        }
        res.json(data);
    }catch(error){
        res.status(500).json({error:'Erro ao carregar os dados', message: error.message});
    }
};


// POST /data  -- cria um novo contato 
exports.createContato = async (req, res) => { 
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
};

// DELETE /data/:id  -- apaga um contato (id)
exports.deleteContato = async (req, res) => { 
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
};


// PUT /data/:id  -- atualiza um contato (id) 
exports.updateContato = async (req, res) => { 
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
};