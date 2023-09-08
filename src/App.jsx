import { useEffect, createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { SchedulePage } from "./pages/SchedulePage/SchedulePage";
import {
  getToken,
  getUserGroup,
  getUserType,
} from "./redux/user/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk } from "./redux/user/userOperations";
import { getScheduleThunk } from "./redux/schedule/scheduleOperations";
import { adjustFontSize } from "./helpers/adjustFornSize";
import { connectToWebSocket } from "./services/websocket";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import SubjectsList from "./components/SubjectsList/SubjectsList";
import CourseDetailPage from "./pages/CoursesPage/CourseDetailPage/CourseDetailPage";
import CourseTapesPage from "./pages/CoursesPage/CourseDetailPage/CourseTapesPage/CourseTapesPage";
import CourseTasksPage from "./pages/CoursesPage/CourseDetailPage/CourseTasksPage/CourseTasksPage";
import CourseItemPage from "./pages/CoursesPage/CourseDetailPage/CourseItemPage/CourseItemPage";
import { getAllSubjectsThunk } from "./redux/subject/subjectOperations";
import CourseParticipantPage from "./pages/CoursesPage/CourseDetailPage/CourseParticipantPage/CourseParticipantPage";
import TaskDetailPage from "./pages/CoursesPage/CourseDetailPage/CourseTasksPage/TaskDetailPage/TaskDetailPage";
import VideoChatRoomPage from "./pages/VIdeoChatRoomPage/VideoChatRoomPage";

export const WebsocketContext = createContext(null);

function App() {
  const [websocket, setWebsocket] = useState(null);

  const groupName = useSelector(getUserGroup);
  const token = useSelector(getToken);
  const userType = useSelector(getUserType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserInfoThunk());
    }
  }, [dispatch, token]);

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  }, []);

  useEffect(() => {
    if (groupName && token && userType === "student") {
      dispatch(getScheduleThunk(groupName));
      dispatch(getAllSubjectsThunk(groupName));
    }
  }, [dispatch, groupName, token, userType]);

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
            <Route path={`:${groupName}`} element={<SubjectsList />} />
            <Route path="dopcourses" element={<div>Dop Courses</div>} />
            <Route path="archive" element={<div>Archive</div>} />
            <Route path=":id" element={<CourseDetailPage />}>
              <Route path="tapes" element={<CourseTapesPage />} />
              <Route path="tasks" element={<CourseTasksPage />}>
                <Route path=":lessonId" element={<TaskDetailPage />} />
              </Route>
              <Route path="participants" element={<CourseParticipantPage />} />
              <Route path="journal" />
              <Route path="about" element={<CourseItemPage />} />
              <Route path="instructions" />
            </Route>
          </Route>
          {/* <Route path="tasks" element={<TasksPage />}>
            <Route path=":lessonId" element={<div>lesson</div>} />
          </Route> */}
          <Route path="register" element={<div>Register page</div>} />
          <Route path="/:videoChatRoomId" element={<VideoChatRoomPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    );
  };

  return (
    <WebsocketContext.Provider value={websocket}>
      <div className="App">
        <Router />
      </div>
    </WebsocketContext.Provider>
    // <VideoChatRoomPage/>
  );
}

export default App;
