import { useContext } from "react";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import AppContext from "../../contexts/App";
import Cookies from "js-cookie";
import { postRegistration } from "../../actions";
import { IUserRegistration } from "@interfaces/index";

export default function SignUpForm() {
  const { setUser, setCurrentCart } = useContext(AppContext);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 5 ? null : "Invalid password"),
      confirm_password: (value, values) =>
        value !== values.password ? "Passwords must match" : null,
    },
  });

  const submitHandler = (values: IUserRegistration) => {
    postRegistration(values).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setCurrentCart({
          label: `1) ${data.shared_carts && data.shared_carts[0]}`,
          value: data.shared_carts[0],
        });
        Cookies.set("auth_token", data.token, { expires: 30, path: "/" });
      } else {
        const data = await res.json();
        if (data.message) form.setFieldError("password", data.message);
        if (Array.isArray(data)) {
          data.map((o) => {
            form.setFieldError(o.path, o.msg);
          });
        }
      }
    });
  };

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
