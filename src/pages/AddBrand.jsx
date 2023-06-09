import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <>
      <div className="">
        <h3 className="mb-4 title">Add Brand</h3>
        <div className="">
          <form action="">
            <CustomInput type="text" placeholder="Enter Brand" />
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
