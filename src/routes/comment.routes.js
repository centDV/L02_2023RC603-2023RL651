const express = require('express');
const commentController = require('../controllers/commentController');
const { validateCommentCreation, validateCommentUpdate } = require('../middleware/commentValidation');

const router = express.Router();

router.get('/', commentController.getAll); 
router.get('/:id', commentController.getById); 
router.post('/', validateCommentCreation, commentController.create);
router.put('/:id', validateCommentUpdate, commentController.update);
router.delete('/:id', commentController.delete);

router.get('/filtro/publicacion/:publicacionId', commentController.filterByPublicacion);
router.get('/filtro/usuario/:usuarioId', commentController.filterByUsuario);

module.exports = router;