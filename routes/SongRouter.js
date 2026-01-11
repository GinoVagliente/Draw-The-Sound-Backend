import express from 'express';
import { searchSongByName } from '../services/SongService.js';

const router = express.Router();

router.get('/search/:name', async (req, res) => {
  const artistName = req.params.name;
  const accessToken = process.env.SPOTIFY_TOKEN;
  try {
    const artistData = await searchSongByName(artistName, accessToken);
    if (!artistData) return res.status(404).json({ error: 'Cancion no encontrada' });
    res.json(artistData);
  } catch (error) {
    res.status(500).json({ error: 'Error buscando Cancion' });
  }
});

export default router;
