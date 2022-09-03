import { removeDepartment } from "../../../../lib/ps/users/departments";

export async function post({ request }) {
    let body = await request.json();
    let res = await removeDepartment(body.department);
    return new Response(JSON.stringify(res), {
        status: 200,
    });
}