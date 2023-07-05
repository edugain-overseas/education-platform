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
  const socket = new WebSocket(
    "ws://4f50-194-44-219-51.ngrok-free.app/api/v1/ws/Fil23"
  );

  socket.onopen = () => {
    console.log("Connected to server");
  };

  socket.onmessage = (event) => {
    const data = event.data;
    console.log("Received message:", data);
  };
  
  return (
    // <div className="App">
    //   <Router />
    // </div>
    <MainLayout />
  );
}

export default App;