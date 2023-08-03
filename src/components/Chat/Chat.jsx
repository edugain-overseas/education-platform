import React, { useEffect, useRef, useState } from "react";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { connectToWebSocket } from "../../services/websocket";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUserGroup } from "../../redux/user/userSelectors";
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
import styles from "./Chat.module.scss";

export function Chat() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [avatarsWrapperWidth, setAvatarsWrapperWidth] = useState(null);

  const websocket = useRef(null);
  const avatarsWrapperRef = useRef(null);
  const chatFeedWrapperRef = useRef(null);

  const dispatch = useDispatch();

  const chatGroup = useSelector(getUserGroup) || "";
  const participantsData = useSelector(getParticipantsData);
  const token = useSelector(getToken);
  const activeUsers = useSelector(getActiveUsers);
  const replyTo = useSelector(getFeedbackData);
  const messages = useSelector(getMessages);
  const targetMessage = messages?.find(
    (messege) => messege.message_id === replyTo
  );
  const receiverUser = participantsData?.find(
    (user) => user.user_id === targetMessage?.sender_id
  );
  const isLoading = useSelector(getIsLoading);
  const historyEnd = useSelector(getHistoryEnd);

  useEffect(() => {
    if (token && chatGroup) {
      websocket.current = connectToWebSocket(chatGroup, token);

      return () => websocket.current.close();
    }
  }, [dispatch, token, chatGroup]);

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
            loadMoreMessagesThunk({ groupName: chatGroup, lastMessageId })
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
  }, [messages, historyEnd, isLoading, chatFeedWrapperRef, dispatch, chatGroup]);

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
            <p className={styles.chatname}>chat {chatGroup}</p>
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
          <MessageForm socket={websocket.current} />
        </div>
      </div>
      <div className={styles.chatFeedWrapper} ref={chatFeedWrapperRef}>
        <ChatFeed />
      </div>
    </div>
  );
}
