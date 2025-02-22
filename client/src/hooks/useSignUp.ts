import { useContext } from "react";
import { useForm } from "@mantine/form";
import { AppContext } from "@contexts/AppContextProvider";
import { postRegistration } from "@actions";
import { IUserRegistration } from "@interfaces/index";

export default function useSignUp() {
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

  return { form, submitHandler };
}
