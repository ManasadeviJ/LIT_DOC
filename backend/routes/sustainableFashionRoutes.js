const express = require('express');
const router = express.Router();
const controller = require('../controllers/sustainableFashionController');

router.post('/', controller.createSustainableFashion);
router.get('/', controller.getAllSustainableFashion);
router.get('/:id', controller.getSustainableFashionById);
router.put('/:id', controller.updateSustainableFashion);
router.delete('/:id', controller.deleteSustainableFashion);

module.exports = router;
