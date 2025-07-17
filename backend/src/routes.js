const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { protect } = require('./authMidlleware');


router.get('/', controller.getAllData);
router.get('/:id', controller.getbyId);
router.post('/', protect, controller.createContato);
router.put('/:id', protect, controller.updateContato);
router.delete('/:id', protect, controller.deleteContato);

module.exports = router;
