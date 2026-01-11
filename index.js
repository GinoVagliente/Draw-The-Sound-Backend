import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import SoundRouter from './routes/SongRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URL = `http://localhost:${PORT}`;

app.use(cors()); 

app.use(express.json());

app.use('/song', SoundRouter);

// Ruta base
app.get('/', (req, res) => {
  res.send('MicroServicio Administracion');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor MicServAdministracion levantado en ${URL}`);
});
