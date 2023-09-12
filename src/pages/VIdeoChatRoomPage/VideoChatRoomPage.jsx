import React, { useRef, useState } from "react";
// import { useSelector } from "react-redux";
import SimplePeer from "simple-peer";
// import { getUserId, getUserType } from "../../redux/user/userSelectors";
// import { useParams } from "react-router-dom";
import { v4 } from "uuid";

const userId = v4();

export default function VideoChatRoomPage() {
  const [localStream, setLocalStream] = useState(null);
  const [myPeer, setMyPeer] = useState(null);
  const websocket = useRef(null);

  const [type, setType] = useState("");
  const videoChatRoomId = 123;

  // const { videoChatRoomId } = useParams();
  // const userId = useSelector(getUserId);
  // const userType = useSelector(getUserType);
  // console.log(userType);
  // const initiator = userType === "teacher";
  const initiator = type === "teacher";

  const handleConnect = () => {
    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        const myVideo = document.createElement("video");
        myVideo.autoplay = true;
        myVideo.muted = true;
        myVideo.playsInline = true;
        myVideo.srcObject = stream;
        myVideo.style.width = "600rem";
        document.getElementById("streams").appendChild(myVideo);

        const myPeer = new SimplePeer({
          initiator: initiator,
          trickle: false,
          stream: stream,
        });
        setMyPeer(myPeer);

        myPeer.on("signal", (signal) => {
          console.log("signal", signal);
          console.log(type);
          websocket.current.send(
            JSON.stringify({ from: userId, fromUserType: type, signal })
          );
        });

        console.log(myPeer);

        myPeer.on("stream", (stream) => {
          console.log("stream", stream);
          const userVideo = document.createElement("video");
          userVideo.autoplay = true;
          userVideo.srcObject = stream;
          userVideo.playsInline = true;
          userVideo.style.width = "600rem";
          document.getElementById("streams").appendChild(userVideo);
        });

        websocket.current.onmessage = (event) => {
          console.log("message");
          const signalFromUser = JSON.parse(event.data);
          if (signalFromUser.sdp && myPeer) {
            console.log("signal back", signalFromUser);
            myPeer.signal(signalFromUser);
          }
        };
      } catch (error) {
        console.log("error access stream", error);
      }
    };

    websocket.current = new WebSocket(
      `wss://940e-91-123-151-70.ngrok-free.app/room/${videoChatRoomId}`
    );

    websocket.current.onopen = () =>
      console.log("connected to video chat websocket");

    websocket.current.onclose = () =>
      console.log("disconnected from video chat websocket");

    getLocalStream();
  };

  const handleDisconnect = () => {
    if (websocket.current) {
      websocket.current.close();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      console.log(localStream.getTracks());
      setLocalStream(null);
    }
    // if (myPeer) {
    //   myPeer.destroy();
    // }
  };
  console.log(myPeer);

  // useEffect(() => {
  //   const getLocalStream = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //         audio: true,
  //       });
  //       setLocalStream(stream);
  //       const myVideo = document.createElement("video");
  //       myVideo.autoplay = true;
  //       myVideo.muted = true;
  //       myVideo.playsInline = true;
  //       myVideo.srcObject = stream;
  //       myVideo.style.width = "600rem";
  //       document.getElementById("streams").appendChild(myVideo);

  //       const myPeer = new SimplePeer({
  //         initiator: initiator,
  //         trickle: false,
  //         stream: stream,
  //       });
  //       setMyPeer(myPeer);

  //       myPeer.on("signal", (signal) => {
  //         console.log("signal", signal);
  //         websocket.current.send(
  //           JSON.stringify({ from: userId, fromUserType: userType, signal })
  //         );
  //       });

  //       console.log(myPeer);

  //       myPeer.on("stream", (stream) => {
  //         console.log("stream");
  //         const userVideo = document.createElement("video");
  //         userVideo.autoplay = true;
  //         userVideo.srcObject = stream;
  //         userVideo.playsInline = true;
  //         myVideo.style.width = "300rem";
  //         document.getElementById("streams").appendChild(userVideo);
  //       });

  //       websocket.current.onmessage = (event) => {
  //         console.log("message");
  //         const signalFromUser = JSON.parse(event.data);
  //         if (signalFromUser.sdp && myPeer) {
  //           console.log("signal back", signalFromUser);
  //           myPeer.signal(signalFromUser);
  //         }
  //       };
  //     } catch (error) {
  //       console.log("error access stream", error);
  //     }
  //   };
  //   websocket.current = new WebSocket(
  //     `wss://940e-91-123-151-70.ngrok-free.app/room/${videoChatRoomId}`
  //   );

  //   websocket.current.onopen = () =>
  //     console.log("connected to video chat websocket");

  //   websocket.current.onclose = () =>
  //     console.log("disconnected from video chat websocket");

  //   getLocalStream();

  //   return () => {
  //     if (websocket.current) {
  //       websocket.current.close();
  //     }
  //     if (localStream) {
  //       localStream.getTracks().forEach((track) => track.stop());
  //       console.log(localStream.getTracks());
  //       setLocalStream(null)
  //     }
  //     if (myPeer) {
  //       myPeer.destroy();
  //     }
  //   };
  // }, []);

  return (
    <div id="streams">
      <div>
        <button
          onClick={handleConnect}
          style={{
            marginRight: 30,
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          Connect
        </button>
        <button
          onClick={handleDisconnect}
          style={{
            marginRight: 30,
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          Disconnect
        </button>
        <button
          onClick={() => setType("teacher")}
          style={{
            marginRight: 30,
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          Teacher
        </button>
        <button
          onClick={() => setType("student")}
          style={{
            marginRight: 30,
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          Student
        </button>
      </div>
    </div>
  );
}
