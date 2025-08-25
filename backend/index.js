import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// --- E-Mail Simulation ---
function sendEmail(to, subject, body) {
  console.log(`[E-Mail Simulation] To: ${to}, Subject: ${subject}, Body: ${body}`);
}

// --- Init Endpoint ---
app.post("/init", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT
      );
      CREATE TABLE IF NOT EXISTS parts (
        id SERIAL PRIMARY KEY,
        supplier_id INTEGER REFERENCES suppliers(id),
        name TEXT NOT NULL,
        packaging TEXT,
        status TEXT DEFAULT 'offen', -- offen, freigegeben, fehlerhaft
        customer_note TEXT
      );
    `);

    await pool.query(`DELETE FROM parts; DELETE FROM suppliers;`);

    // Muster GmbH + 2 Teile
    const supplier = await pool.query(
      "INSERT INTO suppliers (name, email) VALUES ($1, $2) RETURNING *",
      ["Muster GmbH", "muster@example.com"]
    );
    const supplier_id = supplier.rows[0].id;

    await pool.query(
      "INSERT INTO parts (supplier_id, name, packaging, status) VALUES ($1, $2, $3, $4)",
      [supplier_id, "Schraube M5", "Karton, 100 Stück", "freigegeben"]
    );
    await pool.query(
      "INSERT INTO parts (supplier_id, name, packaging, status) VALUES ($1, $2, $3, $4)",
      [supplier_id, "Mutter M5", "Plastikbeutel, 50 Stück", "fehlerhaft"]
    );

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- APIs ---
app.get("/suppliers", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM suppliers");
  res.json(rows);
});

app.get("/parts", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT parts.*, suppliers.name as supplier_name FROM parts JOIN suppliers ON parts.supplier_id = suppliers.id`
  );
  res.json(rows);
});

app.post("/parts", async (req, res) => {
  const { supplier_id, name, packaging } = req.body;
  const result = await pool.query(
    "INSERT INTO parts (supplier_id, name, packaging) VALUES ($1, $2, $3) RETURNING *",
    [supplier_id, name, packaging]
  );
  // Simulate email to customer
  sendEmail("kunde@example.com", "Neue Verpackungsangabe", `Teil: ${name}, Verpackung: ${packaging}`);
  res.json(result.rows[0]);
});

app.put("/parts/:id/status", async (req, res) => {
  const { status, customer_note } = req.body;
  const { id } = req.params;
  const part = await pool.query("SELECT * FROM parts WHERE id = $1", [id]);
  if (!part.rows.length) return res.status(404).json({ error: "Teil nicht gefunden" });

  await pool.query(
    "UPDATE parts SET status = $1, customer_note = $2 WHERE id = $3",
    [status, customer_note || "", id]
  );
  // Simulate email notification
  if (status === "freigegeben") {
    sendEmail("muster@example.com", "Angabe freigegeben", `Teil: ${part.rows[0].name} wurde freigegeben.`);
  } else if (status === "fehlerhaft") {
    sendEmail("muster@example.com", "Angabe fehlerhaft", `Teil: ${part.rows[0].name}: ${customer_note}`);
  }
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});