import React, { useState } from "react";
import { Modal, Button } from "antd";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
// import { useEffect } from "react";

export default function MicModal({ isOpenModal, closeModal }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState({});
  const [audioSrc, setAudioSrc] = useState("");

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  );

  const handleStartRecording = () => {
    recorderControls.startRecording();
    setIsRecording(true);
    console.log("recording...");
  };

  const handleStopRecording = () => {
    recorderControls.stopRecording();
    setIsRecording(false);
    console.log("recorded");
  };

  const handleClear = () => {
    console.log(audioBlob, audioSrc);
    setAudioSrc("");
    setAudioBlob(null);
  };

  const addAudioElement = (blob) => {
    if (!audioBlob && audioSrc === "") {
        console.log(audioBlob, audioSrc);
        return
    }
    console.log(blob, audioBlob);
    recorderControls.recordingBlob = null;
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
  };

  return (
    <Modal
      open={isOpenModal}
      onCancel={closeModal}
      footer={[
        isRecording ? (
          <Button onClick={handleStopRecording}>Stop recording</Button>
        ) : audioSrc ? (
          <Button onClick={handleClear}>Clear</Button>
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
