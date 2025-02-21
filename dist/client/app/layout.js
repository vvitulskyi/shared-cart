import { jsx as _jsx } from "react/jsx-runtime";
export const metadata = {
    title: 'My App',
    description: 'My App is a...',
};
export default function RootLayout({ children, }) {
    return (_jsx("html", { lang: "en", children: _jsx("body", { children: children }) }));
}
//# sourceMappingURL=layout.js.map