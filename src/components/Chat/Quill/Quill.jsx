import React, { useState } from "react";
import ReactQuill from "react-quill";
// import { ReactComponent as ListIcon } from "../../../images/icons/list.svg";
import "react-quill/dist/quill.snow.css";
import "./Quill.scss";

export function Quill() {
  const [editorContent, setEditorContent] = useState("");

  const modules = {
    toolbar: [["bold", "italic", "underline", { list: "bullet" }]],
  };

//   const formats = ["bold", "italic", "underline", "bullet"];

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={editorContent}
      modules={modules}
      onChange={handleEditorChange}
      className="wrapper"
      placeholder="Enter you message here"
    />
  );
}
