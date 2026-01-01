// twleve adminAuth with compare with jwt token

import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {

    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Try Again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized Try Again" });
    }
    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;