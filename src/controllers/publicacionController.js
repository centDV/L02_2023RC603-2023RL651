const publicacionService = require('../services/publicacionService');

class PublicacionController {
    async getAll(req, res, next) {
        try {
            const publicaciones = await publicacionService.getAllPublicaciones();
            res.json(publicaciones);
        } catch (error) {
            next(error); 
        }
    }

    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de publicación inválido." });
            
            const publicacion = await publicacionService.getPublicacionById(id);
            if (!publicacion) return res.status(404).json({ message: `Publicación con ID ${id} no encontrada.` });
            
            res.json(publicacion);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            // El servicio maneja el error si el usuarioId no existe (depende de la FK de la DB)
            const newPublicacion = await publicacionService.createPublicacion(req.body);
            res.status(201).json(newPublicacion);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de publicación inválido." });

            const updatedPublicacion = await publicacionService.updatePublicacion(id, req.body);
            if (!updatedPublicacion) return res.status(404).json({ message: `Publicación con ID ${id} no encontrada para actualizar.` });

            res.json(updatedPublicacion);
        } catch (error) {
            next(error);
        }
    }
    
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de publicación inválido." });

            const success = await publicacionService.deletePublicacion(id);
            if (!success) return res.status(404).json({ message: `Publicación con ID ${id} no encontrada para eliminar.` });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PublicacionController();