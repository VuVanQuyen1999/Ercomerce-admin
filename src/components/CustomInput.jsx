import React from "react";

const CustomInput = (props) => {
  const { type, placeholder, i_id, i_class, name, val, onCh, onBlr } = props;
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={placeholder}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBlr}
      />
      <label htmlFor={i_id}>{placeholder}</label>
    </div>
  );
};

export default CustomInput;
