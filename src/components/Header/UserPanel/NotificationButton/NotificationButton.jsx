import React, { useState } from "react";
import { ReactComponent as BellIcon } from "../../../../images/icons/bellWithBadge.svg";
import { useSelector } from "react-redux";
import {
  getMessages,
  getParticipantsData,
} from "../../../../redux/groupChat/groupChatSelectors";
import { getUserGroup, getUserId } from "../../../../redux/user/userSelectors";
import { Button, Card, Modal } from "antd";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { readMessageThunk } from "../../../../redux/groupChat/groupChatOperations";
import UserAvatar from "../../../shared/UserAvatar/UserAvatar";
import styles from "./NotificationButton.module.scss";

export default function NotificationButton() {
  const [showModal, setShowModal] = useState(false);
  const userId = useSelector(getUserId);
  const messages = useSelector(getMessages);
  const groupName = useSelector(getUserGroup);
  const participantsData = useSelector(getParticipantsData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const messagesToNotify =
    (messages &&
      messages.filter(
        (message) =>
          message.senderId !== userId && !message.readBy?.includes(`${userId}`)
      )) ||
    [];

  const amoutTodisplay = () => {
    if (messagesToNotify.length > 99) {
      return "99+";
    }
    return messagesToNotify.length;
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoToChat = () => {
    navigate("/");
    setShowModal(false);
  };

  const handleRead = (messageId) => {
    console.log(messageId);
    dispatch(readMessageThunk(messageId));
  };

  const renderCardTitle = (message) => {
    const userData = participantsData.find(
      (user) => user.user_id === message.sender_id
    );
    return (
      <div className={styles.cardHead}>
        <div className={styles.avatarWrapper}>
          <UserAvatar imageSrc={userData.image_path} userName={userData.name} />
        </div>
        <div className={styles.cardHeadInfoWrapper}>
          <span className={styles.cardHeadName}>
            {userData.name} {userData.surname}
          </span>
          <span className={styles.cardHeadTime}>
            {message.messageDatetime.slice(-8, -3)}
          </span>
        </div>
      </div>
    );
  };

  const renderCardBody = (message) => {
    return (
      <div className={styles.cardBody}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: message.messageText,
          }}
        />
        {message.attachFiles.length !== 0 && (
          <p className={styles.mediaInfo}>
            + {message.attachFiles.length} media
          </p>
        )}
        <button
          onClick={() => handleRead(message.messageId)}
          className={styles.readBtn}
        >
          Mask as read
        </button>
      </div>
    );
  };

  return (
    <>
      <button className={styles.wrapperBtn} onClick={handleOpenModal}>
        <BellIcon />
        <span className={styles.badge}>{amoutTodisplay()}</span>
      </button>
      <Modal
        open={showModal}
        title={`Chat group ${groupName}`}
        onCancel={handleCloseModal}
        destroyOnClose={true}
        footer={[
          <Button key="openChat" onClick={handleGoToChat}>
            Go to chat
          </Button>,
        ]}
        width="60vw"
        bodyStyle={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {messagesToNotify.map((message) => (
          <Card
            key={message.messageId}
            title={renderCardTitle(message)}
            size="small"
            className={styles.card}
          >
            {renderCardBody(message)}
          </Card>
        ))}
      </Modal>
    </>
  );
}
