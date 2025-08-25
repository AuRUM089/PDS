const express = require('express');
const app = express();

// Beispiel-Middleware für JSON-Requests
app.use(express.json());

// Route für die Startseite (wichtig für Render!)
app.get('/', (req, res) => {
  res.send('Backend läuft!');
});

// Beispielroute für /init
app.get('/init', (req, res) => {
  res.json({ status: 'Init-Endpunkt funktioniert!' });
});

// Beispielroute für /api/status
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// Beispiel für eine Datenbank-Verbindung (auskommentiert, falls noch nicht genutzt)
// const db = require('./db.js');

// Beispiel für Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ein Fehler ist aufgetreten!' });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
