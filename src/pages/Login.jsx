import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userSchema = object({
    email: string()
      .email("Email Should be valid")
      .required("Email is Required"),
    password: string().required("Password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
    }
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <>
      <div
        className="py-5"
        style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 m-auto p-3">
          <h3 className="text-center">Login</h3>
          <p className="text-center">Login to your account to continue.</p>
          <div className="error text-center">
            {message.message === "Rejected" ? "You are not an Admin" : ""}
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="email"
              placeholder="Email Address"
              id="email"
              name="email"
              onCh={formik.handleChange("email")}
              val={formik.values.email}
            />
            <div className="error">
              {formik.errors.email && formik.touched.email && (
                <div>{formik.errors.email}</div>
              )}
            </div>
            <CustomInput
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onCh={formik.handleChange("password")}
              val={formik.values.password}
            />
            <div className="error">
              {formik.errors.password && formik.touched.password && (
                <div>{formik.errors.password}</div>
              )}
            </div>

            <button
              className="border-0 px-3 py-2 mt-3 text-white w-100 fw-bold"
              style={{
                backgroundColor: "#ffd333",
                textAlign: "center",
              }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
