import { editEmployee } from "../../../../lib/ps/users/employees";

export async function post({ request }) {
    const { firstName, lastName, department, shift, day1, day2 } = await request.json();
    let res = await editEmployee(firstName, lastName, department, shift, day1, day2);
    if (res.affectedRows > 0) {
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
        });
    }
    return new Response(JSON.stringify({ error: "Error editing employee" }), {
        status: 500,
    });
}