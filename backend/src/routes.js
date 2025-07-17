const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { protect } = require('./autMidlleware');


router.get('/', protect, controller.getAllData);
router.get('/:id', protect, controller.getbyId);
router.post('/', protect, controller.createContato);
router.put('/:id', protect, controller.updateContato);
router.delete('/:id', protect, controller.deleteContato);

module.exports = router;
