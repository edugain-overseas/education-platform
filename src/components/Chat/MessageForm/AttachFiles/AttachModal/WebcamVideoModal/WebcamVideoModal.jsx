import React, { useCallback, useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Modal, Button } from "antd";
import ReactPlayer from "react-player";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { attachFileToMessageThunk } from "../../../../../../redux/groupChat/groupChatOperations";
import { TypeContext } from "../../../../../../pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import { attachFileToMessageThunk as attachFileToSubjectMessageThunk } from "../../../../../../redux/subjectChats/subjectChatOperations";
import { attachFileToMessageThunk as attachFileToTeacherSubjectMessageThunk } from "../../../../../../redux/chats/chatOperations";
import { getUserType } from "../../../../../../redux/user/userSelectors";

export default function WebcamVideoModal({
  isOpenModal,
  closeModal,
  chatData,
}) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState(null);
  const [videoURL, setVideoURL] = useState("");

  const type = useContext(TypeContext) || "main";
  const userType = useSelector(getUserType);

  const isLoading = chatData?.attachedFilesToMessage?.isLoading;
  console.log(isLoading);

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
    const uniqueId = uuidv4();
    const fileName = `webcam-video_${uniqueId}.webm`;
    formData.append("file", recordedChunks, fileName);
    dispatch(
      type === "main"
        ? userType === "student"
          ? attachFileToMessageThunk(formData)
          : attachFileToTeacherSubjectMessageThunk({
              subjectId: chatData.subjectId,
              data: formData,
            })
        : attachFileToSubjectMessageThunk(formData)
    );
    closeModal();
  };

  const handleDataAvailable = ({ data }) => {
    if (data && data.size > 0) {
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
        destroyOnClose
        onCancel={() => {
          closeModal();
        }}
        footer={[
          <React.Fragment key="default">
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
              <Button
                key="attach"
                type="primary"
                onClick={handleAttach}
                loading={chatData.attachedFilesToMessage.isLoading}
              >
                Attach
              </Button>
            )}
          </React.Fragment>,
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
            style={{ width: "100%", height: "auto", paddingTop: 32 }}
          />
        )}
      </Modal>
    </div>
  );
}
