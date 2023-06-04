import { removeOT } from "../../../../lib/ps/users/employees";

export async function post({ request }) {
  let body = await request.json();
  let res = await removeOT(body.id);
  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
