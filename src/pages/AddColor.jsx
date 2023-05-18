import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <>
      <div className="">
        <h3 className="mb-4 title">Add Color</h3>
        <div className="">
          <form action="">
            <CustomInput type="color" placeholder="Enter Color" />
            <button className="btn btn-success border-0 rounded-3 my-5">
              Add Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddColor;
