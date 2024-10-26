"use client";

import Cookies from "js-cookie";
import { postCreateLink, postNewCart } from "@actions";
import { ICartOption } from "@interfaces/index";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "@contexts/AppContextProvider";

export default function useSharedLink() {
  const { user, setUser, currentCart, setCurrentCart } = useContext(AppContext);
  const [sharedLink, setSharedLink] = useState<string | null>(null);
  const [openedPopover, setOpenedPopover] = useState(false);

  useEffect(() => {
    setOpenedPopover(false);
    setSharedLink(null);
  }, [currentCart]);

  const options = useMemo(() => {
    if (!user || !user.shared_carts) return null;
    const carts = user.shared_carts.map((o, i) => ({
      label: `${i + 1}) ${o}`,
      value: o.toString(),
    }));
    return carts;
  }, [user]);

  const changeHanler = (_value: string | null) => {
    if (!_value || !options) return;
    const selectedCart: ICartOption | undefined = options.find(
      ({ value }) => value == _value
    );
    if (selectedCart) setCurrentCart(selectedCart);
  };

  const logoutHandler = () => {
    setUser(null);
    Cookies.remove("auth_token", { path: "" });
  };

  const addHandler = () => {
    postNewCart().then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setCurrentCart({
          label: `${1}) ${data.shared_carts[0]}`,
          value: data.shared_carts[0],
        });
      }
    });
  };
  const shareLinkHandler = () => {
    if (!currentCart) return;
    postCreateLink(currentCart.value).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setSharedLink(`${location.origin}/?cart_connection=${data.link}`);
      }
    });
  };
  return {
    options,
    currentCart,
    sharedLink,
    shareLinkHandler,
    setOpenedPopover,
    user,
    openedPopover,
    logoutHandler,
    changeHanler,
    addHandler,
  };
}
