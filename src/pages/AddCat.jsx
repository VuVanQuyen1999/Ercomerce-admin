import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createPCategory,
  getCategory,
  resetState,
  updateCategory,
} from "../features/pcategories/pcategorySlice";

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const newCategory = useSelector((state) => state.category);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  const getCategoryId = location.pathname.split("/")[3];
  console.log(getCategoryId);

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

  let brandSchema = object({
    title: string().required("Category Name is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateCategory(data));
      } else {
        dispatch(createPCategory(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Created Product Category Successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedCategory) {
      toast.success("Created Product Category Successfully!");
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-category");
      }, 2500);
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCategory, updatedCategory]);

  return (
    <>
      <div className="">
        <h3 className="mb-4 title">
          {getCategoryId !== undefined ? "Edit" : "Add"} Category
        </h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Enter Category"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button className="btn btn-success border-0 rounded-3 my-5">
              {getCategoryId !== undefined ? "Save" : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCat;
