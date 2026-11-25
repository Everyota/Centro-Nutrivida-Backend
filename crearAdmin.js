import 'dotenv/config';
import bcrypt from 'bcrypt';
import db from './src/config/database.js';

const crearAdmin = async () => {

    const adminExistente = db.prepare(`
        SELECT id FROM usuarios
        WHERE rol = 'ADMIN'
    `).get();

    if (adminExistente) {
        console.log('El administrador ya existe');
        return;
    }

    const password = process.env.ADMIN_PASSWORD;

    if (
        !password ||
        password.length < 8
    ) {
        throw new Error('ADMIN_PASSWORD no es válida');
    }

    const password_hash = await bcrypt.hash(password, 12);

    db.prepare(`
        INSERT INTO usuarios (
            rut,
            nombres,
            apellidos,
            correo,
            celular,
            password_hash,
            prevision,
            rol
        )
        VALUES (
            @rut,
            @nombres,
            @apellidos,
            @correo,
            @celular,
            @password_hash,
            'Particular',
            'ADMIN'
        )
    `).run({
        rut: process.env.ADMIN_RUT,
        nombres: process.env.ADMIN_NOMBRES,
        apellidos: process.env.ADMIN_APELLIDOS,
        correo: process.env.ADMIN_CORREO.trim().toLowerCase(),
        celular: process.env.ADMIN_CELULAR,
        password_hash
    });

    console.log('Administrador creado correctamente');
};

try {
    await crearAdmin();
} catch (error) {
    console.error('Error al crear administrador:', error.message);
    process.exitCode = 1;
}