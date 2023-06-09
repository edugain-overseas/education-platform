import React, { useState } from "react";
import styles from "./Chat.module.scss";
import image from "../../images/login-bg.png";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ChatFeed } from "./ChatFeed/ChatFeed";

export function Chat() {
  const [isShowMore, setIsShowMore] = useState(false);

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
            <div className={`${styles.avatarsWrapper} ${isShowMore && styles.more}`}>
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              <img src={image} alt="" className={styles.avatarImage} />
              {isShowMore ? (
                <>
                  <button>+</button>
                  <button onClick={handleShowLess}>x</button>
                </>
              ) : (
                <button
                  className={styles.showMoreAvatars}
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
          <MessageForm />
        </div>
      </div>
      <div className={styles.chatFeedWrapper}>
        <ChatFeed />
      </div>
    </div>
  );
}
