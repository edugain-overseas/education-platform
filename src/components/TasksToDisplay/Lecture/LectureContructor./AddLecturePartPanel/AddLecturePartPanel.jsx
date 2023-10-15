import React from "react";
import {lecturePartsTemplate} from "../../../../../constants/lecturePartsTemplate";
import { ReactComponent as TextIcon } from "../../../../../images/icons/mediaTypesIcons/text.svg";
import { ReactComponent as PresentationIcon } from "../../../../../images/icons/mediaTypesIcons/presentation.svg";
import { ReactComponent as AudioIcon } from "../../../../../images/icons/mediaTypesIcons/audio.svg";
import { ReactComponent as PictureIcon } from "../../../../../images/icons/mediaTypesIcons/picture.svg";
import { ReactComponent as VideoIcon } from "../../../../../images/icons/mediaTypesIcons/video.svg";
import { ReactComponent as FileIcon } from "../../../../../images/icons/mediaTypesIcons/file.svg";
import { ReactComponent as LinkIcon } from "../../../../../images/icons/mediaTypesIcons/link.svg";
import { ReactComponent as HomeworkIcon } from "../../../../../images/icons/mediaTypesIcons/homework.svg";

const AddLecturePartPanel = ({ styles, setLectureParts }) => {
  return (
    <div className={styles.addSectionPanel}>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().text])
        }
      >
        <TextIcon />
        <span>Text</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().present])
        }
      >
        <PresentationIcon />
        <span>Present</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().audio])
        }
      >
        <AudioIcon />
        <span>Audio</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().picture])
        }
      >
        <PictureIcon />
        <span>Picture</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().video])
        }
      >
        <VideoIcon />
        <span>Video</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().file])
        }
      >
        <FileIcon />
        <span>File</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().link])
        }
      >
        <LinkIcon />
        <span>Link</span>
      </button>
      <button
        onClick={() =>
          setLectureParts((prev) => [...prev, lecturePartsTemplate().homework])
        }
      >
        <HomeworkIcon />
        <span>Homework</span>
      </button>
    </div>
  );
};

export default AddLecturePartPanel;
