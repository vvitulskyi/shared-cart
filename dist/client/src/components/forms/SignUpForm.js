import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useSignUp from "./../../hooks/useSignUp";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
export default function SignUpForm() {
    const { form, submitHandler } = useSignUp();
    return (_jsxs("form", { onSubmit: form.onSubmit(submitHandler), children: [_jsx(TextInput, { withAsterisk: true, label: "Email", placeholder: "your@email.com", ...form.getInputProps("email"), mt: "md" }, form.key("email")), _jsx(PasswordInput, { withAsterisk: true, label: "Password", placeholder: "********", ...form.getInputProps("password"), mt: "md" }, form.key("password")), _jsx(PasswordInput, { withAsterisk: true, label: "Password confirmation", placeholder: "********", ...form.getInputProps("confirm_password"), mt: "md" }, form.key("confirm_password")), _jsx(Group, { justify: "flex-end", mt: "md", children: _jsx(Button, { type: "submit", children: "Submit" }) })] }));
}
//# sourceMappingURL=SignUpForm.js.map