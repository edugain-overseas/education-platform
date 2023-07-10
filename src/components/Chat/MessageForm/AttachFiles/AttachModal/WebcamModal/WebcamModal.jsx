import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Modal, Button } from "antd";

export const WebcamModal = ({ isOpenModal, closeModal }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [videoConstraints, setVideoConstraints] = useState({});

  useEffect(() => {
    const getVideoConstraints = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();
        console.log({ width: settings.width, height: settings.height });
        setVideoConstraints({ width: settings.width, height: settings.height });
        track.stop();
      } catch (error) {
        console.log("Error accessing webcam:", error);
      }
    };
    const startCapture = () => {
      const video = webcamRef.current?.video;
      const tracks = video?.srcObject?.getTracks();
      console.log(webcamRef.current);
      if (tracks) {
        tracks.forEach((track) => track.start());
      }
    };
    startCapture();
    getVideoConstraints();
    
    return () => {
      stopCapture();
    };
  }, []);

  // useEffect(() => {
  //   if (isOpenModal) {
  //     const getVideoConstraints = async () => {
  //       try {
  //         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //         const track = stream.getVideoTracks()[0];
  //         const settings = track.getSettings();
  //         console.log({ width: settings.width, height: settings.height });
  //         setVideoConstraints({ width: settings.width, height: settings.height });
  //         track.stop();
  //       } catch (error) {
  //         console.log("Error accessing webcam:", error);
  //       }
  //     };

  //     getVideoConstraints();
  //   }
  // }, [isOpenModal]);

  const capture = () => {
    // const video = webcamRef.current.video;
    // const canvas = canvasRef.current;
    // canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    // const imageData = canvas.toDataURL("image/png");

    // console.log(imageData);
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);

    stopCapture();
    closeModal();
  };

  const stopCapture = () => {
    const video = webcamRef.current.video;
    const tracks = video.srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    console.log("stopped");
  };

  return (
    <div>
      <Modal
        open={isOpenModal}
        onCancel={()=> {
          stopCapture()
          closeModal()
        }}
        // width="60%"
        // style={{
        //   top: 20,
        // }}
        footer={[
          <Button key="capture" type="primary" onClick={capture}>
            Capture
          </Button>,
        ]}
      >
        {isOpenModal && (
          <>
            <Webcam
              audio={false}
              videoConstraints={videoConstraints}
              ref={webcamRef}
              mirrored={true}
              style={{ width: "100%", height: "auto", paddingTop: 32 }}
              screenshotFormat="image/png"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </>
        )}
      </Modal>
    </div>
  );
};
