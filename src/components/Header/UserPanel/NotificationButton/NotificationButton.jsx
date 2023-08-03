import React from "react";
import { ReactComponent as BellIcon } from "../../../../images/icons/bellWithBadge.svg";
import styles from "./NotificationButton.module.scss";
import { useSelector } from "react-redux";
import { getMessages } from "../../../../redux/groupChat/groupChatSelectors";
import { getUserId } from "../../../../redux/user/userSelectors";

export default function NotificationButton() {
  const userId = useSelector(getUserId);
  const messages = useSelector(getMessages);

  const messagesToNotify =
    (messages &&
      messages.filter(
        (message) =>
          message.sender_id !== userId &&
          !message.read_by?.includes(`${userId}`)
      )) ||
    [];

  return (
    <button className={styles.wrapperBtn}>
      <BellIcon />
      <span className={styles.badge}>{messagesToNotify.length || 0}</span>
    </button>
  );
}
