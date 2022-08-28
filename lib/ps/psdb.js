import mysql from 'mysql2';

export const connection = mysql.createPool(import.meta.env.DATABASE_URL);