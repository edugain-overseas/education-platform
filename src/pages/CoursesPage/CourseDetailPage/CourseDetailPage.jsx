import React from "react";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import { getTeachersForSubjectThunk } from "../../../redux/subject/subjectOperations";
import styles from "./CourseDetailPage.module.scss";
// import SubjectInfoPanel from "../../../components/SubjectInfoPanel/SubjectInfoPanel";
import NavLinksPanel from "../../../components/NavLinksPanel/NavLinksPanel";

export default function CourseDetailPage() {
  const location = useLocation();
  console.log(location);
  const { id } = useParams();
  console.log(id);
  // const dispatch = useDispatch()

  const renderLinks = [
    {
      to: "tapes",
      content: "tapes",
    },
    {
      to: "tasks",
      content: "tasks",
    },
    {
      to: "participants",
      content: "participants",
    },
    {
      to: "journal",
      content: "journal",
    },
    {
      to: "about",
      content: "item page",
    },
    {
      to: "instructions",
      content: "instructions",
    },
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    // dispatch(getTeachersForSubjectThunk(id))
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <NavLinksPanel renderLinks={renderLinks} />
    </div>
  );
}
