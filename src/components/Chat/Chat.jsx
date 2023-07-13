import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { connectToWebSocket } from "../../services/websocket";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUserGroup } from "../../redux/user/userSelectors";
import {
  setMessages,
  setUsers,
  reciveMessage,
} from "../../redux/chat/chatSlice";
import { getParticipantsData } from "../../redux/chat/chatSelectors";
import { serverName } from "../../constants/server";

export function Chat() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [avatarsWrapperWidth, setAvatarsWrapperWidth] = useState(null);

  const websocket = useRef(null);
  const avatarsWrapperRef = useRef(null);

  const chatGroup = useSelector(getUserGroup) || "";
  const participantsData = useSelector(getParticipantsData);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    websocket.current = connectToWebSocket(token);

    websocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      const participantsData = data.user_info;
      const messagesData = data.messages;
      if (participantsData) {
        dispatch(setUsers(participantsData));
      }
      if (messagesData) {
        dispatch(setMessages(messagesData));
      } else {
        dispatch(reciveMessage(data));
      }
    };

    // return () => websocket.current.close();
  }, [dispatch]);

  useEffect(() => {
    setAvatarsWrapperWidth(avatarsWrapperRef?.current?.offsetWidth);
  }, [isShowMore]);

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
                participantsData.map((participant, index) => (
                  <img
                  key={participant.UserId}
                    src={`${serverName}${participant.ImagePath}`}
                    // src=""
                    alt={`${participant.Name} ${participant.Surname} avatar`}
                    className={styles.avatarImage}
                    style={
                      isShowMore
                        ? {
                            transform: `translateX(calc(${
                              avatarsWrapperWidth -
                              (avatarsWrapperWidth / participantsData.length) *
                                (index + 1)
                            }px))`,
                          }
                        : {}
                    }
                  />
                ))}
              {isShowMore ? (
                <>
                  {/* <button className={styles.addToChatButton}>+</button> */}
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
              <p className={styles.participantsInfo}>5 participants</p>
              <p className={styles.onlineInfo}>3 Online</p>
            </div>
          </div>
          <div className={isShowMore ? "hidden" : styles.headerRight}>
            <GridIcon className={styles.gridIconHeader} />
            <p className={styles.chatname}>chat {chatGroup}</p>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.formWrapper}>
          <MessageForm socket={websocket.current} />
        </div>
      </div>
      <div className={styles.chatFeedWrapper}>
        <ChatFeed />
      </div>
    </div>
  );
}
