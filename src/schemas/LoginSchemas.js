import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid format"),
  password: Yup.string().required("Password is required"),
});
const initialValuesLogin = {
  email: "",
  password: "",
};

export { LoginSchema, initialValuesLogin };
