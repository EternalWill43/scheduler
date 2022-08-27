import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../../lib/db";

export async function post({ request }) {
    let { db } = await connectToDatabase();
    const { uname, pword } = await request.json();
    let user = await db.collection('users').findOne({ username: uname.toLowerCase() });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    let valid = bcrypt.compareSync(pword, user.password);
    if (!valid) return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    let headers = new Headers();
    headers.append("Set-Cookie", `token=${jsonwebtoken.sign({ username: user.username }, import.meta.env.JWT_SECRET)}; Path=/; HttpOnly; SameSite=Strict`);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
}