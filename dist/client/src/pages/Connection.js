import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useParams } from "react-router-dom";
export default function Cnnection() {
    const { cartLink } = useParams();
    return _jsx(Navigate, { to: "/", replace: true, state: { link: cartLink } });
}
//# sourceMappingURL=Connection.js.map