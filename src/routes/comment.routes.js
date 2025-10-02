const express = require('express');
const commentController = require('../controllers/commentController');
const { validateCommentCreation, validateCommentUpdate } = require('../middleware/commentValidation');

const router = express.Router();

router.get('/', commentController.getAll); 
router.get('/:id', commentController.getById); 
router.post('/', validateCommentCreation, commentController.create);
router.put('/:id', validateCommentUpdate, commentController.update);
router.delete('/:id', commentController.delete);

module.exports = router;