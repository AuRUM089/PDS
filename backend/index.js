const express = require('express');
const app = express();

// Middleware (optional)
// app.use(express.json());

// Route für /
app.get('/', (req, res) => {
  res.send('Backend läuft!');
});

// Beispiel-Route für weitere Endpunkte
app.get('/init', (req, res) => {
  res.send('Init-Endpunkt funktioniert!');
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
