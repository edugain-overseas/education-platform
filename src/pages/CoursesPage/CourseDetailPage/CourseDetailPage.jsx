import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { instance } from "../../../services/instance";
import {
  getListOfParticipantsThunk,
  getSubjectAboutThunk,
  getSubjectTapesByIdThunk,
} from "../../../redux/subject/subjectOperations";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/user/userSelectors";
import NavLinksPanel from "../../../components/NavLinksPanel/NavLinksPanel";
import styles from "./CourseDetailPage.module.scss";

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

const groupId = 3;

export default function CourseDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    if (token) {
      instance.defaults.headers["Content-Type"] = "application/json";
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;

      dispatch(getSubjectTapesByIdThunk(id));
      dispatch(getSubjectAboutThunk(id));
      dispatch(getListOfParticipantsThunk({groupId, subjectId: id}));
    }
  }, [id, dispatch, token]);

  return (
    <div className={styles.mainWrapper}>
      <NavLinksPanel renderLinks={renderLinks} />
      <div className={styles.pageContentWrapper}>
        <Outlet />
      </div>
    </div>
  );
}
