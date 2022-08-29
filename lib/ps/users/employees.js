import { connection } from "../psdb";

export const getEmployees = async () => {
    let [rows] = await connection.promise().query("SELECT * from employees;");
    return rows;
};

export const addEmployee = async (
    firstName,
    lastName,
    departmentName,
    shiftName,
    day1Name,
    day2Name
) => {
    let [rows] = await connection
        .promise()
        .query(
            "INSERT INTO employees (first_name, last_name, department_id, shift_id, day1_id, day2_id) values (?, ?, (SELECT department_id from departments where department like ?), (SELECT shift_id from shifts where shift like ?), (SELECT day_id from days where day like ?), (SELECT day_id from days where day like ?));",
            [firstName, lastName, departmentName, shiftName, day1Name, day2Name]
        );
    console.log(rows);
    return rows;
};
