export const validarDatosPaciente = (datos) => {

    const {
        rut,
        nombres,
        apellidos,
        correo,
        celular,
        prevision = 'Fonasa'
    } = datos;

    const campos = [
        rut,
        nombres,
        apellidos,
        correo,
        celular
    ];

    if (campos.some(campo =>
        typeof campo !== 'string' || !campo.trim()
    )) {
        throw new Error('Todos los campos son obligatorios');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
        throw new Error('Correo inválido');
    }

    const previsiones = ['Fonasa', 'Isapre', 'Particular'];

    if (!previsiones.includes(prevision)) {
        throw new Error('Previsión inválida');
    }

    return {
        rut: rut.replace(/\./g, '').trim().toUpperCase(),
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim().toLowerCase(),
        celular: celular.trim(),
        prevision
    };
};