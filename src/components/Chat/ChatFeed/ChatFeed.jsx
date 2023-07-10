import React from "react";
import { MessageFromChat } from "../MessageFromChat/MessageFromChat";
import styles from "./ChatFeed.module.scss";
import { useSelector } from "react-redux";
import { getMessages, getParticipantsData } from "../../../redux/chat/chatSelectors";
import MutationDots from "../../Loaders/MutationDots/MutationDots";
// import { message } from "antd";



export function ChatFeed() {
  const messages = useSelector(getMessages)
  const participantsData = useSelector(getParticipantsData)

  return (
    messages ? (
      <div className={styles.feedWrapper}>
       {messages.map((message) => {
        const userData = participantsData.find(user=>user.UserId === message.sender_id);
        const messageFullData = {...message, userData}
        return (
          <MessageFromChat
            message={messageFullData}
            type="origin"
            key={message.message_id}
          />)})}
      </div>) : <MutationDots/>
  )
    // <div className={styles.feedWrapper}>
    //   {messages ? messages.map((message) => {
    //     const userData = participantsData.find(user=>user.UserId === message.sender_id);
    //     const messageFullData = {...message, userData}
    //     return (
    //       <MessageFromChat
    //         message={messageFullData}
    //         type="origin"
    //         key={message.message_id}
    //       />
    //     );
        // }
        // return (
        //   <MessageFromChat
        //     message={message}
        //     type="feedback"
        //     key={message.message_id}
        //   />
        // );
    //   }) : <MutationDots/>}
    // </div>
}
