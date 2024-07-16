import Account from "./Account";
import SharedCartsList from "./shared-cart/SharedCartsList";
import AppContext from "../contexts/App";
import { useContext } from "react";

export default function Sidebar() {
  const { user } = useContext(AppContext);
  if (!user) {
    return <Account />;
  }
  return <SharedCartsList />;
}
