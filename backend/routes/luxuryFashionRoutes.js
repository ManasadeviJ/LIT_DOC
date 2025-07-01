const express = require('express');
const router = express.Router();
const controller = require('../controllers/luxuryFashionController');

router.post('/', controller.createLuxuryFashion);
router.get('/', controller.getAllLuxuryFashion);
router.get('/:id', controller.getLuxuryFashionById);
router.put('/:id', controller.updateLuxuryFashion);
router.delete('/:id', controller.deleteLuxuryFashion);

module.exports = router;
