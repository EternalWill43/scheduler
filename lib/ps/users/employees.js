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
    return rows;
};

export const removeEmployee = async (firstName, lastName) => {
    let [rows] = await connection
        .promise()
        .query(
            "DELETE FROM employees where first_name like ? and last_name like ?;",
            [firstName, lastName]
        );
    return rows;
};

export const editEmployee = async (
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
            "UPDATE employees SET department_id = (SELECT department_id from departments where department like ?), shift_id = (SELECT shift_id from shifts where shift like ?), day1_id = (SELECT day_id from days where day like ?), day2_id = (SELECT day_id from days where day like ?) where first_name like ? and last_name like ?;",
            [departmentName, shiftName, day1Name, day2Name, firstName, lastName]
        );
    return rows;
};

export const setVacation = async (firstName, lastName, vacList) => {
    let obj = {
        daysOff: vacList,
    };
    let [rows] = await connection
        .promise()
        .query(
            "UPDATE employees SET vacation = ? where first_name like ? and last_name like ?;",
            [JSON.stringify(obj), firstName, lastName]
        );
    return rows;
};

export const getEmployeeVacation = async (firstName, lastName) => {
    let [rows] = await connection
        .promise()
        .query(
            "SELECT vacation from employees where first_name like ? and last_name like ?;",
            [firstName, lastName]
        );
    return rows;
}
