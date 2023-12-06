import React, { useEffect, useState } from "react";
import AddLecturePartPanel from "./AddLecturePartPanel/AddLecturePartPanel";
import TextPart from "./LectureParts/TextPart/TextPart";
import { useSelector } from "react-redux";
import { getIsSubmit } from "../../../../redux/config/configSelectors";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  addHomeworkPartToLectureThunk,
  addImagesPartToLectureThunk,
  addMultipleFilesPartToLectureThunk,
  addSingleFilePartToLectureThunk,
  addTextPartToLectureThunk,
  getLectureByTaskIdThunk,
  updateLectureTextThunk,
} from "../../../../redux/task/taskOperation";
import PresentationPart from "./LectureParts/PresentationPart/PresentationPart";
import AudioPart from "./LectureParts/AudioPart/AudioPart";
import PicturePart from "./LectureParts/PicturePart/PicturePart";
import { setDefault } from "../../../../redux/config/configSlice";
import { useParams } from "react-router-dom";
import VideoPart from "./LectureParts/VideoPart/VideoPart";
import FilePart from "./LectureParts/FilePart/FilePart";
import LinkPart from "./LectureParts/LinkPart/LinkPart";
import HomeworkPart from "./LectureParts/HomeworkPart/HomeworkPart";
import styles from "./LectureConstructor.module.scss";

const renderLecturePart = (part, state, setState, dragHandleProps) => {
  const { attributeType: type, id, attributeId } = part;
  switch (type) {
    case "text":
      const textState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <TextPart
          key={id}
          state={textState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    case "present":
      const presentState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <PresentationPart
          key={id}
          state={presentState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    case "audio":
      const audioState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <AudioPart
          key={id}
          state={audioState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    case "picture":
      const pictureState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <PicturePart
          key={id}
          state={pictureState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    case "video":
      const videoState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <VideoPart
          key={id}
          state={videoState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    case "file":
      const fileState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <FilePart
          key={id}
          state={fileState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    case "link":
      const linkState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <LinkPart
          key={id}
          state={linkState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    case "homework":
      const homeworkState = id
        ? state.find((partFromState) => partFromState.id === id)
        : state.find(
            (partFromState) => partFromState.attributeId === attributeId
          );
      return (
        <HomeworkPart
          key={id}
          state={homeworkState}
          setState={setState}
          dragHandleProps={dragHandleProps}
        />
      );
    default:
      return null;
  }
};

const validateTextPart = ({ attributeTitle, attributeText }) => {
  if (attributeTitle !== "" && attributeText !== "") {
    return true;
  }
  return false;
};

const validatePicturePart = ({ attributeTitle, attributeImages }) => {
  if (attributeTitle !== "" && attributeImages?.length !== 0) {
    return true;
  }
  return false;
};

const validateSingleFilePart = ({
  attributeTitle,
  fileName,
  fileSize,
  filePath,
}) => {
  if (
    attributeTitle !== "" &&
    fileName !== "" &&
    fileSize !== 0 &&
    filePath !== ""
  ) {
    return true;
  }
  return false;
};

const validateHomeworkPart = ({ attributeTitle }) => {
  return attributeTitle === "" ? false : true;
};

const LectureConstructor = ({ lectureId, lectureContent }) => {
  const [lectureParts, setLectureParts] = useState(
    [...lectureContent].sort(
      (itemA, itemB) => itemA.attributeNumber - itemB.attributeNumber
    )
  );
  const isSumbit = useSelector(getIsSubmit);
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  console.log(lectureParts);

  useEffect(() => {
    const handleSumbit = async () => {
      Promise.all(
        lectureParts.map((part) => {
          if (part.attributeId) {
            return null;
          }
          switch (part.attributeType) {
            case "text":
              const textData = {
                attributeType: "text",
                attributeTitle: part.attributeTitle,
                attributeNumber: part.attributeNumber,
                attributeText: part.attributeText,
                hided: part.hided,
              };
              if (validateTextPart(textData)) {
                return dispatch(
                  addTextPartToLectureThunk({ lectureId, partData: textData })
                ).then(() =>
                  setLectureParts((prev) => {
                    const updatedState = prev.filter(
                      (item) => item.id !== part.id
                    );
                    return updatedState;
                  })
                );
              }
              return null;
            case "present":
              const presentData = {
                attributeType: "present",
                attributeTitle: part.attributeTitle,
                attributeNumber: part.attributeNumber,
                attributeText: part.attributeText,
                hided: part.hided,
                fileName: part.fileName,
                fileSize: part.fileSize,
                filePath: part.filePath,
                downloadAllowed: part.downloadAllowed,
              };
              if (validateSingleFilePart(presentData)) {
                return dispatch(
                  addSingleFilePartToLectureThunk({
                    lectureId,
                    partData: presentData,
                  })
                ).then(() =>
                  setLectureParts((prev) => {
                    const updatedState = prev.filter(
                      (item) => item.id !== part.id
                    );
                    return updatedState;
                  })
                );
              }
              return null;
            case "audio":
              const audioData = {
                attributeType: "audio",
                attributeTitle: part.attributeTitle,
                attributeNumber: part.attributeNumber,
                attributeText: part.attributeText,
                hided: part.hided,
                fileName: part.fileName,
                fileSize: part.fileSize,
                filePath: part.filePath,
                downloadAllowed: part.downloadAllowed,
              };
              if (validateSingleFilePart(audioData)) {
                return dispatch(
                  addSingleFilePartToLectureThunk({
                    lectureId,
                    partData: audioData,
                  })
                ).then(() =>
                  setLectureParts((prev) => {
                    const updatedState = prev.filter(
                      (item) => item.id !== part.id
                    );
                    return updatedState;
                  })
                );
              }
              return null;
            case "picture":
              const pictureData = {
                attributeType: "picture",
                attributeTitle: part.attributeTitle,
                attributeNumber: part.attributeNumber,
                attributeText: part.attributeText,
                hided: false,
                attributeImages: part.attributeImages,
              };
              if (validatePicturePart(pictureData)) {
                return dispatch(
                  addImagesPartToLectureThunk({
                    lectureId,
                    partData: pictureData,
                  })
                ).then(() =>
                  setLectureParts((prev) => {
                    const updatedState = prev.filter(
                      (item) => item.id !== part.id
                    );
                    return updatedState;
                  })
                );
              }
              return null;
            case "video":
              const videoData = {
                attributeType: "video",
                attributeTitle: part.attributeTitle,
                attributeNumber: part.attributeNumber,
                attributeText: part.attributeText,
                hided: part.hided,
                fileName: part.fileName,
                fileSize: part.fileSize,
                filePath: part.filePath,
                downloadAllowed: part.downloadAllowed,
              };
              if (validateSingleFilePart(videoData)) {
                return dispatch(
                  addSingleFilePartToLectureThunk({
                    lectureId,
                    partData: videoData,
                  })
                ).then(() =>
                  setLectureParts((prev) => {
                    const updatedState = prev.filter(
                      (item) => item.id !== part.id
                    );
                    return updatedState;
                  })
                );
              }
              return null;
            case "file":
              const fileData = {
                attributeType: "file",
                attributeTitle: part.attributeTitle,
                attributeNumber: part.attributeNumber,
                attributeText: part.attributeText,
                hided: false,
                attributeFiles: part.attributeFiles,
              };
              if (1) {
                return dispatch(
                  addMultipleFilesPartToLectureThunk({
                    lectureId,
                    partData: fileData,
                  })
                ).then(() =>
                  setLectureParts((prev) => {
                    const updatedState = prev.filter(
                      (item) => item.id !== part.id
                    );
                    return updatedState;
                  })
                );
              }
              return null;
            case "homework":
              const homeworkData = {
                attributeType: "homework",
                attributeTitle: part.attributeTitle,
                attributeNumber: part.attributeNumber,
                attributeText: part.attributeText,
                hided: false,
                attributeFiles: part.attributeFiles,
                attributeLinks: part.attributeLinks,
              };
              if (validateHomeworkPart(homeworkData)) {
                dispatch(
                  addHomeworkPartToLectureThunk({
                    lectureId,
                    partData: homeworkData,
                  })
                ).then(() =>
                  setLectureParts((prev) => {
                    const updatedState = prev.filter(
                      (item) => item.id !== part.id
                    );
                    return updatedState;
                  })
                );
              }
              return null;
            default:
              return null;
          }
        })
      ).finally(() => dispatch(getLectureByTaskIdThunk(lessonId)));

      dispatch(setDefault());
    };
    if (isSumbit) {
      handleSumbit();
    }
  }, [isSumbit, lectureParts, dispatch, lectureId, lessonId]);

  const handleDragEnd = ({ source, destination }) => {
    const startIndex = source.index;
    const endIndex = destination?.index;
    if (!destination || startIndex === endIndex) {
      return;
    }
    setLectureParts((prev) => {
      const reorderedAllParts = [...prev];
      const [removed] = reorderedAllParts.splice(startIndex, 1);
      reorderedAllParts.splice(endIndex, 0, removed);
      const updatedState = reorderedAllParts.map((part, index) => {
        if (part.attributeId) {
          dispatch(
            updateLectureTextThunk({
              attrId: part.attributeId,
              updatedData: {
                attributeNumber: index,
              },
            })
          );
        }
        return {
          ...part,
          attributeNumber: index,
        };
      });
      return updatedState;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="lecture">
        {(provided) => (
          <div
            className={styles.lectureConstructorWrapper}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lectureParts.map((part, index) => (
              <Draggable key={part.id} draggableId={`${part.id}`} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    {renderLecturePart(
                      part,
                      lectureParts,
                      setLectureParts,
                      provided.dragHandleProps
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddLecturePartPanel
              styles={styles}
              setLectureParts={setLectureParts}
              sectionsAmount={
                lectureParts[lectureParts.length - 1]?.attributeNumber
              }
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LectureConstructor;
