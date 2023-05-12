import { connectDB } from "../../util/database.js";
import User from "../../models/User.js";

export default async function verifyUsername(req, res) {
  try {
    await connectDB();
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ success: false, cause: "null" });
    }
    const pattern = /^([a-zA-Z0-9가-힣]{3,7})$/;
    const isValid = pattern.test(username);
    if (!isValid) {
      return res.status(400).json({ success: false, cause: "pattern" });
    }
    const usernameExists = await User.exists({ username }).exec();
    if (usernameExists) {
      return res.status(409).json({ success: false, cause: "exists" });
    } else {
      return res.status(200).json({ success: true, username: username });
    }
  } catch (error) {
    console.log(error);
  }
}
