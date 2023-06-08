import React from "react";
import styles from "./Chat.module.scss";
import image from "../../images/login-bg.png";
import { MessageForm } from "./MessageForm/MessageForm";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";

export function Chat() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.subwrapper}>
        <div className={styles.chatHeader}>
          <div className={styles.headerRight}>
            <div className={styles.avatarsWrapper}>
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <img src={image} alt="" width={28} height={28} />
              <button>+</button>
            </div>
            <div>
              <p>12 participants</p>
              <p>8 Online</p>
            </div>
          </div>
          <div>
            <GridIcon />
            <p>chat 2023-01D</p>
          </div>
        </div>
        <div>
          <MessageForm />
        </div>
      </div>
      <div>Chat feed</div>
    </div>
  );
}
