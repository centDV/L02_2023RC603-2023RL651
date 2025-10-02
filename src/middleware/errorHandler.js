const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    const statusCode = err.status || err.statusCode || 500;
    const message = statusCode === 500 && process.env.NODE_ENV !== 'development'
        ? 'Error interno del servidor. Por favor, intente más tarde.'
        : err.message || 'Ha ocurrido un error inesperado.';

    res.status(statusCode).json({
        message: message,
        error: true,
    });
};

module.exports = errorHandler;