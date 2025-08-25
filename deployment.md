# Deployment-Anleitung: Lieferanten & Verpackung (MVP) auf Render

## 1. GitHub-Repo anlegen
- Neues Repository bei GitHub erstellen (z.B. `lieferanten-mvp`)
- Verzeichnisstruktur wie oben (backend/, frontend/...)

## 2. Dateien hochladen
- Alle oben bereitgestellten Dateien in dein Repo kopieren.
- Commit & Push.

## 3. Render Web Service einrichten
- Auf [Render.com](https://render.com/) einloggen.
- "New Web Service" → "Connect Repository" → Repo auswählen.
- Für das **Backend**:
  - Root: `/backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment: Node.js
  - **Environment Variables**: `DATABASE_URL` (siehe unten), optional `PORT=4000`
- Für das **Frontend**:
  - Root: `/frontend`
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start` (alternativ: Serve Static, dann `/frontend/build` als Static Site)
  - **Environment Variables**: `REACT_APP_API_BASE` auf die Backend-URL setzen (z.B. `https://lieferanten-backend.onrender.com`)

## 4. PostgreSQL-Datenbank anlegen
- "New PostgreSQL" → Datenbank anlegen.
- Connection-String kopieren (`postgresql://USER:PASSWORD@HOST:PORT/DATABASE`)

## 5. DATABASE_URL setzen
- Im Backend-Service unter "Environment" die Variable `DATABASE_URL` mit dem Connection-String setzen.

## 6. /init Endpoint aufrufen
- Nach dem ersten Start: Backend-URL aufrufen (z.B. `https://lieferanten-backend.onrender.com/init`).
- Dadurch werden Tabellen angelegt und Beispieldaten eingefügt.

## 7. App testen
- Frontend öffnen.
- Es sind zwei Teile von "Muster GmbH" sichtbar (einer freigegeben, einer fehlerhaft).
- MVP-Prozess durchspielen!

---

**Hinweis E-Mail:**  
Die E-Mail-Benachrichtigung ist im Backend als Konsolen-Log implementiert und kann im Render-Log eingesehen werden.

**Sprache:**  
Die Sprachumschaltung ist oben im Frontend möglich (Deutsch/Englisch).

**Minimalistisch:**  
Das Design ist absichtlich schlicht gehalten, um MVP-Charakter zu zeigen.

---

**Fertig!** 🎉