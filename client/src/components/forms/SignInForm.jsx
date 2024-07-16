import { useContext } from "react";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import AppContext from "../../contexts/App";
import Cookies from "js-cookie";

export default function SignInForm() {
  const { setUser, setCurrentCart } = useContext(AppContext);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 5 ? null : "Invalid password"),
    },
  });

  const submitHandler = (values) => {
    fetch("http://localhost:9999/api/v1/account/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setCurrentCart({
          label: `1) ${data.shared_carts && data.shared_carts[0]}`,
          value: data.shared_carts[0],
        });
        Cookies.set("auth_token", data.token, { expires: 30, path: "" });
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

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
