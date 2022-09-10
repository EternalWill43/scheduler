import { getShifts } from "../../../../lib/ps/users/shifts";

export async function get() {
    let res = await getShifts();
    return new Response(JSON.stringify(res), {
        status: 200,
    });
}