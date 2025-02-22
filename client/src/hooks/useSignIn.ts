import { useContext } from "react";
import { AppContext } from "@contexts/AppContextProvider";
import { useForm } from "@mantine/form";
import { IUserLogin } from "@interfaces/index";
import { postLogin } from "@actions";

export default function useSignIn() {
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

  const submitHandler = (values: IUserLogin) => {
    postLogin(values).then(async (res) => {
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
