import React, { useState } from "react";
import { ReactComponent as BellIcon } from "../../../../images/icons/bellWithBadge.svg";
import { useSelector } from "react-redux";
import {
  getMessages,
  getParticipantsData,
} from "../../../../redux/groupChat/groupChatSelectors";
import {
  getTeacherSubjects,
  getUserGroup,
  getUserId,
  getUserType,
} from "../../../../redux/user/userSelectors";
import { getAllChats } from "../../../../redux/chats/chatsSelectors";
import { Button, Card, Modal } from "antd";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { readMessageThunk } from "../../../../redux/groupChat/groupChatOperations";
import { readMessageThunk as readTeacherMessageThunk } from "../../../../redux/chats/chatOperations";
import UserAvatar from "../../../shared/UserAvatar/UserAvatar";
import SubjectChatTabs from "./SubjectChatTabs/SubjectChatTabs";
import styles from "./NotificationButton.module.scss";


export default function NotificationButton() {
  const [showModal, setShowModal] = useState(false);
  const userId = useSelector(getUserId);
  const messages = useSelector(getMessages);
  const groupName = useSelector(getUserGroup);
  const participantsData = useSelector(getParticipantsData);
  const userType = useSelector(getUserType);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chatsData = useSelector(getAllChats);
  const subjectsData = useSelector(getTeacherSubjects);

  const messagesToNotify =
    userType === "student"
      ? (messages &&
          messages.filter(
            (message) =>
              message.senderId !== userId &&
              !message.readBy?.includes(`${userId}`)
          )) ||
        []
      : chatsData?.reduce((allMessages, chat) => {
          chat.messages.forEach((message) => {
            if (!message.readBy?.includes(`${userId}`)) {
              allMessages.push({ subjectId: chat.subjectId, message: message });
            }
          });
          return allMessages;
        }, []);

  const amoutTodisplay = (messages) => {
    if (messages?.length > 99) {
      return "99+";
    }
    return messagesToNotify?.length;
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

  const handleRead = (id, messageId) => {
    dispatch(
      userType === "student"
        ? readMessageThunk(messageId)
        : readTeacherMessageThunk({ subjectId: id, data: messageId })
    );
  };

  const renderCardTitle = (message) => {
    const userData = participantsData?.find(
      (user) => user.userId === message.senderId
    );
    return (
      <div className={styles.cardHead}>
        <div className={styles.avatarWrapper}>
          <UserAvatar imageSrc={userData.imagePath} userName={userData.name} />
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

  const renderTeacherCardTitle = (id, message) => {
    const userData = chatsData
      .find(({ subjectId }) => subjectId === id)
      ?.participantsData?.find((user) => user.userId === message.senderId);
    return (
      <div className={styles.cardHead}>
        <div className={styles.avatarWrapper}>
          <UserAvatar
            imageSrc={userData?.imagePath}
            userName={userData?.name}
          />
        </div>
        <div className={styles.cardHeadInfoWrapper}>
          <span className={styles.cardHeadName}>
            {userData?.name} {userData?.surname}
          </span>
          <span className={styles.cardHeadTime}>
            {message?.messageDatetime?.slice(-8, -3)}
          </span>
        </div>
      </div>
    );
  };

  const renderCardBody = (id, message) => {
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
          onClick={() => handleRead(id, message.messageId)}
          className={styles.readBtn}
        >
          Mask as read
        </button>
      </div>
    );
  };

  const tabsItems =
    userType === "teacher"
      ? subjectsData
          ?.map((subject) => {
            if (
              messagesToNotify.find(
                ({ subjectId }) => subjectId === subject.subject_id
              )
            ) {
              return {
                label: (
                  <div>
                    <span>{subject.subject_title} </span>
                    <span>{subject.group_name}</span>
                  </div>
                ),
                key: subject.subject_id,
                children: messagesToNotify
                  .filter(({ subjectId }) => subjectId === subject.subject_id)
                  .map((message) => (
                    <Card
                      key={message.messageId}
                      title={renderTeacherCardTitle(
                        subject.subject_id,
                        message.message
                      )}
                      size="small"
                      className={styles.card}
                    >
                      {renderCardBody(subject.subject_id, message.message)}
                    </Card>
                  )),
              };
            }
            return null;
          })
          .filter((item) => item)
      : [];

  return (
    <>
      <button className={styles.wrapperBtn} onClick={handleOpenModal}>
        <BellIcon />
        <span className={styles.badge}>{amoutTodisplay(messagesToNotify)}</span>
      </button>
      <Modal
        open={showModal}
        title={
          userType === "student" ? `Chat group ${groupName}` : `Subject chats`
        }
        onCancel={handleCloseModal}
        destroyOnClose={true}
        footer={
          userType === "student"
            ? [
                <Button key="openChat" onClick={handleGoToChat}>
                  Go to chat
                </Button>,
              ]
            : null
        }
        width="60vw"
        bodyStyle={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {userType === "student" ? (
          messagesToNotify.map((message) => {
            return (
              <Card
                key={message.messageId}
                title={renderCardTitle(message)}
                size="small"
                className={styles.card}
              >
                {renderCardBody(null, message)}
              </Card>
            );
          })
        ) : (
          <SubjectChatTabs items={tabsItems} />
        )}
      </Modal>
    </>
  );
}
