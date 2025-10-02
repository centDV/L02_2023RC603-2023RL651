const { pool } = require('../config/db.config');

class PublicacionService {
    async getAllPublicaciones() {
        const query = `
            select 
                p.publicacionid,
                p.titulo,
                p.descripcion,
                p.usuarioid,
                u.nombre || ' ' || u.apellido as autor_nombre_completo
            from 
                publicaciones p
            join 
                usuarios u on p.usuarioid = u.usuarioid
            order by 
                p.publicacionid desc
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async getPublicacionById(id) {
        const query = `
            select 
                p.*,
                u.nombre || ' ' || u.apellido as autor_nombre_completo
            from 
                publicaciones p
            join 
                usuarios u on p.usuarioid = u.usuarioid
            where 
                p.publicacionid = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async createPublicacion({ titulo, descripcion, usuarioId }) {
        const query = `
            insert into publicaciones (titulo, descripcion, usuarioid) 
            values ($1, $2, $3) 
            returning publicacionid, titulo, descripcion, usuarioid
        `;
        const result = await pool.query(query, [titulo, descripcion, usuarioId]);
        return result.rows[0];
    }

    async updatePublicacion(id, { titulo, descripcion }) {
        const query = `
            update publicaciones 
            set titulo = $1, descripcion = $2 
            where publicacionid = $3 
            returning publicacionid, titulo, descripcion, usuarioid
        `;
        const result = await pool.query(query, [titulo, descripcion, id]);
        return result.rows[0];
    }

    async deletePublicacion(id) {
        const result = await pool.query('delete from publicaciones where publicacionid = $1', [id]);
        return result.rowCount > 0;
    }
}

module.exports = new PublicacionService();