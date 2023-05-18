import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCat = () => {
  return (
    <>
      <div className="">
        <h3 className="mb-4 title">Add Blog Category</h3>
        <div className="">
          <form action="">
            <CustomInput type="text" placeholder="Enter Blog Category" />
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Blog Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCat;
