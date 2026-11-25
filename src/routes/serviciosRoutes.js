import express from 'express';
import {
    obtenerServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} from '../controllers/serviciosController.js';

const router = express.Router();

router.get('/', obtenerServicios);
router.post('/', crearServicio);
router.put('/:id', actualizarServicio);
router.delete('/:id', eliminarServicio);

export default router;
