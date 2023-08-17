import React from "react";
import { useSelector } from "react-redux";
// import { getAllSubjectsThunk } from "../../redux/subject/subjectOperations";
// import { getUserGroup } from "../../redux/user/userSelectors";
import { getGroupSubjects } from "../../redux/subject/subjectSelectors";
import SubjectItem from "./SubjectItem/SubjectItem";
import styles from "./SubjectsList.module.scss";

export default function SubjectsList() {
  // const dispatch = useDispatch();
  // const groupName = useSelector(getUserGroup);
  const subjectsData = useSelector(getGroupSubjects);
  // useEffect(() => {
  //   dispatch(getAllSubjectsThunk(groupName));
  // }, [groupName]);
  return (
    <ul className={styles.subjectsList}>
      {subjectsData &&
        subjectsData.map((subjectData) => (
          <SubjectItem key={subjectData.id} subjectData={subjectData} />
        ))}
    </ul>
  );
}
