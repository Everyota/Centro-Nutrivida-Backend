import express from "express";
import cors from "cors";
import morgan from 'morgan';
const app = express();
// Permite leer el JSON que llega en las peticiones
app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.listen(3000, () => {
    console.log("API en http://localhost:3000");
});