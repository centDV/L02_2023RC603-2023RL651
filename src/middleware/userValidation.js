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

const validateUserCreation = [
    body('rolId')
        .exists({ checkFalsy: true }).withMessage('El rolId es obligatorio.')
        .isInt({ min: 1 }).withMessage('El rolId debe ser un número entero positivo.'),

    body('nombreUsuario')
        .trim()
        .exists({ checkFalsy: true }).withMessage('El nombre de usuario es obligatorio.')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres.'),

    body('clave')
        .exists({ checkFalsy: true }).withMessage('La clave es obligatoria.')
        .isLength({ min: 8 }).withMessage('La clave debe tener al menos 8 caracteres.'),

    body('nombre')
        .trim()
        .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio.')
        .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres.'),

    body('apellido')
        .trim()
        .exists({ checkFalsy: true }).withMessage('El apellido es obligatorio.')
        .isLength({ max: 50 }).withMessage('El apellido no debe exceder los 50 caracteres.'),
        
    handleValidationErrors
];


module.exports = {
    validateUserCreation
};