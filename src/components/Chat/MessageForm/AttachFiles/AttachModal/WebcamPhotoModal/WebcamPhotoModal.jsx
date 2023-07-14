import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "antd";
import { dataURItoBlob } from "../../../../../../helpers/dataURItoBlob";
import { attachFileToMessageThunk } from "../../../../../../redux/chat/chatOperations";

export const WebcamPhotoModal = ({ isOpenModal, closeModal }) => {
  const webcamRef = useRef(null);

  const [videoConstraints, setVideoConstraints] = useState({});
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

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
    setImage(imageSrc);
  };

  const resetCapture = () => {
    setImage(null);
  };

  const attachCapture = () => {
    const formData = new FormData();
    const uniqueId = uuidv4();
    const fileName = `webcam-image_${uniqueId}.png`
    formData.append("file", dataURItoBlob(image), fileName);
    dispatch(attachFileToMessageThunk(formData));
    setImage(null);
    closeModal();
  };

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
          ),
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
            // mirrored={true}
            style={{ width: "100%", height: "auto", paddingTop: 32 }}
            screenshotFormat="image/png"
          />
        )}
      </Modal>
    </div>
  );
};
