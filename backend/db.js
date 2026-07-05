import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    db = mysql.createPool({
      host: url.hostname,
      port: url.port || 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.substring(1),
      ssl: {
        rejectUnauthorized: false,
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } catch (err) {
    console.error("Failed to parse DATABASE_URL, falling back to direct connection:", err.message);
    db = mysql.createPool(process.env.DATABASE_URL);
  }
} else {
  db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export default db;