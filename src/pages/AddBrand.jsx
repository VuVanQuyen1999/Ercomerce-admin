import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  createBrand,
  getBrand,
  resetState,
  updateBrand,
} from "../features/brands/brandSlice";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  const getBrandId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  let brandSchema = object({
    title: string().required("Brand Name is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: brandSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Created Brand Successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!");
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-brand");
      }, 2500);
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand]);

  return (
    <>
      <div className="">
        <h3 className="mb-4 title">
          {getBrandId !== undefined ? "Edit" : "Add"} Brand
        </h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Enter Brand"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button className="btn btn-success border-0 rounded-3 my-5">
              {getBrandId !== undefined ? "Save" : "Add Brand"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
