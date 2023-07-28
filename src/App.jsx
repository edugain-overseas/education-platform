import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { SchedulePage } from "./pages/SchedulePage/SchedulePage";
import { useEffect } from "react";
import { getToken, getUserGroup } from "./redux/user/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk } from "./redux/user/userOperations";
import { getScheduleThunk } from "./redux/schedule/scheduleOperations";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import { adjustFontSize } from "./helpers/adjustFornSize";
import SubjectsList from "./components/SubjectsList/SubjectsList";
import CourseDetailPage from "./pages/CoursesPage/CourseDetailPage/CourseDetailPage";

function App() {
  const dispatch = useDispatch();
  const groupName = useSelector(getUserGroup);
  const token = useSelector(getToken);

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
    if (groupName) {
      dispatch(getScheduleThunk(groupName));
    }
  }, [dispatch, groupName]);

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
            <Route path={`${groupName}`} element={<SubjectsList />} />
            <Route path="dopcourses" element={<div>Dop Courses</div>} />
            <Route path="archive" element={<div>Archive</div>} />
            <Route path=":id" element={<CourseDetailPage/>}>
              <Route path="tapes"/>
              <Route path="tasks"/>
              <Route path="participants"/>
              <Route path="journal"/>
              <Route path="about"/>
              <Route path="instructions"/>
            </Route>
          </Route>
          <Route path="task" element={<div>Task page</div>} />
          <Route path="register" element={<div>Register page</div>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    );
  };

  return (
    <div className="App">
      <Router />
    </div>
    // <MainLayout />
  );
}

export default App;
