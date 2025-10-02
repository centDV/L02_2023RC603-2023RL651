require('dotenv').config(); 

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

const userRoutes = require('./routes/user.routes');
const publicacionRoutes = require('./routes/publicacion.routes');
const commentRoutes = require('./routes/comment.routes');
const ratingRoutes = require('./routes/rating.routes');

app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/publicaciones', publicacionRoutes);
app.use('/api/comentarios', commentRoutes);
app.use('/api/calificaciones', ratingRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    res.status(status).json({ message });
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});