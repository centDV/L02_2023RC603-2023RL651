const ratingService = require('../services/ratingService');

class RatingController {
    async getAll(req, res, next) {
        try {
            const ratings = await ratingService.getAllRatings();
            res.json(ratings);
        } catch (error) {
            next(error); 
        }
    }

    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de calificación inválido." });
            
            const rating = await ratingService.getRatingById(id);
            if (!rating) return res.status(404).json({ message: `Calificación con ID ${id} no encontrada.` });
            
            res.json(rating);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const newRating = await ratingService.createRating(req.body);
            res.status(201).json(newRating);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de calificación inválido." });

            const updatedRating = await ratingService.updateRating(id, req.body);
            if (!updatedRating) return res.status(404).json({ message: `Calificación con ID ${id} no encontrada para actualizar.` });

            res.json(updatedRating);
        } catch (error) {
            next(error);
        }
    }
    
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de calificación inválido." });

            const success = await ratingService.deleteRating(id);
            if (!success) return res.status(404).json({ message: `Calificación con ID ${id} no encontrada para eliminar.` });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async filterByPublicacion(req, res, next) {
        try {
            const pubId = parseInt(req.params.publicacionId);
            if (isNaN(pubId)) return res.status(400).json({ message: "ID de publicación inválido." });
            
            const ratings = await ratingService.filterByPublicacion(pubId);
            res.json(ratings);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RatingController();