// @ts-ignore
import { setVacation } from "../../../../lib/ps/users/employees";

export async function post(_params: any, request: Request) {
    const { firstName, lastName, vacList } = await request.json();
    let res = await setVacation(firstName, lastName, vacList);
    if (res.affectedRows > 0) {
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
        });
    }
    return new Response(JSON.stringify({ error: "Error setting vacation" }), {
        status: 500,
    });
}
