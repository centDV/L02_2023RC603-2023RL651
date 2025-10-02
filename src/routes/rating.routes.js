const express = require('express');
const ratingController = require('../controllers/ratingController');
const { validateRatingCreation, validateRatingUpdate } = require('../middleware/ratingValidation');

const router = express.Router();


router.get('/', ratingController.getAll); 
router.get('/:id', ratingController.getById); 
router.post('/', validateRatingCreation, ratingController.create);
router.put('/:id', validateRatingUpdate, ratingController.update);
router.delete('/:id', ratingController.delete);

module.exports = router;