import { connectDB } from "../../util/database.js";
import User from "../../models/User.js";

export default async function verifyLoginId(req, res) {
  try {
    await connectDB();
    const loginId = req.body.loginId;
    if (!loginId) {
      return res.status(400).json({ success: false, cause: "null" });
    }
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
    const isValid = pattern.test(loginId);
    if (!isValid) {
      return res.status(400).json({ success: false, cause: "pattern" });
    }
    const loginIdExists = await User.exists({ loginId }).exec();
    if (loginIdExists) {
      return res.status(409).json({ success: false, cause: "exists" });
    } else {
      return res.status(200).json({ success: true, loginId: loginId });
    }
  } catch (error) {
    console.log(error);
  }
}
