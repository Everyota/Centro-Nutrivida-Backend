import * as service from '../services/authService.js';

export const registrar = async (req, res) => {

    try {
        const usuario = await service.registrar(req.body);

        res.status(201).json(usuario);

    } catch (error) {
        res.status(400).json({
            mensaje: 'No se pudo registrar el usuario'
        });
    }
};


export const login = async (req, res) => {

    try {
        const { correo, password } = req.body;

        const usuario = await service.iniciarSesion(
            correo,
            password
        );

        res.json(usuario);

    } catch (error) {
        res.status(401).json({
            mensaje: 'Credenciales incorrectas'
        });
    }
};

