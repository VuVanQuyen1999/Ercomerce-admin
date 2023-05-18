import React from "react";
import CustomInput from "../components/CustomInput";

const AddCat = () => {
  return (
    <>
      <div className="">
        <h3 className="mb-4 title">Add Category</h3>
        <div className="">
          <form action="">
            <CustomInput type="text" placeholder="Enter Category" />
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCat;
