import React from "react";
import { ReactComponent as DetailsIcon } from "../../../images/icons/details.svg";
import { ReactComponent as EditIcon } from "../../../images/icons/editBlack.svg";
import { ReactComponent as DeleteIcon } from "../../../images/icons/trashRounded.svg";
import { Dropdown, Popconfirm } from "antd";
import styles from "./MessageDetailBtn.module.scss";

const MessageDetailBtn = ({ handleDelete, handleEditMessage }) => {
  const items = [
    {
      key: "edit",
      label: (
        <div className={styles.menuItemWrapper} onClick={handleEditMessage}>
          <EditIcon className={styles.editIcon} />
          <span>Edit message</span>
        </div>
      ),
    },
    {
      key: "delete",
      danger: true,
      label: (
        <Popconfirm
          title={<span>Delete message</span>}
          description={<span>Are you sure to delete this message?</span>}
          okText="Yes"
          onConfirm={handleDelete}
          arrow={false}
          placement="topRight"
        >
          <div className={styles.menuItemWrapper}>
            <DeleteIcon className={styles.deleteIcon} />
            <span>Delete message</span>
          </div>
        </Popconfirm>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="topRight">
      <button className={styles.detailsBtn}>
        <DetailsIcon />
      </button>
    </Dropdown>
  );
};

export default MessageDetailBtn;
