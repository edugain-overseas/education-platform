import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Modal, Button } from "antd";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { attachFileToMessageThunk } from "../../../../../../redux/chat/chatOperations";
import { getAttachFileLoading } from "../../../../../../redux/chat/chatSelectors";

export default function WebcamVideoModal({ isOpenModal, closeModal }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState(null);
  const [videoURL, setVideoURL] = useState("");

  const isLoading = useSelector(getAttachFileLoading)

  const dispatch = useDispatch();

  const startCapture = useCallback(() => {
    setIsRecording(true);
    const stream = webcamRef.current.video.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();
  }, []);

  const stopCapture = useCallback(() => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  }, []);

  const handleAttach = () => {
    const formData = new FormData();
    formData.append("file", recordedChunks);
    dispatch(attachFileToMessageThunk(formData))
    
  };

  const handleDataAvailable = ({ data }) => {
    console.log(data);
    if (data && data.size > 0) {
      // Save recorded video chunks
      setRecordedChunks(data);
      const videoUrl = URL.createObjectURL(data);
      setVideoURL(videoUrl);
    }
  };

  const handleClean = () => {
    setRecordedChunks(null);
    setVideoURL("");
  };

  return (
    <div>
      <Modal
        open={isOpenModal}
        onCancel={() => {
          closeModal();
        }}
        footer={[
          <>
            {!videoURL ? (
              <Button
                key="record"
                type="primary"
                onClick={isRecording ? stopCapture : startCapture}
                disabled={!isOpenModal}
                danger={isRecording}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            ) : (
              <Button
                key="clean"
                type="default"
                onClick={handleClean}
                danger={true}
              >
                Clean
              </Button>
            )}
            {!isRecording && recordedChunks && (
              <Button key="attach" type="primary" onClick={handleAttach} loading={isLoading}>
                Attach
              </Button>
            )}
          </>,
        ]}
      >
        {videoURL ? (
          <ReactPlayer
            url={videoURL}
            controls={true}
            width="100%"
            height="auto"
            style={{ paddingTop: 32 }}
          />
        ) : (
          <Webcam
            audio={true}
            muted={true}
            ref={webcamRef}
            // mirrored={true}
            // onRecordingComplete={handleDataAvailable}
            style={{ width: "100%", height: "auto", paddingTop: 32 }}
          />
        )}
      </Modal>
    </div>
  );
}
