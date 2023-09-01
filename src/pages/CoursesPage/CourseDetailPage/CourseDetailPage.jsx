import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { instance } from "../../../services/instance";
import {
  getListOfParticipantsThunk,
  getSubjectAboutThunk,
  getSubjectByIdThunk,
  getSubjectIconsThunk,
  getSubjectTapesByIdThunk,
} from "../../../redux/subject/subjectOperations";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/user/userSelectors";
import NavLinksPanel from "../../../components/NavLinksPanel/NavLinksPanel";
import { connectToSubjectWebSocket } from "../../../services/websocket";
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

export const SubjectWebsocketContext = createContext(null);

export default function CourseDetailPage() {
  const { id } = useParams();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = connectToSubjectWebSocket(id, token);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [id, token]);

  useEffect(() => {
    dispatch(getSubjectByIdThunk(id));
  }, [id]);

  useEffect(() => {
    if (token) {
      instance.defaults.headers["Content-Type"] = "application/json";
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;

      dispatch(getSubjectTapesByIdThunk(id));
      dispatch(getSubjectAboutThunk(id));
      dispatch(getListOfParticipantsThunk({ groupId, subjectId: id }));
      dispatch(getSubjectIconsThunk(id));
    }
  }, [id, dispatch, token]);

  return (
    <SubjectWebsocketContext.Provider value={socket}>
      <div className={styles.mainWrapper}>
        <NavLinksPanel renderLinks={renderLinks} />
        <div className={styles.pageContentWrapper}>
          <Outlet />
        </div>
      </div>
    </SubjectWebsocketContext.Provider>
  );
}
