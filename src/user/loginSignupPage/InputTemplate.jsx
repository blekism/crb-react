import React from "react";

export default function InputTemplate({
  //   icon,
  type,
  placeholder,
  onChange,
  value,
  name,
}) {
  return (
    <div class="input-group mb-3">
      {/* <span class="input-group-text" id="basic-addon1">
        {icon}
      </span> */}
      <input
        type={type}
        class="form-control"
        placeholder={placeholder}
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={onChange}
        value={value}
        name={name}
        required
        style={{ backgroundColor: "rgba(19, 62, 135, 0.21)", border: "none" }}
      />
    </div>
  );
}
