import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { connectToWebSocket } from "../../services/websocket";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUserGroup } from "../../redux/user/userSelectors";
import {
  getActiveUsers,
  getParticipantsData,
} from "../../redux/chat/chatSelectors";
import { serverName } from "../../constants/server";
import { getFeedbackData } from "../../redux/chat/chatSelectors";

export function Chat() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [avatarsWrapperWidth, setAvatarsWrapperWidth] = useState(null);

  const websocket = useRef(null);
  const avatarsWrapperRef = useRef(null);

  const chatGroup = useSelector(getUserGroup) || "";
  const participantsData = useSelector(getParticipantsData);
  const token = useSelector(getToken);
  const activeUsers = useSelector(getActiveUsers);
  const replyTo = useSelector(getFeedbackData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && chatGroup) {
      websocket.current = connectToWebSocket(chatGroup, token);

      return () => websocket.current.close();
    }
  }, [dispatch, token, chatGroup]);

  useEffect(() => {
    setAvatarsWrapperWidth(avatarsWrapperRef?.current?.offsetWidth);
  }, [isShowMore, avatarsWrapperWidth]);

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
          {replyTo && <p className={styles.replyTo}>Reply to</p>}
          <MessageForm socket={websocket.current} />
        </div>
      </div>
      <div className={styles.chatFeedWrapper}>
        <ChatFeed />
      </div>
    </div>
  );
}
