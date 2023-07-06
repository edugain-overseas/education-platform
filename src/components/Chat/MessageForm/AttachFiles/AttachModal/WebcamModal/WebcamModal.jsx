import React, { useRef } from "react";
import Webcam from "react-webcam";
import { Modal, Button } from "antd";

export const WebcamModal = ({isOpenModal, closeModal}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const capture = () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    console.log(imageData);

    closeModal();
  };

  return (
    <div>
      <Modal
        open={isOpenModal}
        onCancel={closeModal}
        width='60%'
        style={{
            top: 20
        }}
        footer={[
          <Button key="capture" type="primary" onClick={capture}>
            Capture
          </Button>,
        ]}
      >
        <Webcam audio={false} ref={webcamRef}  mirrored={true} style={{width: '100%', height: "auto", paddingTop: 32}}/>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </Modal>
    </div>
  );
};
