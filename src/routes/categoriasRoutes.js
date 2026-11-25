import express from 'express';
import {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    obtenerServiciosDeCategoria
} from '../controllers/categoriasController.js';

const router = express.Router();

router.get('/', obtenerCategorias);
router.post('/', crearCategoria);
router.put('/:id', actualizarCategoria);
router.delete('/:id', eliminarCategoria);
router.get('/:id/servicios', obtenerServiciosDeCategoria);

export default router;