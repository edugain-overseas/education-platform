import { useEffect, createContext, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { SchedulePage } from "./pages/SchedulePage/SchedulePage";
import {
  getTeacherId,
  getTeacherSubjects,
  getToken,
  getUserGroup,
  getUserInfo,
  getUserType,
} from "./redux/user/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk } from "./redux/user/userOperations";
import {
  getScheduleThunk,
  getTeacherScheduleThunk,
} from "./redux/schedule/scheduleOperations";
import { adjustFontSize } from "./helpers/adjustFontSize";
import {
  connectToTeacherSubjectWebsocket,
  connectToWebSocket,
} from "./services/websocket";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import SubjectsList from "./components/SubjectsList/SubjectsList";
import CourseDetailPage from "./pages/CoursesPage/CourseDetailPage/CourseDetailPage";
import CourseTapesPage from "./pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import CourseTasksPage from "./pages/CoursesPage/CourseDetailPage/CourseTasksPage/CourseTasksPage";
import CourseItemPage from "./pages/CoursesPage/CourseDetailPage/CourseItemPage/CourseItemPage";
import {
  getAllSubjectsThunk,
  getDopSubjectsByStudentIdThunk,
} from "./redux/subject/subjectOperations";
import CourseParticipantPage from "./pages/CoursesPage/CourseDetailPage/CourseParticipantPage/CourseParticipantPage";
import TaskDetailPage from "./pages/CoursesPage/CourseDetailPage/CourseTasksPage/TaskDetailPage/TaskDetailPage";
import VideoChatRoom from "./pages/VIdeoChatRoomPage/VideoChatRoom";
import CourseInstructionPage from "./pages/CoursesPage/CourseDetailPage/CourseIntructionPage/CourseInstructionPage";
import IntructionContent from "./pages/CoursesPage/CourseDetailPage/CourseIntructionPage/IntructionContent/IntructionContent";
import ClassRoomNotification from "./pages/ClassRoomNotificationPage/ClassRoomNotification";
import { getSubjectTapesByIdThunk } from "./redux/subject/subjectOperations";
import CourseJournalPage from "./pages/CoursesPage/CourseDetailPage/CourseJournalPage/CourseJournalPage";

export const WebsocketContext = createContext(null);
export const WebsocketsContext = createContext(null);

function App() {
  const [websocket, setWebsocket] = useState(null);
  const websockets = useRef([]);
  const groupName = useSelector(getUserGroup);
  const teacherId = useSelector(getTeacherId);
  const token = useSelector(getToken);
  const userType = useSelector(getUserType);
  const studentId = useSelector(getUserInfo)?.student_id;
  const subjects = useSelector(getTeacherSubjects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userType === "teacher" && token && subjects) {
      subjects.forEach(({ subject_id }) => {
        if (
          !websockets.current?.find((websocket) => websocket.id === subject_id)
        ) {
          const websocket = connectToTeacherSubjectWebsocket(subject_id, token);
          websockets.current.push({ id: subject_id, websocket });
        }
      });
    }
  }, [token, subjects, userType, dispatch]);

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfoThunk());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (groupName && token && userType === "student") {
      dispatch(getScheduleThunk(groupName));
      dispatch(getAllSubjectsThunk(groupName));
      dispatch(getDopSubjectsByStudentIdThunk(studentId));
    }

    if (teacherId && token && userType === "teacher") {
      dispatch(getTeacherScheduleThunk(teacherId));
    }

    if (subjects) {
      subjects.forEach(({ subject_id }) => {
        dispatch(getSubjectTapesByIdThunk(+subject_id));
      });
    }
  }, [dispatch, groupName, teacherId, token, userType, studentId, subjects]);

  useEffect(() => {
    if (websocket) {
      return;
    }
    if (token && groupName && userType === "student") {
      setWebsocket(connectToWebSocket(groupName, token));
    }
    return () => {
      websocket?.close();
    };
  }, [dispatch, token, groupName, websocket, userType]);

  const Router = () => {
    return (
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute component={<LoginPage />} />}
        />
        <Route path="/" element={<PrivateRoute component={<MainLayout />} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="courses" element={<CoursesPage />}>
            <Route
              path={"teacher-active-courses"}
              element={<SubjectsList type="main" />}
            />
            <Route
              path={"teacher-archive"}
              element={<SubjectsList type="teacherArchive" />}
            />
            <Route
              path={`:${groupName}`}
              element={<SubjectsList type="main" />}
            />
            <Route
              path="dopcourses"
              element={<SubjectsList type="studentDop" />}
            />
            <Route
              path="archive"
              element={<SubjectsList type="studentArchive" />}
            />
            <Route path=":id" element={<CourseDetailPage />}>
              <Route path="tapes" element={<CourseTapesPage />} />
              <Route path="tasks" element={<CourseTasksPage />}>
                <Route path=":lessonId" element={<TaskDetailPage />} />
              </Route>
              <Route path="participants" element={<CourseParticipantPage />} />
              <Route path="journal" element={<CourseJournalPage />} />
              <Route path="about" element={<CourseItemPage />} />
              <Route path="instructions" element={<CourseInstructionPage />}>
                <Route path=":instructionId" element={<IntructionContent />} />
              </Route>
            </Route>
          </Route>
          <Route path="register" element={<div>Register page</div>} />
          <Route
            path="class-rooms-notification"
            element={<ClassRoomNotification />}
          />
          <Route path="/:videoChatRoomId" element={<VideoChatRoom />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    );
  };

  return (
    <WebsocketContext.Provider value={websocket}>
      <WebsocketsContext.Provider value={websockets.current}>
        <div className="App">
          <Router />
        </div>
      </WebsocketsContext.Provider>
    </WebsocketContext.Provider>
  );
}

export default App;
