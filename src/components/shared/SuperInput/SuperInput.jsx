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
import alignRight from "../../../images/icons/editTextIcons/alignRight.svg";
import alignCenter from "../../../images/icons/editTextIcons/alignCenter.svg";
import alignJustify from "../../../images/icons/burger.svg";
import "./SuperInput.scss";
import { useParams } from "react-router-dom";

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
    center: { icon: alignCenter, className: undefined },
    right: { icon: alignRight, className: undefined },
    justify: { icon: alignJustify, className: "alignJustifyIcon" },
  },
};

const SuperInput = ({
  state,
  setState,
  placeholder,
  styles,
  bordered = false,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { instructionId } = useParams();

  useEffect(() => {
    const contentBlock = htmlToDraft(state);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
    // eslint-disable-next-line
  }, [instructionId]);

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
        editorClassName={
          bordered ? "superInputEditor bordered" : "superInputEditor"
        }
        wrapperClassName="superInputWrapper"
      />
    </div>
  );
};

export default SuperInput;
