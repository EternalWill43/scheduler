import { getEmployeeVacation } from "../../../../lib/ps/users/employees";

export async function post({ request }) {
    let { firstName, lastName } = await request.json();
    let res = await getEmployeeVacation(firstName, lastName);
    res.push({ success: true });
    return new Response(JSON.stringify(res), {
        status: 200,
    });
}