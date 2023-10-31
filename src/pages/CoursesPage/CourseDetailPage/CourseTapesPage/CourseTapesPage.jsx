import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSubjectData,
  getSubjectMainInfo,
} from "../../../../redux/subject/subjectSelectors";
import SubjectInfoPanel from "../../../../components/SubjectInfoPanel/SubjectInfoPanel";
import { Chat } from "../../../../components/Chat/Chat";
import ProgressPanel from "../../../../components/ProgressPanel/ProgressPanel";
import { getSubjectChatData } from "../../../../redux/subjectChats/subjectChatSelectors";
import styles from "./CourseTapesPage.module.scss";
import { getUserType } from "../../../../redux/user/userSelectors";

export const TypeContext = createContext(null);

export default function CourseTapesPage() {
  const { id } = useParams();
  const subjectChatData = useSelector(getSubjectChatData);
  const userType = useSelector(getUserType);

  const subjectData = {
    ...useSelector(getSubjectData)?.find((subject) => `${subject.id}` === id),
    ...useSelector(getSubjectMainInfo).find(
      (subject) => `${subject.id}` === id
    ),
  };
  console.log(subjectData);

  return (
    <div className={styles.pageWrapper}>
      <SubjectInfoPanel subjectData={subjectData} />
      <TypeContext.Provider value={"subject"}>
        <Chat
          subjectId={id}
          subjectData={subjectData}
          chatData={subjectChatData}
        />
      </TypeContext.Provider>
      {userType === "student" && <ProgressPanel subjectData={subjectData} />}
    </div>
  );
}
