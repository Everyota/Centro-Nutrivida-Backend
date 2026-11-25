import { Router } from 'express';
import * as controller from '../controllers/reservasController.js';

const router = Router();

router.post('/', controller.crear);

router.get(
    '/mis-reservas/:userId',
    controller.obtenerMisReservas
);

router.get(
    '/',
    controller.obtenerTodas
);

router.get(
    '/:id',
    controller.obtenerPorId
);

router.put(
    '/:id',
    controller.actualizar
);

router.delete(
    '/:id',
    controller.eliminar
);

export default router;