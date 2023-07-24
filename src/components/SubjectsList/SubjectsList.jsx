import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "../../redux/subject/subjectOperations";
import { getUserGroup } from "../../redux/user/userSelectors";
import { getGroupSubjects } from "../../redux/subject/subjectSelectors";
import SubjectItem from "./SubjectItem/SubjectItem";
import styles from "./SubjectsList.module.scss";

export default function SubjectsList() {
  const dispatch = useDispatch();
  const groupName = useSelector(getUserGroup);
  const subjectsData = useSelector(getGroupSubjects);
  useEffect(() => {
    dispatch(getAllSubjects(groupName));
  }, [groupName, dispatch]);
  return (
    <ul className={styles.subjectsList}>
      {subjectsData &&
        subjectsData.map((subjectData) => (
          <SubjectItem key={subjectData.id} subjectData={subjectData} />
        ))}
    </ul>
  );
}
