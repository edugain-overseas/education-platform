import React from "react";
import { lecturePartsTemplate } from "../../../../../constants/lecturePartsTemplate";
import { ReactComponent as TextIcon } from "../../../../../images/icons/mediaTypesIcons/text.svg";
import { ReactComponent as PresentationIcon } from "../../../../../images/icons/mediaTypesIcons/presentation.svg";
import { ReactComponent as AudioIcon } from "../../../../../images/icons/mediaTypesIcons/audio.svg";
import { ReactComponent as PictureIcon } from "../../../../../images/icons/mediaTypesIcons/picture.svg";
import { ReactComponent as VideoIcon } from "../../../../../images/icons/mediaTypesIcons/video.svg";
import { ReactComponent as FileIcon } from "../../../../../images/icons/mediaTypesIcons/file.svg";
import { ReactComponent as LinkIcon } from "../../../../../images/icons/mediaTypesIcons/link.svg";
import { ReactComponent as HomeworkIcon } from "../../../../../images/icons/mediaTypesIcons/homework.svg";

const AddLecturePartPanel = ({
  styles,
  setLectureParts,
  sectionsAmount = 0,
}) => {
  return (
    <div className={styles.addSectionPanel}>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().text,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <TextIcon />
        <span>Text</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().present,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <PresentationIcon />
        <span>Present</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().audio,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <AudioIcon />
        <span>Audio</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().picture,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <PictureIcon />
        <span>Picture</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().video,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <VideoIcon />
        <span>Video</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().file,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <FileIcon />
        <span>File</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().link,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <LinkIcon />
        <span>Link</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [
            ...prev,
            {
              ...lecturePartsTemplate().homework,
              attributeNumber: sectionsAmount + 1,
            },
          ])
        }
      >
        <HomeworkIcon />
        <span>Homework</span>
      </button>
    </div>
  );
};

export default AddLecturePartPanel;
