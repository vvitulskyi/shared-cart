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
import LogoutIcon from "@images/LogoutIcon";
import SharedCartItemsList from "./SharedCartItemsList";
import LinkIcon from "@images/LinkIcon";
import AddIcon from "@images/AddIcon";
import useSharedLink from "@hooks/useSharedLink";

export default function SharedCartsList() {
  const {
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
  } = useSharedLink();

  if (!options || !currentCart || !currentCart.value) {
    return <div>Logading...</div>;
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
