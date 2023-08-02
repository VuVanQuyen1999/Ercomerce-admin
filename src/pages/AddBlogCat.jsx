import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createBCategory,
  getBCategory,
  resetState,
  updateBCategory,
} from "../features/bcategory/bcategorySlice";

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newBCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBCategory,
    updatedBCategory,
    blogCatName,
  } = newBCategory;

  const blogCatId = location.pathname.split("/")[3];

  useEffect(() => {
    if (blogCatId !== undefined) {
      dispatch(getBCategory(blogCatId));
    } else {
      dispatch(resetState());
    }
  }, [blogCatId]);

  let blogCatSchema = object({
    title: string().required("Category Name is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: blogCatSchema,
    onSubmit: (values) => {
      if (blogCatId !== undefined) {
        const data = { id: blogCatId, blogCategoryData: values };
        dispatch(updateBCategory(data));
      } else {
        dispatch(createBCategory(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdBCategory) {
      toast.success("Created Blog Category Successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedBCategory) {
      toast.success("Updated Blog Category Successfully!");
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 2500);
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, updatedBCategory, createBCategory]);
  return (
    <>
      <div className="">
        <h3 className="mb-4 title">
          {blogCatId !== undefined ? "Edit" : "Add"} Blog Category
        </h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Enter Blog Category"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button className="btn btn-success border-0 rounded-3 my-5">
              {blogCatId !== undefined ? "Save" : "Add Blog Category"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCat;
