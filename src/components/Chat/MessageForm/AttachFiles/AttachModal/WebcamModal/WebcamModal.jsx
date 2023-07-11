import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Modal, Button } from "antd";
import { dataURItoBlob } from "../../../../../../helpers/dataURItoBlob";

export const WebcamModal = ({ isOpenModal, closeModal }) => {
  const webcamRef = useRef(null);

  const [videoConstraints, setVideoConstraints] = useState({});
  const [image, setImage] = useState(null);

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
    getVideoConstraints();
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    setImage(imageSrc);
    // closeModal();
  };

  const resetCapture = () => {
    setImage(null);
  };

  const attachCapture = () => {
    const formData = new FormData();
    formData.append("file", dataURItoBlob(image));
    closeModal()
  }

  return (
    <div>
      <Modal
        open={isOpenModal}
        onCancel={() => {
          closeModal();
        }}
        footer={[
          image ? (
            <>
              <Button key="reset" type="default" onClick={resetCapture}>
                Capture Again
              </Button>
              <Button key="attach" type="primary" onClick={attachCapture}>
                Attach
              </Button>
            </>
          ) : (
            <Button key="capture" type="primary" onClick={capture}>
              Capture
            </Button>
          )
          ,
        ]}
      >
        {image ? (
          <img
            src={image}
            alt="your webcam capture"
            style={{
              width: "100%",
              height: "auto",
              paddingTop: 32,
            }}
          />
        ) : (
          <Webcam
            audio={false}
            videoConstraints={videoConstraints}
            ref={webcamRef}
            mirrored={true}
            style={{ width: "100%", height: "auto", paddingTop: 32 }}
            screenshotFormat="image/png"
          />
        )}
      </Modal>
    </div>
  );
};
