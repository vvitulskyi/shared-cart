import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user_id = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access",
    });
  }
};
