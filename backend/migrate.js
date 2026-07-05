import mysql from "mysql2/promise";
import fs from "fs";

const connectionString = process.argv[2];

if (!connectionString) {
  console.error("❌ Error: Please provide your Aiven MySQL connection URI as an argument.");
  console.error("Usage: node migrate.js \"mysql://avnadmin:your_password@host:port/defaultdb?ssl-mode=REQUIRED\"");
  process.exit(1);
}

async function run() {
  console.log("Connecting to Aiven MySQL database...");
  const url = new URL(connectionString);
  
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: url.port || 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.substring(1),
    ssl: {
      rejectUnauthorized: false,
    },
    multipleStatements: true,
  });

  console.log("Connected successfully!");

  // Read SQL file content
  const sql = fs.readFileSync("./db.sql", "utf8");

  // Strip the entire header block including DROP DATABASE, CREATE DATABASE, and USE statements
  // This ensures all table creation happens inside Aiven's 'defaultdb' database
  let cleanedSql = sql
    .replace(/DROP DATABASE[\s\S]*?USE\s+\S+\s*;/i, "")  // remove DROP DB, CREATE DB, USE DB
    .replace(/USE\s+\S+\s*;/gi, "");                      // remove any remaining USE statements

  console.log("Executing table creation and seed scripts...");
  await connection.query(cleanedSql);

  console.log("✅ Database migration completed successfully!");
  await connection.end();
}

run().catch((err) => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
