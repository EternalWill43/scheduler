import { getOT } from "../../../../lib/ps/users/employees";

export async function get() {
  let res = await getOT();
  console.log(res);
  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
