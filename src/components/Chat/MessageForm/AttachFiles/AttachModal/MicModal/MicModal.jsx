import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { attachFileToMessageThunk } from "../../../../../../redux/groupChat/groupChatOperations";
import "./MicModal.scss";
import { TypeContext } from "../../../../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import { attachFileToMessageThunk as attachFileToSubjectMessageThunk } from "../../../../../../redux/subjectChats/subjectChatOperations";

export default function MicModal({ isOpenModal, closeModal }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState({});
  const [audioSrc, setAudioSrc] = useState("");
  const [clear, setClear] = useState(false);

  const type = useContext(TypeContext) || "group";

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
    dispatch(
      type === "group"
        ? attachFileToMessageThunk(formData)
        : attachFileToSubjectMessageThunk(formData)
    );
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
          <Button onClick={handleStopRecording} key="stop">
            Stop recording
          </Button>
        ) : audioSrc ? (
          <>
            <Button onClick={handleClear} key="clear">
              Clear
            </Button>
            <Button onClick={handleAttach} key="attach">
              Attach
            </Button>
          </>
        ) : (
          <Button onClick={handleStartRecording} key="start">
            Start recording
          </Button>
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
