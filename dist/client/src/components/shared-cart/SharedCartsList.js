import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip, Box, Select, Text, Flex, Button, TextInput, Popover, } from "@mantine/core";
import LogoutIcon from "../../images/LogoutIcon";
import SharedCartItemsList from "./SharedCartItemsList";
import LinkIcon from "../../images/LinkIcon";
import AddIcon from "../../images/AddIcon";
import useSharedLink from "./../../hooks/useSharedLink";
export default function SharedCartsList() {
    const { options, currentCart, sharedLink, shareLinkHandler, setOpenedPopover, user, openedPopover, logoutHandler, changeHanler, addHandler, } = useSharedLink();
    if (!options || !currentCart || !currentCart.value) {
        return _jsx("div", { children: "Logading..." });
    }
    const copyLinkHandler = () => {
        if (navigator.clipboard && sharedLink) {
            navigator.clipboard
                .writeText(sharedLink)
                .then(() => {
                setOpenedPopover(true);
            })
                .catch(() => {
                alert("Error during link copying");
            });
        }
        else {
            alert("Not possible on this page. Please copy manually.");
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Flex, { gap: "sm", justify: "left", align: "center", direction: "row", wrap: "wrap", children: [_jsxs(Text, { truncate: "end", maw: "100%", children: ["Loggined at ", user && user.email] }), _jsx(Tooltip, { label: "Log-out", color: "gray", children: _jsx(Button, { onClick: logoutHandler, variant: "light", size: "compact-xl", children: _jsx(LogoutIcon, {}) }) })] }), _jsx(Select, { label: "Select shared cart", placeholder: "Pick cart", data: options, value: currentCart.value, onChange: changeHanler }), _jsxs(Flex, { justify: "center", mt: "md", direction: "column", mb: "md", children: [_jsxs(Button, { variant: "filled", color: "orange", onClick: addHandler, children: [_jsx(AddIcon, { style: { marginRight: "10px" } }), "Add new cart"] }), sharedLink ? (_jsx(TextInput, { withAsterisk: true, value: sharedLink, mt: "md", onChange: () => { }, rightSection: _jsxs(Popover, { width: 200, position: "bottom", withArrow: true, shadow: "md", opened: openedPopover, onChange: setOpenedPopover, children: [_jsx(Popover.Target, { children: _jsx(Tooltip, { label: "Copy link!", color: "gray", children: _jsx(Button, { variant: "light", "aria-label": "Copy link", onClick: copyLinkHandler, style: { padding: "5px" }, children: _jsx(LinkIcon, {}) }) }) }), _jsx(Popover.Dropdown, { children: _jsx(Text, { size: "xs", children: "The link has been copied" }) })] }) })) : (_jsxs(Button, { mt: "10", variant: "transparent", color: "indigo", onClick: shareLinkHandler, children: [_jsx(LinkIcon, { style: { marginRight: "10px" } }), "Share cart (Link expires after 24 hours)"] }))] }), _jsx(SharedCartItemsList, { cartId: currentCart.value })] }));
}
//# sourceMappingURL=SharedCartsList.js.map