import { connection } from "../psdb";

export const getShifts = async () => {
    let [rows] = await connection.promise().query("SELECT * from shifts;");
    return rows;
}

export const addShift = async (shift) => {
    let [rows] = await connection.promise().query("INSERT INTO shifts (shift) VALUES (?);", [shift]);
    return rows;
}

export const removeShift = async (shift) => {
    let [rows] = await connection.promise().query("DELETE FROM shifts WHERE shift like ?;", [shift]);
    return rows;
}
