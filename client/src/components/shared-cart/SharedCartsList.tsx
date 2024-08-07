import {
  Tooltip,
  Box,
  Select,
  Text,
  Flex,
  Button,
  TextInput,
  Popover,
} from "@mantine/core";
import { useMemo } from "react";
import AppContext from "../../contexts/App";
import { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import LogoutIcon from "../../images/LogoutIcon";
import SharedCartItemsList from "./SharedCartItemsList";
import LinkIcon from "../../images/LinkIcon";
import AddIcon from "../../images/AddIcon";
import { postNewCart, postCreateLink } from "../../actions";
import { ICartOption } from "@interfaces/index";

export default function SharedCartsList() {
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

  if (!options || !currentCart || !currentCart.value) {
    return <div>Logading...</div>;
  }

  const changeHanler = (_value: string | null) => {
    if (!_value) return;
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
    postCreateLink(currentCart.value).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setSharedLink(`${location.origin}/cart-connection/${data.link}`);
      }
    });
  };

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
    } else {
      alert("Not possible on this page. Please copy manually.");
    }
  };

  return (
    <Box>
      <Flex gap="sm" justify="left" align="center" direction="row" wrap="wrap">
        <Text truncate="end" maw="100%">
          Loggined at {user && user.email}
        </Text>
        <Tooltip label="Log-out" color="gray">
          <Button onClick={logoutHandler} variant="light" size="compact-xl">
            <LogoutIcon />
          </Button>
        </Tooltip>
      </Flex>
      <Select
        label="Select shared cart"
        placeholder="Pick cart"
        data={options}
        value={currentCart.value}
        onChange={changeHanler}
      />
      <Flex justify="center" mt="md" direction="column" mb="md">
        <Button variant="filled" color="orange" onClick={addHandler}>
          <AddIcon style={{ marginRight: "10px" }} />
          Add new cart
        </Button>
        {sharedLink ? (
          <TextInput
            withAsterisk
            value={sharedLink}
            mt="md"
            onChange={() => {}}
            rightSection={
              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
                opened={openedPopover}
                onChange={setOpenedPopover}
              >
                <Popover.Target>
                  <Tooltip label="Copy link!" color="gray">
                    <Button
                      variant="light"
                      aria-label="Copy link"
                      onClick={copyLinkHandler}
                      style={{ padding: "5px" }}
                    >
                      <LinkIcon />
                    </Button>
                  </Tooltip>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="xs">The link has been copied</Text>
                </Popover.Dropdown>
              </Popover>
            }
          />
        ) : (
          <Button
            mt="10"
            variant="transparent"
            color="indigo"
            onClick={shareLinkHandler}
          >
            <LinkIcon style={{ marginRight: "10px" }} />
            Share cart (Link expires after 24 hours)
          </Button>
        )}
      </Flex>
      <SharedCartItemsList cartId={currentCart.value} />
    </Box>
  );
}
