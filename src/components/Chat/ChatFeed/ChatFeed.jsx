import React, { useEffect, useState } from "react";
import moment from "moment";
import { MessageFromChat } from "../MessageFromChat/MessageFromChat";
import styles from "./ChatFeed.module.scss";

const messagesTest = [
  {
    id: 1,
    content: "hello wordld",
    groupId: 1,
    date: moment(),
    fixed: false,
    senderId: 1,
    senderType: "",
    feedbackTo: null,
  },
  {
    id: 2,
    content: "hello wordld",
    groupId: 1,
    date: moment(),
    fixed: false,
    senderId: 2,
    senderType: "",
    feedbackTo: 1,
  },
  {
    id: 3,
    content: "hello wordld",
    groupId: 1,
    date: moment(),
    fixed: false,
    senderId: 1,
    senderType: "",
    feedbackTo: null,
  },
  {
    id: 4,
    content: "hello wordld",
    groupId: 1,
    date: moment(),
    fixed: false,
    senderId: 2,
    senderType: "",
    feedbackTo: null,
  },
];

export function ChatFeed({ socket }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])
  

  useEffect(() => {
    socket.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      const data = JSON.parse(event.data);
      setMessages(data.messages);
      setUsers(data.user_info)
    };
  }, [socket]);

  console.log(messages);
  console.log(users);

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
