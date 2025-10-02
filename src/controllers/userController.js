const userService = require('../services/userService');

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error); 
        }
    }

    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de usuario inválido." });
            
            const user = await userService.getUserById(id);
            if (!user) return res.status(404).json({ message: `Usuario con ID ${id} no encontrado.` });
            
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de usuario inválido." });

            const updatedUser = await userService.updateUser(id, req.body);
            if (!updatedUser) return res.status(404).json({ message: `Usuario con ID ${id} no encontrado para actualizar.` });

            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
    
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "ID de usuario inválido." });

            const success = await userService.deleteUser(id);
            if (!success) return res.status(404).json({ message: `Usuario con ID ${id} no encontrado para eliminar.` });

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async filterByNombre(req, res, next) {
        try {
            const users = await userService.filterByNombre(req.params.nombre);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    
    async filterByApellido(req, res, next) {
        try {
            const users = await userService.filterByApellido(req.params.apellido);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async filterByRol(req, res, next) {
        try {
            const users = await userService.filterByRol(req.params.rolIdentifier);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getTopNComentaristas(req, res, next) {
        try {
            const n = parseInt(req.params.n);
            
            if (isNaN(n)) {
                return res.status(400).json({ message: "El parámetro N debe ser un número entero." });
            }

            const topUsers = await userService.getTopN(n);
            res.json(topUsers);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();