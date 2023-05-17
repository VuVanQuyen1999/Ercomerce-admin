import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
    };
    return (
        <>
            <h3 className="mb-4">Add Blog</h3>
            <div className="">
                <form action="">
                    <CustomInput type="text" placeholder="Enter Blog Title" />
                    <select className="form-control py-3 mb-3">
                        <option value="">Select Blog Category</option>
                    </select>
                    return{" "}
                    <ReactQuill
                        theme="snow"
                        value={desc}
                        onChange={(evt) => {
                            handleDesc(evt);
                        }}
                    />
                </form>
            </div>
        </>
    );
};

export default AddBlog;
