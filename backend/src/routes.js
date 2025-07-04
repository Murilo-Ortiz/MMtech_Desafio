const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/', controller.getAllData);
router.get('/:id', controller.getbyId);
router.post('/', controller.createContato);
router.put('/:id', controller.updateContato);
router.delete('/:id', controller.deleteContato);

module.exports = router;