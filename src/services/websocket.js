import { webSocketUrl } from "../constants/server";
import {
  addMessage,
  setActiveData,
  setMessages,
  setUsers,
} from "../redux/chat/chatSlice";
import { store } from "../redux/store";
const dispatch = store.dispatch;

export const connectToWebSocket = (chatGroup, token) => {
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
      console.log(data);
      if (messagesData) {
        if (participantsData) {
          dispatch(setUsers(participantsData));
        }
        dispatch(setMessages(messagesData));
      } else if (data.id_active_users) {
        dispatch(setActiveData(data));
      } else {
        dispatch(addMessage(data));
      }
    };

    return websocket;
  } catch (error) {
    console.log("Error:", error.message);
  }
};
