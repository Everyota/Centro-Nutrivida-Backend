import bcrypt from 'bcrypt';
import * as repository from '../repositories/usuariosRepository.js';

const SALT_ROUNDS = 12;

export const registrar = async (datos) => {

    const {
        rut,
        nombres,
        apellidos,
        correo,
        celular,
        password,
        prevision = 'Fonasa'
    } = datos;

    // Validar campos obligatorios
    const campos = [
        rut, nombres, apellidos, correo, celular, password
    ];

    if (campos.some(campo =>
        typeof campo !== 'string' || !campo.trim()
    )) {
        throw new Error('Todos los campos son obligatorios');
    }

    // Normalizar datos
    const rutNormalizado = rut.replace(/\./g, '').trim().toUpperCase();
    const correoNormalizado = correo.trim().toLowerCase();

    // Validar correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoNormalizado)) {
        throw new Error('El correo no es válido');
    }

    // Validar RUT
    if (!validarRut(rutNormalizado)) {
        throw new Error('El RUT no es válido');
    }

    // Validar contraseña
    if (password.length < 8) {
        throw new Error('La contraseña no cumple los requisitos');
    }

    // Validar previsión
    const previsiones = ['Fonasa', 'Isapre', 'Particular'];

    if (!previsiones.includes(prevision)) {
        throw new Error('La previsión no es válida');
    }

    // Verificar si el usuario ya existe
    if (repository.buscarPorCorreo(correoNormalizado)) {
        throw new Error('No se pudo registrar el usuario');
    }

    if (repository.buscarPorRut(rutNormalizado)) {
        throw new Error('No se pudo registrar el usuario');
    }

    // Generar hash de la contraseña
    const password_hash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    // Guardar usuario
    const resultado = repository.crearUsuario({
        rut: rutNormalizado,
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
        correo: correoNormalizado,
        celular: celular.trim(),
        password_hash,
        prevision
    });

    // Retornar usuario sin contraseña
    return repository.buscarPorId(resultado.lastInsertRowid);
};


export const iniciarSesion = async (correo, password) => {

    // Validar datos recibidos
    if (
        typeof correo !== 'string' ||
        typeof password !== 'string' ||
        !correo.trim() ||
        !password ||
        Buffer.byteLength(password, 'utf8') > 72
    ) {
        throw new Error('Credenciales incorrectas');
    }

    // Buscar usuario
    const usuario = repository.buscarPorCorreo(
        correo.trim().toLowerCase()
    );

    if (!usuario) {
        throw new Error('Credenciales incorrectas');
    }

    // Comparar contraseña con el hash
    const passwordValida = await bcrypt.compare(
        password,
        usuario.password_hash
    );

    if (!passwordValida) {
        throw new Error('Credenciales incorrectas');
    }

    // Retornar usuario sin contraseña
    return repository.buscarPorId(usuario.id);
};


const validarRut = (rut) => {

    if (!/^[1-9]\d{6,7}-[\dK]$/.test(rut)) {
        return false;
    }

    const [numero, dv] = rut.split('-');

    let suma = 0;
    let multiplicador = 2;

    for (let i = numero.length - 1; i >= 0; i--) {

        suma += Number(numero[i]) * multiplicador;

        multiplicador = multiplicador === 7
            ? 2
            : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);

    const dvEsperado = resultado === 11
        ? '0'
        : resultado === 10
            ? 'K'
            : String(resultado);

    return dv === dvEsperado;
};