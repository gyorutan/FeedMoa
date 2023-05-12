import { connectDB } from "../../util/database.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function Login(req, res) {
  try {
    await connectDB();
    const user = await User.findOne({loginId : req.body.loginId}).exec();
    if (!user) {
      return res.status(401).json({
        cause: "loginId",
        success: false,
      });
    }
    const matchPw = await bcrypt.compare(req.body.loginPw, user.loginPw);
    if (!matchPw) {
      return res.status(401).json({
        cause: "loginPw",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7h",
      }
    );
    return res.status(200).json({ success: true, username: user.username, token });
  } catch (error) {
    console.log(error);
  }
}
