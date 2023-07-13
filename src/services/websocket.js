const websocketUrl =
  "wss://df72-91-123-150-130.ngrok-free.app/api/v1/ws/Math23";
// df72-91-123-150-130.ngrok-free.app

export const connectToWebSocket = (token) => {
  console.log(token);
  if (token) {
    try {
      const websocket = new WebSocket(`${websocketUrl}/${token}`);
      websocket.onopen = () => console.log("Connected");
      websocket.onclose = function (event) {
        console.log("Connection Closed");
      };
      return websocket;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
  return;
};
