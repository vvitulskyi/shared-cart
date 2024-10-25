import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import useSignIn from "./../../hooks/useSignIn";

export default function SignInForm() {
  const { form, submitHandler } = useSignIn();

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
        mt="md"
      />

      <PasswordInput
        withAsterisk
        label="Password"
        placeholder="********"
        key={form.key("password")}
        {...form.getInputProps("password")}
        mt="md"
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
