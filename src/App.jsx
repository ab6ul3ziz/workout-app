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
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route
              path="/saved"
              element={user ? <SavedWorkouts /> : <Login />}
            />
            <Route
              path="/all-workout"
              element={user ? <AllWorkouts /> : <Login />}
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
