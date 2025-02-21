import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import useSignIn from "./../../hooks/useSignIn";
export default function SignInForm() {
    const { form, submitHandler } = useSignIn();
    return (_jsxs("form", { onSubmit: form.onSubmit(submitHandler), children: [_jsx(TextInput, { withAsterisk: true, label: "Email", placeholder: "your@email.com", ...form.getInputProps("email"), mt: "md" }, form.key("email")), _jsx(PasswordInput, { withAsterisk: true, label: "Password", placeholder: "********", ...form.getInputProps("password"), mt: "md" }, form.key("password")), _jsx(Group, { justify: "flex-end", mt: "md", children: _jsx(Button, { type: "submit", children: "Submit" }) })] }));
}
//# sourceMappingURL=SignInForm.js.map