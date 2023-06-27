// import { useDispatch } from "react-redux";

const websocketUrl = "wss://e54a-194-44-219-51.ngrok-free.app/api/v1/ws/Fil23";
// const dispatch = useDispatch();


export const connectToWebSocket = () => {
  const websocket = new WebSocket(websocketUrl);
  return websocket
}
//   websocket.onopen = function (event) {
//     // console.log(event);
//   };

//   websocket.onmessage = function (e) {
//     // console.log(JSON.parse(e.data));
//     // dispatch(setMessages(e.data))

//   };

//   const onsend = (data) => {
//     websocket.send(JSON.stringify(data));
//   };

//   return {
//     onmessage: websocket.onmessage,
//     // websocket,
//     onsend,
//   };
//     // return
// };
