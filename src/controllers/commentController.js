const commentService = require('../services/commentService');

class CommentController {
    async getAll(req, res, next) {
        try {
            const comments = await commentService.getAllComments();
            res.json(comments);
        } catch (error) {
            next(error); 
        }
    }

    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de comentario inválido." });
            
            const comment = await commentService.getCommentById(id);
            if (!comment) return res.status(404).json({ message: `Comentario con ID ${id} no encontrado.` });
            
            res.json(comment);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const newComment = await commentService.createComment(req.body);
            res.status(201).json(newComment);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de comentario inválido." });

            const updatedComment = await commentService.updateComment(id, req.body);
            if (!updatedComment) return res.status(404).json({ message: `Comentario con ID ${id} no encontrado para actualizar.` });

            res.json(updatedComment);
        } catch (error) {
            next(error);
        }
    }
    
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de comentario inválido." });

            const success = await commentService.deleteComment(id);
            if (!success) return res.status(404).json({ message: `Comentario con ID ${id} no encontrado para eliminar.` });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CommentController();