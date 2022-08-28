import { addEmployee } from "../../../../lib/ps/users/employees";

export async function post({ request }) {
    const { firstName, lastName, department, shift, day1, day2 } =
        await request.json();
    console.log(firstName, lastName, department, shift, day1, day2);
    let res = await addEmployee(
        firstName,
        lastName,
        department,
        shift,
        day1,
        day2
    );
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
    });
}
