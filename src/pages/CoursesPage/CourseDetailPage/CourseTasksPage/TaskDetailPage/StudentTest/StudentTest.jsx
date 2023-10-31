import React, { useState } from "react";
import Test from "../../../../../../components/TasksToDisplay/Test/Test";
import styles from "./StudentTest.module.scss";

const StudentTest = ({ lessonData }) => {
  const [startTest, setStartTest] = useState(false);
  return (
    <>
      {startTest ? (
        <Test lessonData={lessonData} />
      ) : (
        <div className={styles.btnContainer}>
          <button
            className={styles.startBtn}
            onClick={() => setStartTest(true)}
          >
            start test
          </button>
        </div>
      )}
    </>
  );
};

export default StudentTest;
