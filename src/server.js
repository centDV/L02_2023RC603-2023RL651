const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/user.routes');
const publicacionRoutes = require('./routes/publicacion.routes');
const commentRoutes = require('./routes/comment.routes');
const ratingRoutes = require('./routes/rating.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/publicaciones', publicacionRoutes);
app.use('/api/comentarios', commentRoutes);
app.use('/api/calificaciones', ratingRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Run 'npm run dev' to use nodemon for development.`);
});