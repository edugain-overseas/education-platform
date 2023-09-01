import { webSocketUrl } from "../constants/server";
import {
  addFeedback,
  addMessage,
  setActiveData,
  setMessages,
  setUsers,
} from "../redux/groupChat/groupChatSlice";
import {
  addFeedback as addSubjectFeedback,
  addMessage as addSubjectMessage,
  setActiveData as setSubjectActiveData,
  setMessages as setSubjectMessages,
  setUsers as setSubjectUsers,
} from "../redux/subjectChats/subjectChatSlice";
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
        const participantsData = data.user_info;
        const messagesData = data.messages;

        if (messagesData) {
          if (participantsData) {
            dispatch(setUsers(participantsData));
          }
          dispatch(setMessages(messagesData));
        } else if (data.id_active_users) {
          dispatch(setActiveData(data));
        } else if (data.answer_id) {
          dispatch(addFeedback(data));
        } else {
          dispatch(addMessage(data));
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
      websocket.onopen = () => console.log("Connected sub");

      websocket.onclose = function (event) {
        console.log("Connection sub Closed");
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const participantsData = data.user_info;
        const messagesData = data.messages;

        if (messagesData) {
          if (participantsData) {
            dispatch(setSubjectUsers(participantsData));
          }
          dispatch(setSubjectMessages(messagesData));
        } else if (data.id_active_users) {
          dispatch(setSubjectActiveData(data));
        } else if (data.answer_id) {
          dispatch(addSubjectFeedback(data));
        } else {
          dispatch(addSubjectMessage(data));
        }
      };
      return websocket;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
};
