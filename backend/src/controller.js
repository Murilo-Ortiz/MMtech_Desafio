const { contactsDb } = require('../config/database');
const Joi = require('joi');

const contactSchema = Joi.object({
  nome: Joi.string().min(3).required().messages({
    'string.empty': 'O campo "nome" é obrigatório.',
    'string.min': 'O nome precisa de ter no mínimo 3 caracteres.',
  }),
  emails: Joi.array().items(Joi.string().email()).min(1).required().messages({
    'array.min': 'É necessário pelo menos um e-mail.',
    'string.email': 'Um dos e-mails fornecidos não é válido.',
  }),
  telefones: Joi.array().items(Joi.string().pattern(/^\d{10,11}$/)).min(1).required().messages({
    'array.min': 'É necessário pelo menos um telefone.',
    'string.pattern.base': 'Um dos telefones fornecidos não é válido (deve conter 10 ou 11 dígitos).',
  }),
});

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
        const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const formattedErrors = {};
            error.details.forEach(detail => {
                const fieldName = detail.path[0];
                if (!formattedErrors[fieldName]) {
                    formattedErrors[fieldName] = [];
                }
                formattedErrors[fieldName].push(detail.message);
            });
            return res.status(400).json({
                message: 'Erro de validação nos campos fornecidos.',
                errors: formattedErrors
            });
        }

        const newData = {
            ...value,
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
        const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const formattedErrors = {};
            error.details.forEach(detail => {
                const fieldName = detail.path[0];
                if (!formattedErrors[fieldName]) {
                    formattedErrors[fieldName] = [];
                }
                formattedErrors[fieldName].push(detail.message);
            });
            return res.status(400).json({
                message: 'Erro de validação nos campos fornecidos.',
                errors: formattedErrors
            });
        }

        const idD = req.params.id;
        const numReplaced = await contactsDb.update({ _id: idD, userId: req.user.id }, { $set: value }, {});
        if (numReplaced === 0) {
            return res.status(404).json({ message: 'Contato não encontrado ou você não tem permissão para o atualizar.' });
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
