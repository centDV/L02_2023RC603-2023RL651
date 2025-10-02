const { pool } = require('../config/db.config');

class UserService {
    async getAllUsers() {
        const result = await pool.query('select usuarioid, rolid, nombreusuario, nombre, apellido from usuarios');
        return result.rows;
    }

    async getUserById(id) {
        const result = await pool.query('select usuarioid, rolid, nombreusuario, nombre, apellido from usuarios where usuarioid = $1', [id]);
        return result.rows[0];
    }

    async createUser({ rolId, nombreUsuario, clave, nombre, apellido }) {
        if (!nombreUsuario || !clave || !rolId) {
            const error = new Error("Nombre de usuario, clave y rolId son requeridos.");
            error.status = 400;
            throw error;
        }

        const query = `
            insert into usuarios (rolid, nombreusuario, clave, nombre, apellido) 
            values ($1, $2, $3, $4, $5) 
            returning usuarioid, nombreusuario, nombre, apellido, rolid
        `;
        const result = await pool.query(query, [rolId, nombreUsuario, clave, nombre, apellido]);
        return result.rows[0];
    }

    async updateUser(id, { rolId, nombreUsuario, nombre, apellido }) {
        const query = `
            update usuarios 
            set rolid = $1, nombreusuario = $2, nombre = $3, apellido = $4
            where usuarioid = $5 
            returning usuarioid, nombreusuario, nombre, apellido, rolid
        `;
        const result = await pool.query(query, [rolId, nombreUsuario, nombre, apellido, id]);
        return result.rows[0];
    }

    async deleteUser(id) {
        const result = await pool.query('delete from usuarios where usuarioid = $1', [id]);
        return result.rowCount > 0;
    }

    async getTopN(n) {
        if (n <= 0) {
            const error = new Error("El valor de N debe ser un número positivo.");
            error.status = 400;
            throw error;
        }

        const query = `
            select 
                u.nombreusuario,
                u.nombre || ' ' || u.apellido as nombre_completo,
                count(c.comentarioid) as total_comentarios
            from 
                usuarios u
            join 
                comentarios c on u.usuarioid = c.usuarioid
            group by 
                u.usuarioid, u.nombre, u.apellido, u.nombreusuario
            order by 
                total_comentarios desc
            limit $1;
        `;
        const result = await pool.query(query, [n]);
        return result.rows;
    }
}

module.exports = new UserService();