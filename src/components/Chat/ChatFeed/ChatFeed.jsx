import React, { useState } from "react";
import { MessageFromChat } from "../MessageFromChat/MessageFromChat";
import styles from "./ChatFeed.module.scss";



export function ChatFeed({ socket }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])
  

  // useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        console.log(JSON.parse(event.data));
        const data = JSON.parse(event.data);
        setMessages(data.messages);
        setUsers(data.user_info)
        console.log(users);
      };
    }
  // }, [socket]);


  return (
    <div className={styles.feedWrapper}>
      {messages.map((message) => {
        // if (message.feedbackTo === null) {
        return (
          <MessageFromChat
            message={message}
            type="origin"
            key={message.message_id}
          />
        );
        // }
        // return (
        //   <MessageFromChat
        //     message={message}
        //     type="feedback"
        //     key={message.message_id}
        //   />
        // );
      })}
    </div>
  );
}
