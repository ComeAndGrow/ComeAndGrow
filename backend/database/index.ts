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

// Call the table creation function after connection is established
createUserTable().catch((err) => {
    console.error("Error creating users table:", err);
});

export default sql;