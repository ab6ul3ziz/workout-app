import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Sinup from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import SavedWorkouts from "./pages/SavedWorkouts";
import AllWorkouts from "./pages/AllWorkouts";

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/saved"
              element={user ? <SavedWorkouts /> : <Navigate to="/login" />}
            />
            <Route
              path="/all-workout"
              element={user ? <AllWorkouts /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Sinup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
