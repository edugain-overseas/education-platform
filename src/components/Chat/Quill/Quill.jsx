import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Quill.scss";

export function Quill({ onChange, value, focused }) {
  const modules = {
    toolbar: [["bold", "italic", "underline", { list: "bullet" }]],
  };

  return (
      <ReactQuill
      theme="snow"
      value={value}
      modules={modules}
      onChange={onChange}
      className={focused ? "wrapper" : "wrapper wrapper--closed"}
      placeholder="Enter you message here"
    />
    )
  }

