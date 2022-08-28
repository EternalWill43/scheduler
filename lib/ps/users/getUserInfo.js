import { connection } from '../psdb';

export const getUserInfo = async () => {
    let [rows] = await connection.promise().query("SELECT * FROM users;");
    console.log(rows);
}