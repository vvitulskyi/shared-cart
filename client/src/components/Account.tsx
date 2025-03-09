import { Tabs, Title } from "@mantine/core";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";

export default function Account() {
  return (
    <>
      <Title order={5} mb="md">
        Login to access the shared favorites
      </Title>
      <Tabs defaultValue="sign-in">
        <Tabs.List>
          <Tabs.Tab value="sign-in">Sign in</Tabs.Tab>
          <Tabs.Tab value="sign-up">Sign up</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="sign-in">
          <SignInForm />
        </Tabs.Panel>
        <Tabs.Panel value="sign-up">
          <SignUpForm />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
