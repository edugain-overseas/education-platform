import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { SchedulePage } from "./pages/SchedulePage/SchedulePage";
import { useEffect } from "react";
import { getIsAuthenticated } from "./redux/user/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk } from "./redux/user/userOperations";

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
        <Route path="courses" element={<div>Courses page</div>} />
        <Route path="task" element={<div>Task page</div>} />
        <Route path="register" element={<div>Register page</div>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserInfoThunk());
    }
  }, [isAuth, dispatch]);

  return (
    <div className="App">
      <Router />
    </div>
    // <MainLayout />
  )
}

export default App;
