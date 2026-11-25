import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import categoriasRoutes from './src/routes/categoriasRoutes.js';
import serviciosRoutes from './src/routes/serviciosRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
const app = express();
// Permite leer el JSON que llega en las peticiones
app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/v1/categorias", categoriasRoutes);
app.use("/api/v1/servicios", serviciosRoutes);
app.use("/api/v1/auth", authRoutes);
app.listen(3000, () => {
    console.log("API en http://localhost:3000");
});