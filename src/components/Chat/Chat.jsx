import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import image from "../../images/login-bg.png";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { connectToWebSocket } from "../../services/websocket";

export function Chat() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [avatarsWrapperWidth, setAvatarsWrapperWidth] = useState(null);
  const [socket, setSocket] = useState(()=>connectToWebSocket());

  const avatarsWrapperRef = useRef(null);

  // useEffect(() => {
  //   setSocket();
  // }, []);

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
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 1
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 2
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 3
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 4
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 5
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 6
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 7
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 8
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 9
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 10
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 11
                        }px))`,
                      }
                    : {}
                }
              />
              <img
                src={image}
                alt=""
                className={styles.avatarImage}
                style={
                  isShowMore
                    ? {
                        transform: `translateX(calc(${
                          avatarsWrapperWidth - (avatarsWrapperWidth / 12) * 12
                        }px))`,
                      }
                    : {}
                }
              />
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
              <p className={styles.participantsInfo}>12 participants</p>
              <p className={styles.onlineInfo}>8 Online</p>
            </div>
          </div>
          <div className={isShowMore ? "hidden" : styles.headerRight}>
            <GridIcon className={styles.gridIconHeader} />
            <p className={styles.chatname}>chat 2023-01D</p>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.formWrapper}>
          <MessageForm  socket={socket}/>
        </div>
      </div>
      <div className={styles.chatFeedWrapper}>
        <ChatFeed socket={socket}/>
      </div>
    </div>
  );
}
