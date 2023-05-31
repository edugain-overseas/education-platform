import { LoginPage } from "./pages/loginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicRoute component={<LoginPage />} />}
      />
      <Route
        path="/"
        element={<PrivateRoute component={<div>Home Page</div>} />}
      />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
