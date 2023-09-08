import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { instance } from "../../../services/instance";
import {
  getListOfParticipantsThunk,
  getSubjectAboutThunk,
  getSubjectByIdThunk,
  getSubjectIconsThunk,
  getSubjectTapesByIdThunk,
} from "../../../redux/subject/subjectOperations";
import {
  addFeedback as addSubjectFeedback,
  addMessage as addSubjectMessage,
  setActiveData as setSubjectActiveData,
  setMessages as setSubjectMessages,
  setUsers as setSubjectUsers,
} from "../../../redux/subjectChats/subjectChatSlice";
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
      console.log("Connected sub");
    };

    ws.onclose = function (event) {
      setSocket(null);
      console.log("Connection sub Closed");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const participantsData = data.user_info;
      const messagesData = data.messages;

      if (messagesData) {
        if (participantsData) {
          dispatch(setSubjectUsers(participantsData));
        }
        dispatch(setSubjectMessages(messagesData));
      } else if (data.id_active_users) {
        dispatch(setSubjectActiveData(data));
      } else if (data.answer_id) {
        dispatch(addSubjectFeedback(data));
      } else {
        dispatch(addSubjectMessage(data));
      }
    };

    return () => {
      ws.close();
    };
  }, [id, token, dispatch]);
  
  useEffect(() => {
    dispatch(getSubjectByIdThunk(id));
  }, [id, dispatch]);

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
