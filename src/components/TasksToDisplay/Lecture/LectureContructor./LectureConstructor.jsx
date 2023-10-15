import React, { useState } from "react";
import styles from "./LectureConstructor.module.scss";
import AddLecturePartPanel from "./AddLecturePartPanel/AddLecturePartPanel";
import TextPart from "./LectureParts/TextPart/TextPart";

const renderLecturePart = (part, state, setState) => {
  const { attr_type: type, id } = part;
  switch (type) {
    case "text":
      const textState = state.find((partFromState) => partFromState.id === id);
      return <TextPart key={id} state={textState} setState={setState} />;
    default:
      break;
  }
};

const LectureConstructor = () => {
  const [lectureParts, setLectureParts] = useState([]);
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
