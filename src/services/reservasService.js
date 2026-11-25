import * as repository from '../repositories/reservasRepository.js';
import * as usuarioRepository from '../repositories/usuariosRepository.js';
import { validarDatosReserva } from '../validaciones/reserva.js';
import { validarDatosPaciente } from '../validaciones/usuario.js';

export const obtenerTodas = () => {
    return repository.obtenerTodas();
};

export const obtenerPorId = (id) => {
    const reserva = repository.obtenerPorId(id);

    if (!reserva) {
        throw new Error('Reserva no encontrada');
    }

    return reserva;
};

export const obtenerPorUsuario = (userId) => {
    return repository.obtenerPorUsuario(userId);
};

export const crear = (datos, userId = null) => {

    const datosReserva = validarDatosReserva(datos);

    if (!repository.existeServicio(datosReserva.servicio_id)) {
        throw new Error('El servicio no existe');
    }

    let paciente;

    if (userId !== null) {

        // PACIENTE AUTENTICADO
        const usuario = usuarioRepository.buscarPorId(userId);

        if (!usuario || usuario.rol !== 'PACIENTE') {
            throw new Error('Paciente no válido');
        }

        paciente = {
            rut: usuario.rut,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            celular: usuario.celular,
            prevision: usuario.prevision
        };

    } else {

        // PACIENTE INVITADO
        paciente = validarDatosPaciente(datos);
    }

    const reserva = {
        ...paciente,
        ...datosReserva,
        user_id: userId
    };

    const resultado = repository.crear(reserva);

    return repository.obtenerPorId(resultado.lastInsertRowid);
};

export const actualizar = (id, datos) => {

    obtenerPorId(id);

    const datosReserva = validarDatosReserva(datos);

    repository.actualizar(id, datosReserva);

    return repository.obtenerPorId(id);
};

export const eliminar = (id) => {

    obtenerPorId(id);

    repository.eliminar(id);
};