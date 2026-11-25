import db from '../config/database.js';

export const obtenerServicios = (req, res) => {
    const servicios = db.prepare('SELECT * FROM servicios').all();
    res.status(200).json(servicios);
}

export const crearServicio = (req, res) => {
    const { nombre, descripcion, precio, imagen, categoriaId } = req.body;
    const queryCreacion = db.prepare('INSERT INTO servicios (nombre, descripcion, precio, imagen, categoria_id) VALUES (?, ?, ?, ?, ?)');
    const resultadoCreacion = queryCreacion.run(nombre, descripcion, precio, imagen, categoriaId);
    res.status(201).json({ id: resultadoCreacion.lastInsertRowid, nombre, descripcion, precio, imagen, categoriaId });
}

export const actualizarServicio = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen, categoriaId } = req.body;
    const queryActualizacion = db.prepare('UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, categoria_id = ? WHERE id = ?');
    queryActualizacion.run(nombre, descripcion, precio, imagen, categoriaId, id);
    res.status(200).json({ id, nombre, descripcion, precio, imagen, categoriaId });
}

export const eliminarServicio = (req, res) => {
    const { id } = req.params;
    const queryEliminacion = db.prepare('DELETE FROM servicios WHERE id = ?');
    queryEliminacion.run(id);
    res.status(200).json({ message: 'Servicio eliminado correctamente' });
}
