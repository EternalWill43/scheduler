// @ts-ignore
import { connection } from "../psdb";

export const getEmployees = async () => {
    let [rows] = await connection.promise().query("SELECT * from employees;");
    return rows;
};

/**
 * 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} departmentName 
 * @param {string} shiftName 
 * @param {string} day1Name 
 * @param {string} day2Name 
 * @returns object with affected rows affectedRows
 */
export const addEmployee = async (
    firstName: string,
    lastName: string,
    departmentName: string,
    shiftName: string,
    day1Name: string,
    day2Name: string
) => {
    let [rows] = await connection
        .promise()
        .query(
            "INSERT INTO employees (first_name, last_name, department_id, shift_id, day1_id, day2_id) values (?, ?, (SELECT department_id from departments where department like ?), (SELECT shift_id from shifts where shift like ?), (SELECT day_id from days where day like ?), (SELECT day_id from days where day like ?));",
            [firstName, lastName, departmentName, shiftName, day1Name, day2Name]
        );
    return rows;
};

/**
 * 
 * @param {string} firstName 
 * @param {string} lastName 
 * @returns {object} with affected rows affectedRows
 */
export const removeEmployee = async (firstName: string, lastName: string) => {
    let [rows] = await connection
        .promise()
        .query(
            "DELETE FROM employees where first_name like ? and last_name like ?;",
            [firstName, lastName]
        );
    return rows;
};

/**
 * 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} departmentName 
 * @param {string} shiftName e.g., "0200"
 * @param {string} day1Name e.g., "Monday"
 * @param {string} day2Name e.g., "Tuesday"
 * @returns {object} Response from DB with affected rows: affectedRows
 */
export const editEmployee = async (
    firstName: string,
    lastName: string,
    departmentName: string,
    shiftName: string,
    day1Name: string,
    day2Name: string
) => {
    let [rows] = await connection
        .promise()
        .query(
            "UPDATE employees SET department_id = (SELECT department_id from departments where department like ?), shift_id = (SELECT shift_id from shifts where shift like ?), day1_id = (SELECT day_id from days where day like ?), day2_id = (SELECT day_id from days where day like ?) where first_name like ? and last_name like ?;",
            [departmentName, shiftName, day1Name, day2Name, firstName, lastName]
        );
    return rows;
};
/**
 * 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} vacList comma-separated list of vacation dates
 * @returns {object} Response from DB with affected rows: affectedRows
 */
export const setVacation = async (firstName: string, lastName: string, vacList: string) => {
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

export const getEmployeeVacation = async (firstName: string, lastName: string) => {
    let [rows] = await connection
        .promise()
        .query(
            "SELECT vacation from employees where first_name like ? and last_name like ?;",
            [firstName, lastName]
        );
    return rows;
}

export const getOT = async () => {
    let [rows] = await connection
        .promise()
        .query(
            "SELECT * from OT;",
        );
    return rows;
}

export const setOT = async (
  name: string,
  shift: string,
  department: string,
  date: string
) => {
  let [rows] = await connection
    .promise()
    .query(
      "INSERT INTO OT (name, shift, department, date) VALUES (?, ?, ?, ?);",
      [name, shift, department, date]
    );
  return rows;
};
