import useSignUp from "@hooks/useSignUp";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";

export default function SignUpForm() {
  const { form, submitHandler } = useSignUp();

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

      <PasswordInput
        withAsterisk
        label="Password confirmation"
        placeholder="********"
        key={form.key("confirm_password")}
        {...form.getInputProps("confirm_password")}
        mt="md"
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
