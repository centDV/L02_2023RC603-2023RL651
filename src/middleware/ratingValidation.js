const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Error de validación de datos.",
            errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
        });
    }
    next();
};

const validateRatingCreation = [
    body('publicacionId')
        .exists({ checkFalsy: true }).withMessage('El ID de la publicación es obligatorio.')
        .isInt({ min: 1 }).withMessage('El ID de la publicación debe ser un número entero positivo.'),

    body('usuarioId')
        .exists({ checkFalsy: true }).withMessage('El ID del usuario es obligatorio.')
        .isInt({ min: 1 }).withMessage('El ID del usuario debe ser un número entero positivo.'),

    body('calificacion')
        .exists({ checkFalsy: true }).withMessage('La calificación es obligatoria.')
        .isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser un número entero entre 1 y 5.'),
        
    handleValidationErrors
];

const validateRatingUpdate = [
    body('calificacion')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser un número entero entre 1 y 5.'),
        
    handleValidationErrors
];

module.exports = {
    validateRatingCreation,
    validateRatingUpdate
};