import { jsx as _jsx } from "react/jsx-runtime";
import "../../src/styles/index.css";
import { ClientOnly } from "./client";
export function generateStaticParams() {
    return [{ slug: [""] }];
}
export default function Page() {
    return _jsx(ClientOnly, {});
}
//# sourceMappingURL=page.js.map