import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../../lib/db";

export async function post({ request }) {
  let { db } = await connectToDatabase();
  const { uname, pword } = await request.json();
  bcrypt.hash(pword, 10, async function (err, hashedPw) {
    if (err) {
      console.log(err);
    } else {
      await db.collection("users").insertOne({ uname, hashedPw });
    }
  });
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}
