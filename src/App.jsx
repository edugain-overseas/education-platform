import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { SchedulePage } from "./pages/SchedulePage/SchedulePage";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicRoute component={<LoginPage />} />}
      />
      <Route path="/" element={<PrivateRoute component={<MainLayout />} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage/>} />
        <Route path="courses" element={<div>Courses page</div>} />
        <Route path="task" element={<div>Task page</div>} />
        <Route path="register" element={<div>Register page</div>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Router />
    </div>
    // <MainLayout />
  );
}

export default App;
