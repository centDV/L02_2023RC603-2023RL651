const { pool } = require('../config/db.config');

class CommentService {
    async getAllComments() {
        const query = `
            select 
                c.comentarioid, 
                c.publicacionid, 
                c.comentario, 
                c.usuarioid,
                u.nombre || ' ' || u.apellido as autor_comentario,
                p.titulo as titulo_publicacion
            from comentarios c
            join usuarios u on c.usuarioid = u.usuarioid
            join publicaciones p on c.publicacionid = p.publicacionid
            order by c.comentarioid desc
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async getCommentById(id) {
        const query = `
            select c.*, u.nombre || ' ' || u.apellido as autor_comentario
            from comentarios c
            join usuarios u on c.usuarioid = u.usuarioid
            where c.comentarioid = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async createComment({ publicacionId, comentario, usuarioId }) {
        const query = `
            insert into comentarios (publicacionid, comentario, usuarioid) 
            values ($1, $2, $3) 
            returning comentarioid, publicacionid, comentario, usuarioid
        `;
        const result = await pool.query(query, [publicacionId, comentario, usuarioId]);
        return result.rows[0];
    }

    async updateComment(id, { comentario }) {
        const query = `
            update comentarios 
            set comentario = $1 
            where comentarioid = $2 
            returning comentarioid, comentario, publicacionid, usuarioid
        `;
        const result = await pool.query(query, [comentario, id]);
        return result.rows[0];
    }

    async deleteComment(id) {
        const result = await pool.query('delete from comentarios where comentarioid = $1', [id]);
        return result.rowCount > 0;
    }

    async filterByPublicacion(publicacionId) {
        const query = `
            select 
                c.comentarioid, 
                c.comentario, 
                u.nombre || ' ' || u.apellido as autor_comentario
            from comentarios c
            join usuarios u on c.usuarioid = u.usuarioid
            where c.publicacionid = $1
            order by c.comentarioid asc
        `;
        const result = await pool.query(query, [publicacionId]);
        return result.rows;
    }

    async filterByUsuario(usuarioId) {
        const query = `
            select 
                c.comentarioid, 
                c.comentario, 
                p.titulo as titulo_publicacion
            from comentarios c
            join publicaciones p on c.publicacionid = p.publicacionid
            where c.usuarioid = $1
            order by c.comentarioid desc
        `;
        const result = await pool.query(query, [usuarioId]);
        return result.rows;
    }
}

module.exports = new CommentService();