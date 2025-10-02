const { pool } = require('../config/db.config');

class RatingService {
    async getAllRatings() {
        const query = `
            select 
                c.calificacionid, 
                c.calificacion, 
                c.publicacionid, 
                c.usuarioid,
                u.nombre || ' ' || u.apellido as autor_calificacion,
                p.titulo as titulo_publicacion
            from calificaciones c
            join usuarios u on c.usuarioid = u.usuarioid
            join publicaciones p on c.publicacionid = p.publicacionid
            order by c.calificacionid desc
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async getRatingById(id) {
        const query = `
            select c.*, u.nombre || ' ' || u.apellido as autor_calificacion
            from calificaciones c
            join usuarios u on c.usuarioid = u.usuarioid
            where c.calificacionid = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async createRating({ publicacionId, calificacion, usuarioId }) {
        const query = `
            insert into calificaciones (publicacionid, calificacion, usuarioid) 
            values ($1, $2, $3) 
            returning calificacionid, publicacionid, calificacion, usuarioid
        `;
        const result = await pool.query(query, [publicacionId, calificacion, usuarioId]);
        return result.rows[0];
    }

    async updateRating(id, { calificacion }) {
        const query = `
            update calificaciones 
            set calificacion = $1 
            where calificacionid = $2 
            returning calificacionid, calificacion, publicacionid, usuarioid
        `;
        const result = await pool.query(query, [calificacion, id]);
        return result.rows[0];
    }

    async deleteRating(id) {
        const result = await pool.query('delete from calificaciones where calificacionid = $1', [id]);
        return result.rowCount > 0;
    }

}

module.exports = new RatingService();