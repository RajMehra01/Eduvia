import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'skillstream_lms_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  console.log('⚡ MySQL Pool Configured for skillstream_lms_db');
} catch (err) {
  console.warn('⚠️ Could not connect to MySQL. Server will use mock store fallback.');
}

export default pool;
