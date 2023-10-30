import React, { useEffect, useState } from "react";
import styles from "./LectureConstructor.module.scss";
import AddLecturePartPanel from "./AddLecturePartPanel/AddLecturePartPanel";
import TextPart from "./LectureParts/TextPart/TextPart";
import { useSelector } from "react-redux";
import { getIsSubmit } from "../../../../redux/config/configSelectors";
import { useDispatch } from "react-redux";
import {
  addImagesPartToLectureThunk,
  addMultipleFilesPartToLectureThunk,
  addSingleFilePartToLectureThunk,
  addTextPartToLectureThunk,
  getLectureByTaskIdThunk,
} from "../../../../redux/task/taskOperation";
import PresentationPart from "./LectureParts/PresentationPart/PresentationPart";
import AudioPart from "./LectureParts/AudioPart/AudioPart";
import PicturePart from "./LectureParts/PicturePart/PicturePart";
import { setDefault } from "../../../../redux/config/configSlice";
import { useParams } from "react-router-dom";
import VideoPart from "./LectureParts/VideoPart/VideoPart";
import FilePart from "./LectureParts/FilePart/FilePart";

const renderLecturePart = (part, state, setState) => {
  const { attributeType: type, id } = part;
  switch (type) {
    case "text":
      const textState = state.find((partFromState) => partFromState.id === id);
      console.log(type);
      return <TextPart key={id} state={textState} setState={setState} />;
    case "present":
      const presentState = state.find(
        (partFromState) => partFromState.id === id
      );
      return (
        <PresentationPart key={id} state={presentState} setState={setState} />
      );
    case "audio":
      const audioState = state.find((partFromState) => partFromState.id === id);
      return <AudioPart key={id} state={audioState} setState={setState} />;
    case "picture":
      const pictureState = state.find(
        (partFromState) => partFromState.id === id
      );
      return <PicturePart key={id} state={pictureState} setState={setState} />;
    case "video":
      const videoState = state.find((partFromState) => partFromState.id === id);
      return <VideoPart key={id} state={videoState} setState={setState} />;
    case "file":
      const fileState = state.find((partFromState) => partFromState.id === id);
      return <FilePart key={id} state={fileState} setState={setState} />;
    default:
      break;
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

const LectureConstructor = ({ lectureId }) => {
  const [lectureParts, setLectureParts] = useState([]);
  const isSumbit = useSelector(getIsSubmit);
  const dispatch = useDispatch();
  const { lessonId } = useParams();

  useEffect(() => {
    const handleSumbit = async () => {
      console.log("sumbit");
      lectureParts.forEach((part) => {
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
              dispatch(
                addTextPartToLectureThunk({ lectureId, partData: textData })
              ).then(() => dispatch(getLectureByTaskIdThunk(lessonId)));
              setLectureParts((prev) => {
                const updatedState = prev.filter((item) => item.id !== part.id);
                return updatedState;
              });
            } else {
            }
            break;
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
              console.log(presentData);
              dispatch(
                addSingleFilePartToLectureThunk({
                  lectureId,
                  partData: presentData,
                })
              ).then(() => dispatch(getLectureByTaskIdThunk(lessonId)));
              setLectureParts((prev) => {
                const updatedState = prev.filter((item) => item.id !== part.id);
                return updatedState;
              });
            } else {
            }
            break;
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
              dispatch(
                addSingleFilePartToLectureThunk({
                  lectureId,
                  partData: audioData,
                })
              ).then(() => dispatch(getLectureByTaskIdThunk(lessonId)));
              setLectureParts((prev) => {
                const updatedState = prev.filter((item) => item.id !== part.id);
                return updatedState;
              });
            } else {
            }
            break;
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
              dispatch(
                addImagesPartToLectureThunk({
                  lectureId,
                  partData: pictureData,
                })
              ).then(() => dispatch(getLectureByTaskIdThunk(lessonId)));
              setLectureParts((prev) => {
                const updatedState = prev.filter((item) => item.id !== part.id);
                return updatedState;
              });
            } else {
            }
            break;
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
              dispatch(
                addSingleFilePartToLectureThunk({
                  lectureId,
                  partData: videoData,
                })
              ).then(() => dispatch(getLectureByTaskIdThunk(lessonId)));
              setLectureParts((prev) => {
                const updatedState = prev.filter((item) => item.id !== part.id);
                return updatedState;
              });
            } else {
            }
            break;
          case "file":
            const fileData = {
              attributeType: "file",
              attributeTitle: part.attributeTitle,
              attributeNumber: part.attributeNumber,
              attributeText: part.attributeText,
              hided: false,
              attributeFiles: part.attributeFiles,
            };
            // if (validatePicturePart(pictureData)) {
              dispatch(
                addMultipleFilesPartToLectureThunk({
                  lectureId,
                  partData: fileData,
                })
              ).then(() => dispatch(getLectureByTaskIdThunk(lessonId)));
              setLectureParts((prev) => {
                const updatedState = prev.filter((item) => item.id !== part.id);
                return updatedState;
              });
            // } else {
            // }
            break;
          default:
            break;
        }
      });
      dispatch(setDefault());
      dispatch(getLectureByTaskIdThunk(lessonId));
    };
    if (isSumbit) {
      handleSumbit();
    }
  }, [isSumbit, lectureParts, dispatch, lectureId, lessonId]);

  return (
    <div className={styles.lectureConstructorWrapper}>
      {lectureParts &&
        lectureParts.map((part) =>
          renderLecturePart(part, lectureParts, setLectureParts)
        )}
      <AddLecturePartPanel styles={styles} setLectureParts={setLectureParts} />
    </div>
  );
};

export default LectureConstructor;
