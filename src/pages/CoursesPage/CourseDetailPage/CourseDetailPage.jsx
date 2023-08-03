import React from "react";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
// import { getTeachersForSubjectThunk } from "../../../redux/subject/subjectOperations";
import styles from "./CourseDetailPage.module.scss";
// import SubjectInfoPanel from "../../../components/SubjectInfoPanel/SubjectInfoPanel";
import NavLinksPanel from "../../../components/NavLinksPanel/NavLinksPanel";

export default function CourseDetailPage() {
  // const location = useLocation();
  // const { id } = useParams();
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



  useEffect(() => {
    // dispatch(getTeachersForSubjectThunk(id))
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <NavLinksPanel renderLinks={renderLinks} />
      <div className={styles.pageContentWrapper}>
        <Outlet />
      </div>
    </div>
  );
}
