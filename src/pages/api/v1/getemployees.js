import { getEmployees } from "../../../../lib/ps/users/employees";

export async function get() {
    let res = await getEmployees();
    return new Response(JSON.stringify(res), {
        status: 200,
    });
}
