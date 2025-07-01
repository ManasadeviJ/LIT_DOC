const express = require('express');
const router = express.Router();
const controller = require('../controllers/sneakerWorldController');

router.post('/', controller.createSneakerWorld);
router.get('/', controller.getAllSneakerWorld);
router.get('/:id', controller.getSneakerWorldById);
router.put('/:id', controller.updateSneakerWorld);
router.delete('/:id', controller.deleteSneakerWorld);

module.exports = router;
