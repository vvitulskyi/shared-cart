"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import dynamic from "next/dynamic";
const App = dynamic(() => import("../../src/App"), { ssr: false });
export function ClientOnly() {
    return _jsx(App, {});
}
//# sourceMappingURL=client.js.map