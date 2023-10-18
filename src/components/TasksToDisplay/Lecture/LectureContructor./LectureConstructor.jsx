import React, { useEffect, useState } from "react";
import styles from "./LectureConstructor.module.scss";
import AddLecturePartPanel from "./AddLecturePartPanel/AddLecturePartPanel";
import TextPart from "./LectureParts/TextPart/TextPart";
import { useSelector } from "react-redux";
import { getIsSubmit } from "../../../../redux/config/configSelectors";
import { useDispatch } from "react-redux";
import { addTextPartToLectureThunk } from "../../../../redux/task/taskOperation";

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
  const isSumbit = useSelector(getIsSubmit);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSumbit = () => {
      lectureParts.map((part) => {
        switch (part.attr_type) {
          case "text":
            const textData = {
              attr_type: "text",
              attr_title: part.attr_title,
              attr_number: part.attr_number,
              value: part.value,
            };
            dispatch(addTextPartToLectureThunk( textData));
            break;
          default:
            break;
        }
      });
    };
    if (isSumbit) {
    }
  }, [isSumbit]);

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
