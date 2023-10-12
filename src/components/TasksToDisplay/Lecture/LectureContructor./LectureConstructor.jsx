import React, { useState } from "react";
import styles from "./LectureConstructor.module.scss";
import AddLecturePartPanel from "./AddLecturePartPanel/AddLecturePartPanel";

const renderLecturePart = ({arrt_type: type}) => {
    switch (type) {
        case 'text':
            
            break;
    
        default:
            break;
    }
}

const LectureConstructor = () => {
  const [lectureParts, setLectureParts] = useState([]);
  return (
    <div className={styles.lectureConstructorWrapper}>
      {lectureParts && lectureParts.map((part) => renderLecturePart(part))}
      <AddLecturePartPanel styles={styles} setLectureParts={setLectureParts} />
    </div>
  );
};

export default LectureConstructor;
