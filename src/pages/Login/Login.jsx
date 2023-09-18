import GoogleIcon from "@/assets/icons/icon-google.svg";
import LoginImg from "@/assets/images/img-login-page.png";
import SquareBottomImg from "@/assets/images/square-bottom-login.png";
import SquareTopImg from "@/assets/images/square-top-login.png";
import { LoginSchema, initialValuesLogin } from "@/schemas/LoginSchemas";
import { useStore } from "@/stores/stores";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { users, updateUsers, updateUserLogin } = useStore();
  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: LoginSchema,

    onSubmit: (values, helper) => {
      onSubmit(values);
    },
  });

  const onSubmit = (data) => {
    const userSelected = users.filter((user) => user.email === data.email);
    const body = { ...data, id: uuid() };
    /* login */
    if (userSelected.length > 0) {
      if (userSelected[0].password === data.password) {
        updateUserLogin(userSelected[0]);
        navigate("/");
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    } else {
      /* register */
      updateUsers([...users, body]);
      updateUserLogin(body);
      navigate("/");
    }
  };
  return (
    <div className="grid lg:grid-cols-2 h-[calc(100vh-24px)] bg-white p-0 overflow-y-hidden w-full">
      {/* left */}
      <div className="relative hidden lg:grid place-items-center bg-[#F8FAFF] z-10">
        <img src={LoginImg} alt="" />
        <div className="rounded-full bg-[#1fa7fe] w-[35px] h-[35px] absolute top-[118px] left-[ 363px]" />
        <div className="rounded-full bg-[#f1472e] w-[35px] h-[35px] absolute top-[50px] left-[106px]" />
      </div>
      {/* right */}
      <div className="relative grid place-items-center w-full">
        <div className="flex flex-col w-full justify-center items-center lg:items-start lg:justify-start lg:pl-[88px]">
          {/* additional */}
          <img
            src={SquareTopImg}
            className="absolute top-0 right-[22px]"
            alt=""
          />
          <img
            src={SquareBottomImg}
            className="absolute bottom-0 left-[-43px]"
            alt=""
          />
          {/* greetings */}
          <h2 className="font-medium text-[32px] leading-[36px] mb-10">
            Welcome Back
          </h2>

          {/* alert wrong password */}
          {showAlert && (
            <Alert
              variant="outlined"
              severity="error"
              className="mb-8 w-[360px] lg:w-[480px]"
            >
              Your password is wrong. Please try again
            </Alert>
          )}

          {/* form login */}
          <form
            className="flex flex-col w-[360px] lg:w-[480px]"
            onSubmit={formik.handleSubmit}
          >
            {/* email field */}
            <div className="space-y-3 mb-[20px]">
              <label htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-col space-y-0.5 w-full">
                <input
                  type="text"
                  className={`px-4 py-3.5 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-600"
                      : "border-[#bdbdbd]"
                  } rounded`}
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="email"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-xs text-red-600">
                    {formik.errors.email}
                  </span>
                )}
              </div>
            </div>
            {/* password field */}
            <div className="space-y-3 mb-10">
              <label htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-col space-y-0.5 w-full">
                <div
                  className={`flex space-x-3 px-4 py-3.5 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-600"
                      : "border-[#bdbdbd]"
                  } rounded`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="password"
                    className="w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <VisibilityOff style={{ color: "#97A3B6" }} />
                    ) : (
                      <Visibility style={{ color: "#97A3B6" }} />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <span className="text-xs text-red-600">
                    {formik.errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-col space-y-4">
              {/* button submit */}
              <button
                type="submit"
                className="px-4 py-3 bg-[#154886] w-full text-white rounded-lg text-lg"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Sign In
              </button>
              <div className="grid grid-cols-[156px_auto_156px] lg:grid-cols-[228px_auto_228px] items-center">
                <div className="w-full h-[1px] bg-[#cdd5e0]" />
                <p className="font-medium text-center text-[#cdd5e0]">Or</p>
                <div className="w-full h-[1px] bg-[#cdd5e0]" />
              </div>
              {/* button submit via google */}
              <button className="flex justify-center items-center space-x-6 px-4 py-3 bg-white w-full text rounded-sm border border-[#cdd5e0] font-medium">
                <img src={GoogleIcon} />
                <p className="text-[#000] opacity-[0.54]]">
                  Sign in with Google
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
