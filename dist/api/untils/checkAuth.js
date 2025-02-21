import jwt from "jsonwebtoken";
export default async (req, res, next) => {
    const token = req.cookies.auth_token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (typeof decoded !== "string" && decoded !== null && "_id" in decoded) {
                req.user_id = decoded._id;
                next();
            }
            else {
                throw new Error("Unvalable user");
            }
        }
        catch (e) {
            return res.status(403).json({
                message: "No access",
            });
        }
    }
    else {
        return res.status(403).json({
            message: "No access",
        });
    }
};
//# sourceMappingURL=checkAuth.js.map