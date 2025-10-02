const express = require('express');
const userController = require('../controllers/userController');
const { validateUserCreation } = require('../middleware/userValidation');

const router = express.Router();

router.get('/', userController.getAll); 
router.get('/:id', userController.getById); 
router.post('/', validateUserCreation, userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

router.get('/filtro/nombre/:nombre', userController.filterByNombre);
router.get('/filtro/apellido/:apellido', userController.filterByApellido);
router.get('/filtro/rol/:rolIdentifier', userController.filterByRol);

router.get('/top-comentaristas/:n', userController.getTopNComentaristas);

module.exports = router;