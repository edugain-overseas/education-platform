import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import styles from "./CourseDetailPage.module.scss";
import NavLinksPanel from "../../../components/NavLinksPanel/NavLinksPanel";
import { getSubjectTapesByIdThunk } from "../../../redux/subject/subjectOperations";

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


export default function CourseDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubjectTapesByIdThunk(id))
  }, [id, dispatch]);

  return (
    <div className={styles.mainWrapper}>
      <NavLinksPanel renderLinks={renderLinks} />
      <div className={styles.pageContentWrapper}>
        <Outlet />
      </div>
    </div>
  );
}
