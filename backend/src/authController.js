const bycript = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {usersDb}=require('../config/database');

exports.register = async (req, res)=> {
    try{
        const{nome, email, password} = req.body;

        if(!nome||!email|| !password){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'});
        }

        const existingUser = await usersDb.findOne({email});

        if(existingUser){
            return res.status(409).json({message:'Este email já está em uso'});
        }

        const hashedPassword = await bycript.hash(password, 10);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = {
            nome,
            email,
            password: hashedPassword,
            isVerified: false,
            verificationToken,
        };
        await usersDb.insert(newUser);

        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth:{
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const verificationLink = `http://localhost:3001/auth/verify-email?token=${verificationToken}`;
        let info = await transporter.sendMail({
            from: '"Agenda MMTech" <noreply@mmtech.com>',
            to: email,
            subject: 'Verifique seu e-mail',
            html: '<p> Olá ${nome}, </p><p>Obrigado por se Registrar! Por favor, clique no link abaixo para verificar sua conta:</p><a href="${verificationLink}">${verificationLink}<a>', 
        });

        console.log('Email de verificação enviado: \%s', nodemailer.getTestMessageUrl(info));

        res.status(201).json({message:'Usuário Registrado com sucesso! PorFavor, verifique seu e-mail'});

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Erro no servidor ao registrar o usuário'});
    }
};