import db from '../config/database.js';

export const crearUsuario = (usuario) => {
    return db.prepare(`
        INSERT INTO usuarios (
            rut,
            nombres,
            apellidos,
            correo,
            celular,
            password_hash,
            prevision
        )
        VALUES (
            @rut,
            @nombres,
            @apellidos,
            @correo,
            @celular,
            @password_hash,
            @prevision
        )
    `).run(usuario);
};

export const buscarPorCorreo = (correo) => {
    return db.prepare(`
        SELECT *
        FROM usuarios
        WHERE correo = ?
    `).get(correo);
};

export const buscarPorRut = (rut) => {
    return db.prepare(`
        SELECT *
        FROM usuarios
        WHERE rut = ?
    `).get(rut);
};

export const buscarPorId = (id) => {
    return db.prepare(`
        SELECT
            id,
            rut,
            nombres,
            apellidos,
            correo,
            celular,
            prevision,
            rol,
            fecha_registro
        FROM usuarios
        WHERE id = ?
    `).get(id);
};