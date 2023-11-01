import React, { useContext, useEffect, useRef, useState } from "react";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherSubjects,
  getUserGroup,
  getUserType,
} from "../../redux/user/userSelectors";

import { serverName } from "../../constants/server";
import { loadMoreMessagesThunk } from "../../redux/groupChat/groupChatOperations";
import { loadMoreMessagesThunk as loadMoreSubjectMessagesThunk } from "../../redux/subjectChats/subjectChatOperations";
import { loadMoreMessagesThunk as loadMoreTeacherSubjectMessagesThunk } from "../../redux/chats/chatOperations";
import styles from "./Chat.module.scss";
import { TypeContext } from "../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import FixedMessages from "./FixedMessages/FixedMessages";

export function Chat({
  subjectId = null,
  subjectData = null,
  chatData = null,
}) {
  const [isShowMore, setIsShowMore] = useState(false);
  const [avatarsWrapperWidth, setAvatarsWrapperWidth] = useState(null);

  const type = useContext(TypeContext) || "main";

  const avatarsWrapperRef = useRef(null);
  const chatFeedWrapperRef = useRef(null);

  const dispatch = useDispatch();

  const userType = useSelector(getUserType);
  const userGroup = useSelector(getUserGroup) || "";
  const chatGroup = useSelector(getTeacherSubjects)?.find(
    ({ subject_id }) => +subject_id === chatData.subjectId
  )?.group_name;
  const chatSubjectTitle = useSelector(getTeacherSubjects)?.find(
    ({ subject_id }) => +subject_id === chatData.subjectId
  )?.subject_title;


  const participantsData = chatData?.participantsData;

  const activeUsers = chatData?.activeData;

  const replyTo = chatData?.feedbackTo;

  const messages = chatData?.messages;
  const targetMessage = messages?.find(
    (messege) => messege.messageId === replyTo
  );
  const receiverUser = participantsData?.find(
    (user) => user.userId === targetMessage?.senderId
  );

  const isLoading = chatData?.isLoading;

  const historyEnd = chatData?.historyEnd;
  const fixedMessages =
    messages?.filter(({ messageFixed }) => messageFixed) || [];

  useEffect(() => {
    setAvatarsWrapperWidth(avatarsWrapperRef?.current?.offsetWidth);
  }, [isShowMore, avatarsWrapperWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || historyEnd) {
        return;
      }
      const wrapper = chatFeedWrapperRef.current;
      if (wrapper) {
        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        if ((scrollTop + clientHeight) / scrollHeight >= 0.85) {
          const lastMessageId = messages[messages.length - 1]?.messageId;
          dispatch(
            type === "main"
              ? userType === "teacher"
                ? loadMoreTeacherSubjectMessagesThunk({
                    subjectId: chatData.subjectId,
                    data: {
                      subjectId: chatData.subjectId,
                      lastMessageId,
                    },
                  })
                : loadMoreMessagesThunk({
                    groupName: userGroup,
                    lastMessageId,
                  })
              : loadMoreSubjectMessagesThunk({
                  subjectId: subjectId,
                  lastMessageId,
                })
          );
        }
      }
    };

    const scrollWrapper = chatFeedWrapperRef.current;
    if (scrollWrapper) {
      scrollWrapper.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollWrapper) {
        scrollWrapper.removeEventListener("scroll", handleScroll);
      }
    };
  }, [
    dispatch,
    messages,
    historyEnd,
    isLoading,
    chatFeedWrapperRef,
    chatGroup,
    subjectId,
    type,
    chatData.subjectId,
    userGroup,
    userType,
  ]);

  const handleShowMore = () => {
    setIsShowMore(true);
  };

  const handleShowLess = () => {
    setIsShowMore(false);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.subWrapper}>
        <div className={styles.chatHeader}>
          <div className={`${styles.headerLeft} ${isShowMore && styles.more}`}>
            <div
              className={`${styles.avatarsWrapper} ${
                isShowMore && styles.more
              }`}
              ref={avatarsWrapperRef}
            >
              {participantsData &&
                participantsData.map((participant, index) => {
                  if (participant.imagePath) {
                    const online = activeUsers?.idsActiveUsers?.includes(
                      participant.userId
                    );
                    return (
                      <div
                        key={participant.userId}
                        className={styles.imageWrapper}
                        style={
                          isShowMore
                            ? {
                                transform: `translateX(calc(28rem * ${
                                  participantsData.length
                                } - 28rem * ${index + 1} - (4rem * ${
                                  participantsData.length - index - 1
                                })))`,
                                zIndex: `${participantsData.length - index}`,
                              }
                            : {}
                        }
                      >
                        <img
                          src={`${serverName}${participant.imagePath}`}
                          alt={`${participant.name} ${participant.surname} avatar`}
                          className={styles.avatarImage}
                        />
                        <div
                          className={
                            online
                              ? `${styles.status} ${styles.online}`
                              : `${styles.status} ${styles.offline}`
                          }
                        ></div>
                      </div>
                    );
                  }
                  return (
                    <span
                      key={participant.userId}
                      className={`${styles.avatarImage} ${styles.noImageAvatar}`}
                      style={
                        isShowMore
                          ? {
                              transform: `translateX(calc(28rem * ${
                                participantsData.length
                              } - 28rem * ${index + 1} - (4rem * ${
                                participantsData.length - index - 1
                              })))`,
                              zIndex: `${participantsData.length - index}`,
                            }
                          : {}
                      }
                    >
                      {participant.username[0].toUpperCase()}
                    </span>
                  );
                })}
              {isShowMore ? (
                <>
                  <button
                    onClick={handleShowLess}
                    className={styles.showLessAvatarsButton}
                  >
                    x
                  </button>
                </>
              ) : (
                <button
                  className={styles.showMoreAvatarsButton}
                  onClick={handleShowMore}
                >
                  +
                </button>
              )}
            </div>
            <div className={isShowMore ? "hidden" : styles.infoWrapper}>
              <p className={styles.participantsInfo}>
                {participantsData?.length} participants
              </p>
              <p className={styles.onlineInfo}>
                {activeUsers?.totalActive} Online
              </p>
            </div>
          </div>
          <div className={isShowMore ? "hidden" : styles.headerRight}>
            <GridIcon className={styles.gridIconHeader} />
            <p className={styles.chatname}>
              {type === "main"
                ? userType === "student"
                  ? `chat ${userGroup}`
                  : `chat ${chatSubjectTitle} ${chatGroup}`
                : `chat ${subjectData?.title} Med-23-1`}
            </p>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.formWrapper}>
          {replyTo && (
            <p className={styles.replyTo}>
              Reply to {receiverUser.name} {receiverUser.surname}'s message at{" "}
              {targetMessage.messageDatetime.slice(-8, -3)}
            </p>
          )}
          <MessageForm type={type} chatData={chatData} />
        </div>
      </div>
      {fixedMessages.length !== 0 && (
        <FixedMessages messages={fixedMessages} chatData={chatData} />
      )}
      <div
        className={
          fixedMessages.length !== 0
            ? styles.chatFeedWrapperFixed
            : styles.chatFeedWrapper
        }
        ref={chatFeedWrapperRef}
      >
        <ChatFeed chatData={chatData} />
      </div>
    </div>
  );
}
