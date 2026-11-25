import db from '../config/database.js';

export const obtenerTodas = () => {
    return db.prepare(`
        SELECT r.*, s.nombre AS nombre_servicio
        FROM reservas r
        JOIN servicios s ON r.servicio_id = s.id
        ORDER BY r.fecha_reserva ASC
    `).all();
};

export const obtenerPorId = (id) => {
    return db.prepare(`
        SELECT r.*, s.nombre AS nombre_servicio
        FROM reservas r
        JOIN servicios s ON r.servicio_id = s.id
        WHERE r.id = ?
    `).get(id);
};

export const obtenerPorUsuario = (userId) => {
    return db.prepare(`
        SELECT r.*, s.nombre AS nombre_servicio
        FROM reservas r
        JOIN servicios s ON r.servicio_id = s.id
        WHERE r.user_id = ?
        ORDER BY r.fecha_reserva ASC
    `).all(userId);
};

export const crear = (reserva) => {
    return db.prepare(`
        INSERT INTO reservas (
            rut,
            nombres,
            apellidos,
            correo,
            celular,
            prevision,
            fecha_reserva,
            nombre_profesional,
            servicio_id,
            user_id
        )
        VALUES (
            @rut,
            @nombres,
            @apellidos,
            @correo,
            @celular,
            @prevision,
            @fecha_reserva,
            @nombre_profesional,
            @servicio_id,
            @user_id
        )
    `).run(reserva);
};

export const actualizar = (id, reserva) => {
    return db.prepare(`
        UPDATE reservas
        SET
            fecha_reserva = @fecha_reserva,
            nombre_profesional = @nombre_profesional,
            servicio_id = @servicio_id
        WHERE id = @id
    `).run({ ...reserva, id });
};

export const eliminar = (id) => {
    return db.prepare(`
        DELETE FROM reservas
        WHERE id = ?
    `).run(id);
};

export const existeServicio = (id) => {
    return db.prepare(`
        SELECT id FROM servicios WHERE id = ?
    `).get(id);
};