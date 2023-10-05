import { Popover } from "antd";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import React from "react";
import { HtmlRegExp } from "../../../../constants/regExp";
import { ReactComponent as EmojiIcon } from "../../../../images/icons/emoji.svg";
import styles from "./EmojiPanel.module.scss";

const EmojiPicker = ({ onChange }) => {
  const handleEmojiSelect = ({ native }) => {
    onChange((prevValue) => {
        console.log(prevValue);
      if (prevValue.replaceAll(HtmlRegExp, "").trim() === "") {
        return `${native}`;
      }
      if (prevValue.slice(-11) === '<p><br></p>') {
        return `${prevValue.slice(0, -11)}${native}`
      }
      return `${prevValue.slice(0, -4)}${native}${prevValue.slice(-4)}`;
    });
  };

  return <Picker data={data} theme="light" onEmojiSelect={handleEmojiSelect} />;
};

const EmojiPanel = ({ onChange }) => {
  return (
    <Popover
      content={<EmojiPicker onChange={onChange} />}
      placement="bottomRight"
      arrow={false}
      overlayInnerStyle={{padding: 0}}
      trigger="click"
    >
      <button type="button" className={styles.emojiBtn}>
        <EmojiIcon />
      </button>
    </Popover>
  );
};

export default EmojiPanel;
