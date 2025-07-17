const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
module.exports = router;