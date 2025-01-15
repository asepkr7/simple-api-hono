import { Context } from "hono";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { any } from "zod";

dotenv.config();
const verifyJWT = async (c: Context, next:any) => {
  console.log("Authorization Header:", c.req.header("Authorization"));
    const token = c.req.header("Authorization");
    if (!token) return c.json({ message: "Access denied" }, 401);

    try {
        // Verifikasi token menggunakan secret dari .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("JWT is valid:", decoded);
        c.set('user', decoded); // Menyimpan data user di context untuk digunakan di route
        return  await next()
      } catch (error) {
        console.log("JWT Verification Error:", error);
        return c.json({ success: false, message: 'Token tidak valid' }, 401);
      }
}

export default verifyJWT