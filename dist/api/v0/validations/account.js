import { body } from "express-validator";
export const loginValidator = [
    body("email", "Invalid email format").isEmail(),
    body("password", "The password must be at least 6 characters long").isLength({
        min: 5,
    }),
];
export const registrationValidator = [
    body("email", "Invalid email format").isEmail(),
    body("password", "The password must be at least 6 characters long").isLength({
        min: 6,
    }),
    body("confirm_password", "Confirm Password field must have the same value as the password field")
        .exists()
        .custom((value, { req }) => value === req.body.password),
];
//# sourceMappingURL=account.js.map