import React, { useContext, useEffect, useRef, useState } from "react";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { useDispatch, useSelector } from "react-redux";
import { getUserGroup } from "../../redux/user/userSelectors";
import {
  getActiveUsers,
  getHistoryEnd,
  getIsLoading,
  getMessages,
  getParticipantsData,
} from "../../redux/groupChat/groupChatSelectors";
import { serverName } from "../../constants/server";
import { getFeedbackData } from "../../redux/groupChat/groupChatSelectors";
import { loadMoreMessagesThunk } from "../../redux/groupChat/groupChatOperations";
import { loadMoreMessagesThunk as loadMoreSubjectMessagesThunk } from "../../redux/subjectChats/subjectChatOperations";
import styles from "./Chat.module.scss";
import {
  getSubjectActiveUsers,
  getSubjectFeedbackData,
  getSubjectHistoryEnd,
  getSubjectIsLoading,
  getSubjectMessages,
  getSubjectParticipantsData,
} from "../../redux/subjectChats/subjectChatSelectors";
import { TypeContext } from "../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";

export function Chat({ subjectId = null, subjectData = null }) {
  const [isShowMore, setIsShowMore] = useState(false);
  const [avatarsWrapperWidth, setAvatarsWrapperWidth] = useState(null);

  const type = useContext(TypeContext) || "group";

  const avatarsWrapperRef = useRef(null);
  const chatFeedWrapperRef = useRef(null);

  const dispatch = useDispatch();

  const chatGroup = useSelector(getUserGroup) || "";
  const participantsData = useSelector(
    type === "group" ? getParticipantsData : getSubjectParticipantsData
  );
  const activeUsers = useSelector(
    type === "group" ? getActiveUsers : getSubjectActiveUsers
  );
  const replyTo = useSelector(
    type === "group" ? getFeedbackData : getSubjectFeedbackData
  );
  const messages = useSelector(
    type === "group" ? getMessages : getSubjectMessages
  );
  const targetMessage = messages?.find(
    (messege) => messege.message_id === replyTo
  );
  const receiverUser = participantsData?.find(
    (user) => user.user_id === targetMessage?.sender_id
  );
  const isLoading = useSelector(
    type === "group" ? getIsLoading : getSubjectIsLoading
  );
  const historyEnd = useSelector(
    type === "group" ? getHistoryEnd : getSubjectHistoryEnd
  );

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
          const lastMessageId = messages[messages.length - 1].message_id;
          dispatch(
            type === "group"
              ? loadMoreMessagesThunk({ groupName: chatGroup, lastMessageId })
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
    messages,
    historyEnd,
    isLoading,
    chatFeedWrapperRef,
    dispatch,
    chatGroup,
    subjectId,
    type,
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
                  if (participant.image_path) {
                    return (
                      <img
                        key={participant.user_id}
                        src={`${serverName}${participant.image_path}`}
                        alt={`${participant.Name} ${participant.Surname} avatar`}
                        className={styles.avatarImage}
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
                      />
                    );
                  }
                  return (
                    <span
                      key={participant.user_id}
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
                      {participant.username.slice(0, 1).toUpperCase()}
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
                {activeUsers?.total_active} Online
              </p>
            </div>
          </div>
          <div className={isShowMore ? "hidden" : styles.headerRight}>
            <GridIcon className={styles.gridIconHeader} />
            <p className={styles.chatname}>
              {type === "group"
                ? `chat ${chatGroup}`
                : `chat ${subjectData?.title} ${chatGroup}`}
            </p>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.formWrapper}>
          {replyTo && (
            <p className={styles.replyTo}>
              Reply to {receiverUser.name} {receiverUser.surname}'s message at{" "}
              {targetMessage.message_datetime.slice(-8, -3)}
            </p>
          )}
          <MessageForm type={type} />
        </div>
      </div>
      <div className={styles.chatFeedWrapper} ref={chatFeedWrapperRef}>
        <ChatFeed />
      </div>
    </div>
  );
}
