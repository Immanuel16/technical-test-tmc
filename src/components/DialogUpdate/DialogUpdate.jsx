import { TodoSchema, initialValuesTodo } from "@/schemas/TodoSchemas";
import { getStorage } from "@/utils/util";
import { Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const DialogUpdate = ({ open, onClose, onSubmit, action, data }) => {
  const formik = useFormik({
    initialValues: initialValuesTodo,
    validationSchema: TodoSchema,

    onSubmit: (values, helper) => {
      onSubmit(values);
      formik.values.datetime = null;
      formik.values.todo = "";
    },
  });

  const onChangeField = (name, e) => {
    formik.setFieldValue(name, name === "datetime" ? e : e.target.value);
  };

  const getDetailData = () => {
    formik.setFieldValue("todo", data.name);
    formik.setFieldValue("datetime", dayjs(data.dueDate));
  };

  const closeModal = () => {
    onClose();
    formik.values.datetime = null;
    formik.values.todo = "";
  };

  useEffect(() => {
    getDetailData();
  }, [data]);

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
        },
      }}
      open={open}
      onClose={closeModal}
    >
      <div className="flex flex-col w-[540px] space-y-6 pb-[35px]">
        {/* header */}
        <div className="bg-[#f6f6f6] flex justify-between items-center px-8 py-[18px]">
          <p className="text-base font-medium">Add Todo</p>
          <button onClick={closeModal}>
            <Close />
          </button>
        </div>
        <form className="flex flex-col px-8" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-3">
            <label htmlFor="title">
              Todo <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col space-y-0.5">
              <input
                type="text"
                className={`px-4 py-3.5 border ${
                  formik.touched.todo && formik.errors.todo
                    ? "border-red-600"
                    : "border-[#bdbdbd]"
                } rounded`}
                placeholder="Todo"
                name="todo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.todo || ""}
              />
              {formik.touched.todo && formik.errors.todo && (
                <span className="text-xs text-red-600">
                  {formik.errors.todo}
                </span>
              )}
            </div>
          </div>
          {/* datetimepicker */}
          <div className="flex flex-col space-y-1.5 mt-6 mb-10">
            <label htmlFor="title">
              Date Time <span className="text-red-600">*</span>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  value={formik.values.datetime}
                  onChange={(value) => onChangeField("datetime", value)}
                  ampm={false}
                  minDate={action !== "edit" ? dayjs(new Date()) : ""}
                  minTime={dayjs(
                    action === "edit"
                      ? new Date().setHours(0, 0)
                      : dayjs(new Date().getTime())
                  )}
                  disableIgnoringDatePartForTimeValidation={true}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          {/* button */}
          <div className="flex justify-end space-x-4">
            <button
              className={`px-6 py-3  ${
                !(formik.isValid && formik.dirty)
                  ? "text-white bg-gray-500 cursor-not-allowed"
                  : "text-white bg-[#154886]"
              } rounded`}
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Save
            </button>
            <button className="px-6 py-3 text-[#154886] bg-[#E3E8EF] rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default DialogUpdate;
