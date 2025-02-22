import { validationResult } from "express-validator";
export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
        return;
    }
    next();
};
//# sourceMappingURL=handleValidationErrors.js.map