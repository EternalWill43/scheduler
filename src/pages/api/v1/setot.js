import { setOT } from "../../../../lib/ps/users/employees";

export async function post({ request }) {
  let body = await request.json();
  let res = await setOT(body.name, body.shift, body.department, body.date);
  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
