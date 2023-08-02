import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/products/productSlice";
import brandReducer from "../features/brands/brandSlice";
import categoryReducer from "../features/pcategories/pcategorySlice";
import colorReducer from "../features/colors/colorSlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import enquiryReducer from "../features/enquiries/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    color: colorReducer,
    blog: blogReducer,
    bCategory: bCategoryReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
