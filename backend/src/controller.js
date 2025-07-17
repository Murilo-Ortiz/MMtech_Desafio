const { contactsDb } = require('../config/database');

exports.getAllData = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query.nome = new RegExp(search, 'i');
        }

        const data = await contactsDb.find(query).sort({ nome: 1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar os dados', message: error.message });
    }
};

exports.createContato = async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        if (!nome || !email || !telefone) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const newData = {
            nome,
            email,
            telefone,
            userId: req.user.id
        };

        const addData = await contactsDb.insert(newData);
        res.status(201).json(addData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar novo contato', message: error.message });
    }
};

exports.deleteContato = async (req, res) => {
    try {
        const idD = req.params.id;
        const deletado = await contactsDb.remove({ _id: idD, userId: req.user.id }, {});
        if (deletado === 0) {
            return res.status(404).json({ error: 'O contato não existe ou você não tem permissão para o apagar' });
        }
        return res.status(200).json({ message: 'Contato apagado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar o contato', message: error.message });
    }
};

exports.updateContato = async (req, res) => {
    try {
        const idD = req.params.id;
        const { nome, email, telefone } = req.body;
        if (!nome || !email || !telefone) {
            return res.status(400).json({ error: 'Os campos nome, email e telefone são obrigatórios.' });
        }
        const updatedData = { nome, email, telefone };
        const numReplaced = await contactsDb.update({ _id: idD, userId: req.user.id }, { $set: updatedData }, {});
        if (numReplaced === 0) {
            return res.status(404).json({ error: 'Contato não encontrado ou você não tem permissão para o atualizar.' });
        }
        const updatedContact = await contactsDb.findOne({ _id: idD });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar os dados do contato', message: error.message });
    }
};

exports.getbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await contactsDb.findOne({ _id: id });
        if (!data) {
            return res.status(404).json({ error: 'O contato não existe' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar os dados', message: error.message });
    }
};
