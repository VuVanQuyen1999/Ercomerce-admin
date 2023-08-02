import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { date, number, object, string } from "yup";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    updatedCoupon,
    dataCoupon,
  } = newCoupon;

  const getCouponId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  let couponSchema = object({
    name: string().required("Coupon Name is Required"),
    expiry: date().required("Expiry Date is Required"),
    discount: number().required("Discount is Required"),
  });

  const changeDateFormat = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  console.log(typeof dataCoupon?.expiry);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataCoupon?.name || "",
      expiry: changeDateFormat(dataCoupon?.expiry) || "",
      discount: dataCoupon?.discount || "",
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Created Coupon Successfully!");
      dispatch(resetState());
    }

    if (isSuccess && updatedCoupon) {
      toast.success("Updated Coupon Successfully!");
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      }, 2500);
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCoupon, updatedCoupon]);

  return (
    <>
      <div className="">
        <h3 className="mb-4 name">
          {getCouponId !== undefined ? "Edit" : "Add"} Coupon
        </h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Enter Coupon"
              name="name"
              onCh={formik.handleChange("name")}
              onBlr={formik.handleBlur("name")}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>

            <CustomInput
              type="date"
              name="expiry"
              placeholder="Enter Expiry Date"
              onCh={formik.handleChange("expiry")}
              onBlr={formik.handleBlur("expiry")}
              val={formik.values.expiry}
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>

            <CustomInput
              type="number"
              placeholder="Enter Discount"
              name="discount"
              onCh={formik.handleChange("discount")}
              onBlr={formik.handleBlur("discount")}
              val={formik.values.discount}
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>

            <button className="btn btn-success border-0 rounded-3 my-5">
              {getCouponId !== undefined ? "Save" : "Add Coupon"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
