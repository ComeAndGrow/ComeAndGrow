import postgres from "postgres";
import { config } from "dotenv";
config();

const sql = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
    onnotice(notice) {
        console.log(notice, "Notice from PostgreSQL");
    },
});

async function createUserTable() {

    // Gotta Encrypt the Passwords Later // TODO
    // Create users table if it does not exist
    const userTable = await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            ip VARCHAR(45) NOT NULL,
            last_login TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    console.log("Users table created or already exists:", userTable);

}

async function createConfigTable() {

    // Gotta Encrypt the Passwords Later // TODO
    // Create users table if it does not exist
    const configTable = await sql`
        CREATE TABLE IF NOT EXISTS config (
            id SERIAL PRIMARY KEY,
            key VARCHAR(50) NOT NULL UNIQUE,
            value TEXT NOT NULL,
            visible BOOLEAN,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const configEntries = {
        siteName: process.env.siteName,
        primaryColor: process.env.primaryColor,
        secondaryColor: process.env.secondaryColor,
        textColor: process.env.textColor,
        logoPNG: process.env.logoPNG,
    };

    for (const [key, value] of Object.entries(configEntries)) {
        if (value !== undefined) {
            await sql`
                INSERT INTO config (key, value, visible)
                VALUES (${key}, ${value}, true)
                ON CONFLICT (key) DO NOTHING;
            `;
        }
    }

    console.log("Config table created or already exists:", configTable);

}

// Call the table creation function after connection is established
createUserTable().catch((err) => {
    console.error("Error creating users table:", err);
});

createConfigTable().catch((err) => {
    console.error("Error creating config table:", err);
});

export default sql;