import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { attachFileToMessageThunk } from "../../../../../../redux/groupChat/groupChatOperations";
import "./MicModal.scss";

export default function MicModal({ isOpenModal, closeModal }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState({});
  const [audioSrc, setAudioSrc] = useState("");
  const [clear, setClear] = useState(false);

  const dispatch = useDispatch();

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  );

  useEffect(() => {
    if (recorderControls.isRecording) {
      setIsRecording(true);
    }
  }, [recorderControls.isRecording]);

  const handleStartRecording = () => {
    recorderControls.startRecording();
    setClear(false);
    setIsRecording(true);
    console.log("recording...");
  };

  const handleStopRecording = () => {
    recorderControls.stopRecording();
    setIsRecording(false);
    console.log("recorded");
  };

  const handleClear = () => {
    setAudioSrc("");
    setAudioBlob(null);
    setClear(true);
  };

  const addAudioElement = (blob) => {
    recorderControls.recordingBlob = null;
    if (clear) {
      return;
    }
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
  };

  const handleAttach = () => {
    const formData = new FormData();
    const uniqueId = uuidv4();
    const fileName = `mic-audio_${uniqueId}.webm`;
    formData.append("file", audioBlob, fileName);
    dispatch(attachFileToMessageThunk(formData));
    setAudioBlob({});
    setAudioSrc("");
    closeModal();
  };

  return (
    <Modal
      open={isOpenModal}
      onCancel={() => {
        handleStopRecording();
        handleClear();
        closeModal();
      }}
      footer={[
        isRecording ? (
          <Button onClick={handleStopRecording}>Stop recording</Button>
        ) : audioSrc ? (
          <>
            <Button onClick={handleClear}>Clear</Button>
            <Button onClick={handleAttach}>Attach</Button>
          </>
        ) : (
          <Button onClick={handleStartRecording}>Start recording</Button>
        ),
      ]}
    >
      {audioSrc !== "" ? (
        <audio src={audioSrc} controls={true} />
      ) : (
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          //   downloadFileExtension="mp3"
          showVisualizer={true}
        />
      )}
    </Modal>
  );
}
