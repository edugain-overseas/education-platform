import { webSocketUrl } from "../constants/server";
import {
  addFeedback,
  addMessage,
  deleteAnswer,
  deleteMessage,
  setActiveData,
  setMessages,
  setUsers,
} from "../redux/groupChat/groupChatSlice";
import {
  addNewSubjectChat,
  deleteSubjectChat,
  addFeedback as addTeacherFeedback,
  addMessage as addTeacherMessage,
  setActiveData as setTeacherActiveData,
  setMessages as setTeacherMessages,
  setUsers as setTeacherUsers,
  deleteMessage as deleteTeacherMessage,
  deleteAnswer as deleteTeacherAnswer
} from "../redux/chats/chatsSlice";
import { store } from "../redux/store";
const dispatch = store.dispatch;

export const connectToWebSocket = (chatGroup, token) => {
  if ((chatGroup, token)) {
    try {
      const websocket = new WebSocket(`${webSocketUrl}${chatGroup}/${token}`);
      websocket.onopen = () => console.log("Connected");

      websocket.onclose = function (event) {
        console.log("Connection Closed");
      };
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(event.data);
        const participantsData = data.userInfo;
        const messagesData = data.messages;
        const singleMessage = data.message;

        if (messagesData) {
          if (participantsData) {
            dispatch(setUsers(participantsData));
          }
          dispatch(setMessages(messagesData));
        } else if (data.idsActiveUsers) {
          dispatch(setActiveData(data));
        } else if (data.answerId) {
          dispatch(addFeedback(data));
        } else if (typeof singleMessage !== "string") {
          dispatch(addMessage(data));
        } else if (
          typeof singleMessage === "string" &&
          singleMessage.includes("deleted") &&
          singleMessage.includes("Message")
        ) {
          dispatch(deleteMessage(singleMessage));
        } else if (
          typeof singleMessage === "string" &&
          singleMessage.includes("deleted") &&
          singleMessage.includes("Answer")
        ) {
          dispatch(deleteAnswer(singleMessage));
        }
      };
      return websocket;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
};

export const connectToTeacherSubjectWebsocket = (subject_id, token) => {
  if ((subject_id, token)) {
    try {
      const websocket = new WebSocket(
        `${webSocketUrl}subject/${subject_id}/${token}`
      );
      websocket.onopen = () => {
        console.log(`Connected to subject ${subject_id} websocket opened`);
        dispatch(addNewSubjectChat(subject_id));
      };
      websocket.onclose = () => {
        console.log(`Connected to subject ${subject_id} websocket closed`);
        dispatch(deleteSubjectChat(subject_id));
      };
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const participantsData = data.userInfo;
        const messagesData = data.messages;
        const singleMessage = data.message;
        console.log(data);

        if (messagesData) {
          if (participantsData) {
            dispatch(
              setTeacherUsers({ subjectId: subject_id, data: participantsData })
            );
          }
          dispatch(
            setTeacherMessages({ subjectId: subject_id, data: messagesData })
          );
        } else if (data.idsActiveUsers) {
          dispatch(setTeacherActiveData({ subjectId: subject_id, data }));
        } else if (data.answerId) {
          dispatch(addTeacherFeedback({ subjectId: subject_id, data }));
        } else if (typeof singleMessage !== "string") {
          dispatch(addTeacherMessage({ subjectId: subject_id, data }));
        } else if (
          typeof singleMessage === "string" &&
          singleMessage.includes("deleted") &&
          singleMessage.includes("Message")
        ) {
          dispatch(
            deleteTeacherMessage({ subjectId: subject_id, data: singleMessage })
          );
        } else if (
          typeof singleMessage === "string" &&
          singleMessage.includes("deleted") &&
          singleMessage.includes("Answer")
        ) {
          dispatch(deleteTeacherAnswer({ subjectId: subject_id, data: singleMessage }));
        }
      };
      return websocket;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
};

export const connectToSubjectWebSocket = (subject_id, token) => {
  if ((subject_id, token)) {
    try {
      const websocket = new WebSocket(
        `${webSocketUrl}subject/${subject_id}/${token}`
      );
      // websocket.onopen = () => console.log("Connected sub");

      // websocket.onclose = function (event) {
      //   console.log("Connection sub Closed");
      // };

      // websocket.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   const participantsData = data.user_info;
      //   const messagesData = data.messages;

      //   if (messagesData) {
      //     if (participantsData) {
      //       dispatch(setSubjectUsers(participantsData));
      //     }
      //     dispatch(setSubjectMessages(messagesData));
      //   } else if (data.id_active_users) {
      //     dispatch(setSubjectActiveData(data));
      //   } else if (data.answer_id) {
      //     dispatch(addSubjectFeedback(data));
      //   } else {
      //     dispatch(addSubjectMessage(data));
      //   }
      // };
      return websocket;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
};
