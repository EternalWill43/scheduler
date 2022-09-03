import { removeShift } from "../../../../lib/ps/users/shifts";

export async function post({ request }) {
    let body = await request.json();
    let res = await removeShift(body.shift);
    return new Response(JSON.stringify(res), {
        status: 200,
    });
}