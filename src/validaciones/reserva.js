export const validarDatosReserva = (datos) => {

    const {
        fecha_reserva,
        nombre_profesional,
        servicio_id
    } = datos;
    console.log(datos)
    debugger
    if (
        typeof fecha_reserva !== 'string' ||
        typeof nombre_profesional !== 'string' ||
        !nombre_profesional.trim() ||
        !Number.isInteger(servicio_id) ||
        servicio_id <= 0
    ) {
        throw new Error('Datos de reserva inválidos');
    }

    const fecha = new Date(fecha_reserva);

    if (Number.isNaN(fecha.getTime())) {
        throw new Error('La fecha no es válida');
    }

    if (fecha.getTime() <= Date.now()) {
        throw new Error('La fecha debe ser futura');
    }

    return {
        fecha_reserva: fecha.toISOString(),
        nombre_profesional: nombre_profesional.trim(),
        servicio_id
    };
};
