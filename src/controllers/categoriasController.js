import db from '../config/database.js';

export const obtenerCategorias = (req, res) => {
    const categorias = db.prepare('SELECT * FROM categorias').all();
    res.status(200).json(categorias);
}

export const crearCategoria = (req, res) => {
    const { nombre, descripcion, pagina, imagen } = req.body;
    const queryCreacion = db.prepare('INSERT INTO categorias (nombre, descripcion, pagina, imagen) VALUES (?, ?, ?, ?)');
    const resultadoCreacion = queryCreacion.run(nombre, descripcion, pagina, imagen);
    res.status(201).json({ id: resultadoCreacion.lastInsertRowid, nombre, descripcion, pagina, imagen });
}

export const actualizarCategoria = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, pagina, imagen } = req.body;
    const queryActualizacion = db.prepare('UPDATE categorias SET nombre = ?, descripcion = ?, pagina = ?, imagen = ? WHERE id = ?');
    queryActualizacion.run(nombre, descripcion, pagina, imagen, id);
    res.status(200).json({ id, nombre, descripcion, pagina, imagen });
}

export const eliminarCategoria = (req, res) => {
    const { id } = req.params;
    const queryEliminacion = db.prepare('DELETE FROM categorias WHERE id = ?');
    queryEliminacion.run(id);
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
}

export const obtenerServiciosDeCategoria = (req, res) => {
    const { id } = req.params;
    const servicios = db.prepare('SELECT * FROM servicios WHERE categoria_id = ?').all(id);
    res.status(200).json(servicios);
}
