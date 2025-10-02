const express = require('express');
const publicacionController = require('../controllers/publicacionController');
const { validatePublicacionCreation, validatePublicacionUpdate } = require('../middleware/publicacionValidation');

const router = express.Router();

router.get('/', publicacionController.getAll); 
router.get('/:id', publicacionController.getById); 
router.post('/', validatePublicacionCreation, publicacionController.create);
router.put('/:id', validatePublicacionUpdate, publicacionController.update);
router.delete('/:id', publicacionController.delete);

module.exports = router;