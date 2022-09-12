// import mysql from 'mysql2';
import { createPool } from "mysql2";
// import * as mysql from "mysql2/typings/mysql";

export const connection = createPool(import.meta.env.DATABASE_URL);