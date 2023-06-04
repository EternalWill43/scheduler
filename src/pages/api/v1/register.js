import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../../lib/db";

export async function post({ request }) {
  let { db } = await connectToDatabase();
  const { uname, pword } = await request.json();
  console.log(uname, pword);
  bcrypt.hash(pword, 10, async function(err, hashedPw) {
    if (err) {
      console.log(err);
    } else {
      console.log(hashedPw);
      let attemptInsert = await db
        .collection("users")
        .insertOne({ username: uname, password: hashedPw });
      console.log(attemptInsert);
    }
  });
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
