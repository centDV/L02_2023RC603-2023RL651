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

const validatePublicacionCreation = [
    body('titulo')
        .trim()
        .exists({ checkFalsy: true }).withMessage('El título es obligatorio.')
        .isLength({ min: 5, max: 200 }).withMessage('El título debe tener entre 5 y 200 caracteres.'),

    body('descripcion')
        .trim()
        .exists({ checkFalsy: true }).withMessage('La descripción es obligatoria.')
        .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres.'),
        
    body('usuarioId')
        .exists({ checkFalsy: true }).withMessage('El usuarioId (autor) es obligatorio.')
        .isInt({ min: 1 }).withMessage('El usuarioId debe ser un número entero positivo.'),
        
    handleValidationErrors
];

const validatePublicacionUpdate = [
    body('titulo')
        .optional() 
        .trim()
        .isLength({ min: 5, max: 200 }).withMessage('El título debe tener entre 5 y 200 caracteres.'),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres.'),
        
    handleValidationErrors
];


module.exports = {
    validatePublicacionCreation,
    validatePublicacionUpdate
};