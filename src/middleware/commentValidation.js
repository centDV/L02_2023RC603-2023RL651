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

const validateCommentCreation = [
    body('publicacionId')
        .exists({ checkFalsy: true }).withMessage('El ID de la publicación es obligatorio.')
        .isInt({ min: 1 }).withMessage('El ID de la publicación debe ser un número entero positivo.'),

    body('usuarioId')
        .exists({ checkFalsy: true }).withMessage('El ID del usuario es obligatorio.')
        .isInt({ min: 1 }).withMessage('El ID del usuario debe ser un número entero positivo.'),

    body('comentario')
        .trim()
        .exists({ checkFalsy: true }).withMessage('El contenido del comentario es obligatorio.')
        .isLength({ min: 3, max: 500 }).withMessage('El comentario debe tener entre 3 y 500 caracteres.'),
        
    handleValidationErrors
];

const validateCommentUpdate = [
    body('comentario')
        .optional()
        .trim()
        .isLength({ min: 3, max: 500 }).withMessage('El comentario debe tener entre 3 y 500 caracteres.'),
        
    handleValidationErrors
];


module.exports = {
    validateCommentCreation,
    validateCommentUpdate
};