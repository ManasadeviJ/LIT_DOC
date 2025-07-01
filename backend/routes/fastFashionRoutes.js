const express = require('express');
const router = express.Router();
const controller = require('../controllers/fastfashionController');

router.post('/', controller.createFastFashion);
router.get('/', controller.getAllFastFashion);
router.get('/:id', controller.getFastFashionById);
router.put('/:id', controller.updateFastFashion);
router.delete('/:id', controller.deleteFastFashion);

module.exports = router;
