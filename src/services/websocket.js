const websocketUrl = "wss://e54a-194-44-219-51.ngrok-free.app/api/v1/ws/Fil23";

export const connectToWebSocket = () => {
  try {
    const websocket = new WebSocket(websocketUrl);
    websocket.onopen = () => console.log("Connected");
    websocket.onclose = function (event) {
      console.log('Connection Closed');
    }

    return websocket;
  } catch (error) {
    console.log("Error:", error.message);
  }
};
