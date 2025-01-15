import { Context } from "hono";
import prisma from "../../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login handler
const login = async (c: Context) => {
  const body = await c.req.parseBody(); // Menggunakan parseBody() untuk mendapatkan data dari body request

  // Validasi input
  if (!body.email || !body.password) {
    return c.json({
      success: false,
      message: "Email and password are required",
    }, 400);
  }

  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findFirst({
      where: { email: body.email },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true, // Ambil role dari database
        password: true, // Ambil password yang sudah di-hash
      },
    });

    if (!user) {
      return c.json({
        success: false,
        message: "Incorrect email or password",
      }, 404);
    }

    // Bandingkan password dengan yang ada di database
    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      return c.json({
        success: false,
        message: "Incorrect email or password",
      }, 401);
    }

    // Generate token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role }, // Sertakan user id dan role dalam payload token
      process.env.JWT_SECRET as string, // Menggunakan secret key untuk sign token
      { expiresIn: "11h" }
    );

    // Hapus password dari response
    const { password, ...userWithoutPassword } = user;

    return c.json({
      success: true,
      message: "Login successfully",
      data: {
        user: userWithoutPassword,
        token,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return c.json({
      success: false,
      message: "Internal server error",
    }, 500);
  }
};

export { login };
