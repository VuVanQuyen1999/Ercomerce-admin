import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { array, number, object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brands/brandSlice";
import { getCategories } from "../features/pcategories/pcategorySlice";
import { getColors } from "../features/colors/colorSlice";
import Dropzone from "react-dropzone";
import { Select } from "antd";
import "react-widgets/styles.css";
import "react-quill/dist/quill.snow.css";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { createProduct, resetState } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categories);
  const colorState = useSelector((state) => state.color.colors);
  const imageState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdPRoduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdPRoduct) {
      toast.success("Product Added Successfully!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const colorOpt = [];

  colorState.forEach((item) => {
    colorOpt.push({ value: item._id, label: item.title });
  });

  const handleColors = (e) => {
    setColor(e);
  };

  const img = [];

  imageState.forEach((item) => {
    img.push({ public_id: item.public_id, url: item.url });
  });
  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = img;
  }, [color, img]);

  let productSchema = object({
    title: string().required("Title is Required"),
    description: string().required("Description is Required"),
    price: number().required("Price is Required"),
    brand: string().required("Brand is Required"),
    tags: string().required("Tag is Required"),
    category: string().required("Category is Required"),
    quantity: number().required("Quantity is Required"),
    color: array()
      .min(1, "Pick at least one color")
      .required("Color is Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      brand: "",
      category: "",
      quantity: "",
      color: "",
      price: "",
      tags: "",
      images: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setColor(null);
    },
  });
  return (
    <>
      <div className="">
        <h3 className="title mb-4">Add Product</h3>
        <div className="">
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Enter Product Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <div className="mb-3">
              <ReactQuill
                theme="snow"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
            <CustomInput
              type="number"
              placeholder="Enter Product Price"
              onCh={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              val={formik.values.price}
              name="price"
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
            <select
              className="form-control py-3 mb-3"
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange("brand")}
            >
              <option value="">Select Brand</option>
              {brandState.map((item, index) => {
                return (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>

            <select
              className="form-control py-3 mb-3"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange("category")}
            >
              <option value="">Select Category</option>
              {categoryState.map((item, index) => {
                return (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>

            <Select
              mode="multiple"
              allowClear
              className="w-100 mb-3"
              placeholder="Select colors"
              defaultValue={color}
              onChange={(i) => handleColors(i)}
              options={colorOpt}
              name="color"
            />
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>

            <select
              className="form-control py-3 mb-3"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange("tags")}
              onBlr={formik.handleBlur("tags")}
            >
              <option value="">Select Tag</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>

            <div
              className="bg-white border-1 p-5 text-center mb-3"
              name="images"
            >
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag or drop some pictures here, or click to select
                        pictures
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>

            <div className="show-img d-flex flex-wrap gap-3">
              {imageState?.map((item, index) => {
                return (
                  <div key={index} className="mb-3 position-relative">
                    <button
                      className="btn-close position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        backgroundColor: "white",
                        padding: "3px 6px",
                      }}
                      onClick={() => dispatch(deleteImg(item.public_id))}
                    ></button>
                    <img src={item.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            </div>

            <CustomInput
              type="number"
              placeholder="Enter Product Quantity"
              onCh={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity}
              name="quantity"
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>

            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
