import { getDepartments } from "../../../../lib/ps/users/departments";

export async function get({ request }) {
    let res = await getDepartments();
    return new Response(JSON.stringify(res), {
        status: 200,
    });
}