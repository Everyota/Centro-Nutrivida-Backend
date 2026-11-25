import * as service from '../services/reservasService.js';

export const obtenerTodas = (req, res) => {
    try {
        res.json(service.obtenerTodas());

    } catch (error) {
        res.sendStatus(500);
    }
};

export const obtenerPorId = (req, res) => {
    try {
        const reserva = service.obtenerPorId(req.params.id);

        res.json(reserva);

    } catch (error) {
        res.status(404).json({
            mensaje: 'Reserva no encontrada'
        });
    }
};

export const obtenerMisReservas = (req, res) => {
    try {
        const reservas = service.obtenerPorUsuario(
            req.params.userId,
        );

        res.json(reservas);

    } catch (error) {
        res.sendStatus(500);
    }
};

export const crear = (req, res) => {
    try {
        const userId = req.body.usuario_id ?? null;

        const reserva = service.crear(req.body, userId);

        res.status(201).json(reserva);

    } catch (error) {
        console.error(error);
        res.status(400).json({
            mensaje:  `No se pudo crear la reserva: ${error.message}`
        });
    }
};

export const actualizar = (req, res) => {
    try {
        const reserva = service.actualizar(
            req.params.id,
            req.body
        );

        res.json(reserva);

    } catch (error) {
        res.status(400).json({
            mensaje: 'No se pudo actualizar la reserva'
        });
    }
};

export const eliminar = (req, res) => {
    try {
        service.eliminar(req.params.id);

        res.sendStatus(204);

    } catch (error) {
        res.status(404).json({
            mensaje: 'No se pudo eliminar la reserva'
        });
    }
};