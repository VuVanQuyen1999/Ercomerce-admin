import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { object, string } from "yup";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import {
  getBCategories,
  resetState,
} from "../features/bcategory/bcategorySlice";
import { createBlog, getBlog, updateBlog } from "../features/blogs/blogSlice";

const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const categoryState = useSelector((state) => state.bCategory.bCategories);
  const imageState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blog);

  const { isSuccess, isError, isLoading, createdBlog, dataBlog, updatedBlog } =
    newBlog;

  const getBlogId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
      img.push(dataBlog?.image);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(getBCategories());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");

      dispatch(resetState());
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully!");
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 2500);
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, updatedBlog, createdBlog]);

  const img = [];

  imageState.forEach((item) => {
    img.push({ public_id: item.public_id, url: item.url });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [dataBlog?.images]);

  let blogSchema = object({
    title: string().required("Title is Required"),
    description: string().required("Description is Required"),
    category: string().required("Blog Category is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: dataBlog?.title || "",
      description: dataBlog?.description || "",
      category: dataBlog?.category || "",
      images: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
      }
    },
  });

  return (
    <>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="bg-white border-1 p-5 text-center mb-3" name="images">
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
          <div className="mt-4">
            <CustomInput
              type="text"
              placeholder="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>{" "}
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3 mb-3"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
          >
            <option value="" disabled>
              Select Blog Category
            </option>
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
          <ReactQuill
            theme="snow"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Save" : "Add Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
