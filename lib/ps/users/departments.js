import { connection } from "../psdb";

export const getDepartments = async () => {
    let [rows] = await connection.promise().query("SELECT * from departments;");
    return rows;
}

export const removeDepartment = async (department) => {
    let [rows] = await connection.promise().query("DELETE FROM departments WHERE department like ?;", [department]);
    return rows;
}

export const addDepartment = async (department) => {
    let [rows] = await connection.promise().query("INSERT INTO departments (department) VALUES (?);", [department]);
    return rows;
}
