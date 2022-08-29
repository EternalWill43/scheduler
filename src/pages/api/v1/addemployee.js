import { addEmployee } from "../../../../lib/ps/users/employees";

export async function post({ request }) {
    const { firstName, lastName } = await request.json();
    let res = await addEmployee(firstName, lastName, department, shift, day1, day2);
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
    });
}
