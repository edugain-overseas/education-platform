import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SimplePeer from "simple-peer";
import { getUserId } from "../../redux/user/userSelectors";
import styles from "./VideoChatRoom.module.scss";

const videoChatRoomId = 123;

const Video = ({ peer }) => {
  const videoRef = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <div className={styles.videoWrapper}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={styles.userVideo}
      />
    </div>
  );
};

const VideoChatRoom = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const myVideo = useRef();
  const peersRef = useRef([]);
  const myId = useSelector(getUserId);
  console.log(peers.length);

  useEffect(() => {
    const createPeer = (userId, stream) => {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        console.log(signal);
        socketRef.current.send(
          JSON.stringify({
            eventType: "sending signal",
            data: {
              userToSignal: userId,
              callerId: myId,
              signal,
            },
          })
        );
      });
      return peer;
    };

    const addPeer = (incomingSignal, callerId, stream) => {
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socketRef.current.send(
          JSON.stringify({
            eventType: "returning signal",
            data: {
              signal,
              callerId,
              userId: myId,
            },
          })
        );
      });

      peer.signal(incomingSignal);

      return peer;
    };

    socketRef.current = new WebSocket(
      `wss://9bf0-194-44-219-51.ngrok-free.app/room/${videoChatRoomId}`
    );

    socketRef.current.onopen = () => {
      console.log("connected to video chat room");

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideo.current.srcObject = stream;
          socketRef.current.send(
            JSON.stringify({ eventType: "join room", data: { userId: myId } })
          );
          socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { eventType, data } = message;
            console.log(eventType, data);
            switch (eventType) {
              case "all users":
                console.log("all users");
                const peers = [];
                data.forEach((userId) => {
                  const peer = createPeer(userId, stream);
                  console.log(peersRef);
                  peersRef.current.push({
                    peerId: userId,
                    peer,
                  });
                  peers.push(peer);
                });
                setPeers(peers);
                break;

              case "user joined":
                const peer = addPeer(data.signal, data.callerId, stream);
                peersRef.current.push({
                  peerId: data.callerId,
                  peer,
                });
                setPeers((prevPeers) => [...prevPeers, peer]);
                break;

              case "receiving returned signal":
                const peerToSignal = peersRef.current.find(
                  (peer) => peer.peerId === data.id
                ).peer;
                console.log(peerToSignal);
                peerToSignal.signal(data.signal);
                break;
              default:
                break;
            }
          };
        });
    };

    socketRef.current.onclose = () => {
      console.log("connection closed");
    };

    return () => {
      socketRef.current.close();
    };
  }, [myId]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.videoLayout}>
        <div className={styles.videoWrapper}>
          <video
            ref={myVideo}
            muted
            autoPlay
            playsInline
            className={styles.myVideo}
          />
        </div>

        {peers.map((peer, index) => (
          <Video key={index} peer={peer} />
        ))}
      </div>
    </div>
  );
};

export default VideoChatRoom;
