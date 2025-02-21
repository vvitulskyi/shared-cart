import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tabs, Title } from "@mantine/core";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";
export default function Account() {
    return (_jsxs(_Fragment, { children: [_jsx(Title, { order: 5, mb: "md", children: "Login to access the shared carts" }), _jsxs(Tabs, { defaultValue: "sign-in", children: [_jsxs(Tabs.List, { children: [_jsx(Tabs.Tab, { value: "sign-in", children: "Sign in" }), _jsx(Tabs.Tab, { value: "sign-up", children: "Sign up" })] }), _jsx(Tabs.Panel, { value: "sign-in", children: _jsx(SignInForm, {}) }), _jsx(Tabs.Panel, { value: "sign-up", children: _jsx(SignUpForm, {}) })] })] }));
}
//# sourceMappingURL=Account.js.map