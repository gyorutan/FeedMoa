import { connectDB } from "../../util/database.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { createdAt } from "../../util/timeStamp.js";

export default async function Register(req, res) {
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(req.body.loginPw, 10);
    await User.create({
      username: req.body.username,
      loginId: req.body.loginId,
      loginPw: hashedPassword,
      createdAt: createdAt,
    });
    return res.status(200).json({ success : true });
  } catch (error) {
    console.log(error);
  }
}
