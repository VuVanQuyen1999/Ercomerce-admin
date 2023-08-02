import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from "../features/colors/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newColor = useSelector((state) => state.color);
  const getColorId = location.pathname.split("/")[3];
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  let colorSchema = object({
    title: string().required("Color is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, dataColor: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Created Color Successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedColor) {
      toast.success("Updated Color Successfully!");

      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-color");
      }, 2500);
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor]);
  return (
    <>
      <div className="">
        <h3 className="mb-4 title">
          {getColorId !== undefined ? "Edit" : "Add"} Color
        </h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="color"
              placeholder="Enter Color"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button className="btn btn-success border-0 rounded-3 my-5">
              {getColorId !== undefined ? "Save" : "Add Color"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddColor;
