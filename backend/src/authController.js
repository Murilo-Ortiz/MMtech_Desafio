const bycript = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {usersDb}=require('../config/database');
const jwt = require('jsonwebtoken');
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
             html: `<p>Olá ${nome},</p><p>Obrigado por se Registrar! Por favor, clique no link abaixo para verificar sua conta:</p><a href="${verificationLink}">${verificationLink}</a>`,
        });

        console.log('Email de verificação enviado: \%s', nodemailer.getTestMessageUrl(info));

        res.status(201).json({message:'Usuário Registrado com sucesso! PorFavor, verifique seu e-mail'});

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Erro no servidor ao registrar o usuário'});
    }
};

exports.verifyEmail = async(req,res)=>{
    try {
        const {token} = req.query;

        if(!token){
            return res.status(400).send('<h1>Erro: Token de verificação não fornecido.</h1>');
        }

        const user = await usersDb.findOne({verificationToken: token});

        if(!user){
            return res.status(400).send('<h1>Erro: Token inválido </h1><p>Por favor, tente se registrar novamente.</p>');
        }

        await usersDb.update(
            {_id:user._id},
            {
              $set: {isVerified: true},
              $unset: {verificationToken: 1}
            }
        );

        res.send('<h1>E-mail verificado com sucesso!</h1><p>Você já pode fechar esta aba e fazer o login na aplicação.</p>');

    } catch (error) {
        console.error(error);
    res.status(500).send('<h1>Erro no servidor ao verificar o e-mail.</h1>');
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    const user = await usersDb.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' }); 
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Por favor, verifique seu e-mail antes de fazer login.' });
    }

    const payload = {
      user: {
        id: user._id,
        nome: user.nome
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao fazer login.' });
  }
};