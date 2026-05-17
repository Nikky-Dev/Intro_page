# Intro Page Server

This is a small Express API that serves portfolio data. It can connect to MongoDB using the `MONGO_URI` environment variable.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set `MONGO_URI` in your environment (example for Windows PowerShell):

```powershell
$env:MONGO_URI = "mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority"
```

3. (Optional) Seed the database with example portfolio data:

```bash
npm run seed
```

4. Start the server:

```bash
npm start
```

The API endpoint is available at `http://localhost:5000/api/portfolio`.

## Viewing in MongoDB Compass

Copy the same `MONGO_URI` value into MongoDB Compass as the connection string. Replace credentials and database name as needed. If you're using a SRV connection string (`mongodb+srv://`), Compass will handle it automatically.
