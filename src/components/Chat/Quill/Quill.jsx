import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Quill.scss";

export function Quill({ onChange, value }) {
  const [isFocused, setIsFocused] = useState(false);
  
  const modules = {
    toolbar: [["bold", "italic", "underline", { list: "bullet" }]],
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onFocus={()=>setIsFocused(true)}
      onBlur={()=>setIsFocused(false)}
      modules={modules}
      onChange={onChange}
      className={isFocused ? "wrapper" : "wrapper wrapper--closed"}
      placeholder="Enter you message here"
    />
  );
}
