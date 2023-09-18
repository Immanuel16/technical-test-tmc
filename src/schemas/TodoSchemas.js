import * as Yup from "yup";

const TodoSchema = Yup.object({
  todo: Yup.string().required("Todo is required"),
  datetime: Yup.string().required("Date is required"),
});
const initialValuesTodo = {
  todo: "",
  datetime: "",
};

export { TodoSchema, initialValuesTodo };
