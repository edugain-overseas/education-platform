import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import undo from "../../../images/icons/editTextIcons/undo.svg";
import redo from "../../../images/icons/editTextIcons/redo.svg";
import bold from "../../../images/icons/editTextIcons/bold.svg";
import italic from "../../../images/icons/editTextIcons/italic.svg";
import underline from "../../../images/icons/editTextIcons/underline.svg";
import ul from "../../../images/icons/editTextIcons/ul.svg";
import ol from "../../../images/icons/editTextIcons/ol.svg";
import alignLeft from "../../../images/icons/editTextIcons/alignLeft.svg";
import "./SuperInput.scss";

const toolbar = {
  options: ["history", "fontSize", "inline", "list", "textAlign"],
  history: {
    className: "historyWrapper",
    options: ["undo", "redo"],
    undo: { icon: undo, className: "undo" },
    redo: { icon: redo, className: "redo" },
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
    className: "fontSize",
    dropdownClassName: "fontSizeDropDown",
  },
  inline: {
    options: ["bold", "italic", "underline"],
    className: "inlineWrapper",
    bold: { icon: bold, className: "bold" },
    italic: { icon: italic, className: "italic" },
    underline: { icon: underline, className: "underline" },
  },
  list: {
    className: "listWrapper",
    options: ["unordered", "ordered"],
    unordered: { icon: ul, className: "ul" },
    ordered: { icon: ol, className: "ol" },
  },
  textAlign: {
    inDropdown: true,
    className: "textAlign",
    options: ["left", "center", "right", "justify"],
    left: { icon: alignLeft, className: "alignLeft" },
    // center: { icon: center, className: undefined },
    // right: { icon: right, className: undefined },
    // justify: { icon: justify, className: undefined },
  },
};

const SuperInput = ({ state, setState, placeholder, styles }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (state !== "") {
      const contentBlock = htmlToDraft(state);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
    // eslint-disable-next-line
  }, []);
  // const contentBlock = htmlToDraft(state);
  // const contentState = ContentState.createFromBlockArray(
  //   contentBlock.contentBlocks
  // );
  // const editorStateQ = EditorState.createWithContent(contentState);
  const onChange = (value) => {
    setEditorState(value);
    setState(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  return (
    <div className={styles.inputWrapper}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onChange}
        placeholder={placeholder}
        toolbarOnFocus
        toolbar={toolbar}
        toolbarClassName="toolbar"
        editorClassName="superInputEditor"
        wrapperClassName="superInputWrapper"
      />
    </div>
  );
};

export default SuperInput;
